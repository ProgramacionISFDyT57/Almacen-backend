import { VentaDto } from '../models/ventadto';
import { ProductoVenta } from '../models/producto_venta';
import { Venta } from '../models/venta';
import { Producto } from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { VentaService } from '../services/venta-service';
import {ProductoService} from '../services/producto-service';
export class VentaController {
    private nombredb: string;
    private nombrecoleccion = "Productos";
    private nombrecoleccion2 = "Ventas";
    private conexión: MongoClient;
    private productoservice: ProductoService;
    private ventaservice: VentaService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.Crear = this.Crear.bind(this);
        this.InsertarProductos = this.InsertarProductos.bind(this);
        this.ListarVentas = this.ListarVentas.bind(this);
        this.SacarMonto = this.SacarMonto.bind(this);
        this.BorrarVenta=this.BorrarVenta.bind(this);
        this.productoservice = new ProductoService(conexion.db(nombredb));
        this.ventaservice= new VentaService(conexion.db(nombredb));
    }
    public async Crear(req: Request, res: Response) {
        const venta1: Venta = {
            fecha: new Date().toISOString(),
            ventafinalizada: false
        }
        try {
            const venta= await this.ventaservice.CrearVenta(venta1);
            console.log("Venta agregada");
            res.json({
                mensaje: "Venta agregada a la base de datos",
                id: venta,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
    public async InsertarProductos(req: Request, res: Response) {
        if (req.body._id && req.body.cantidad) {
            try {
                const idprueba = new ObjectId(req.params._id);
                const idprueba2 = new ObjectId(req.body._id);
            } catch{
                res.status(400).send("El id del producto o de la venta están mal formados");
                return;
            }
            try {
                const productoporventa: ProductoVenta = {
                    id: req.body._id,
                    cantidad: req.body.cantidad
                }
                const venta: Venta =await this.ventaservice.BuscarVenta(req.params._id);
                if (venta) {
                    const producto: Producto = await this.productoservice.BuscarProductoPorId(req.body._id);
                    if (venta.ventafinalizada) {
                        res.status(404).send("La venta ha sido finalizada");
                        return;
                    }
                    if (producto) {
                        if (productoporventa.cantidad <= producto.cantidad) {
                            const productomodificado = await this.productoservice.ModificarProducto(req.body._id,{cantidad:producto.cantidad-productoporventa.cantidad});
                            if (!venta.productos_venta) {
                                venta.productos_venta = []
                            }
                            venta.productos_venta.push(productoporventa);
                            const ventamodificada = await this.ventaservice.ModificarVenta(req.params._id,venta.productos_venta)
                        
                            res.send("Se ha agregado el objeto a la venta");
                        } else {
                            res.status(404).send("No hay la cantidad necesaria que se desea comprar");
                        }
                    } else {
                        res.status(404).send("No se encuentra el producto");
                    }

                } else {
                    res.status(404).send("No se ha creado la venta");
                }
            } catch (err) {
                console.error(JSON.stringify(err));
                res.status(500).json(err);
            }
        } else {
            res.status(404).send("No se obtuvieron las propiedades necesarias");
        }
    }
    public async ListarVentas(req: Request, res: Response) {
        const db = this.conexión.db(this.nombredb);
        const ventas = db.collection(this.nombrecoleccion2);
        const productos = db.collection(this.nombrecoleccion);
        try {
            const ventasdto: VentaDto[] = [];
            const arregloventas = await ventas.find({ ventafinalizada: true }).toArray();
            for (const venta of arregloventas) {

                const ventanueva: VentaDto = {
                    fecha: venta.fecha,
                    monto_total: venta.monto_total,
                    productos_venta: []
                }
                console.log(venta.productos_venta)
                if (venta.productos_venta) {
                    for (const producto of venta.productos_venta) {
                        const productonuevo = new ObjectId(producto.id);
                        const prod = await productos.findOne({ _id: productonuevo })
                        console.log(prod);
                        const mostrarprod: Producto = {
                            nombre: prod.nombre,
                            cantidad: producto.cantidad,
                            marca: prod.marca,
                            precio: prod.precio,
                            codigo_de_barras: prod.codigo_de_barras
                        }
                        ventanueva.productos_venta.push(mostrarprod);
                    }
                }
                ventasdto.push(ventanueva);
            }
            console.log(ventasdto);
            res.json(ventasdto);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
    public async SacarMonto(req: Request, res: Response) {
        let montototal = 0;
        try {
            const venta:Venta= await this.ventaservice.BuscarVenta(req.params._id);
            if (venta) {
                if (venta.ventafinalizada) {
                    res.status(400).send("La venta ha sido finalizada");
                    return;
                }
                for (const productodeventa of venta.productos_venta) {
                    const producto: Producto = await this.productoservice.BuscarProductoPorId(productodeventa.id);
                    montototal = montototal + productodeventa.cantidad * producto.precio
                }
                const ventamodificada = await this.ventaservice.FinalizarVenta(req.params._id,montototal);
                res.send("Venta modificada y finalizada " + "Monto total= " + montototal);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
    public async BorrarVenta (req: Request, res: Response) {
        try {
            const del = await this.ventaservice.BorrarVentas();
            console.log("Se borro correctamente la venta");
            console.log("Se borraron " + del);
            res.send("Se borro correctamente " + del + " venta/s");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    public async BuscarVenta (req:Request, res:Response){
        try{
            const resultado= await this.ventaservice.BuscarVenta(req.params.id);
            console.log(resultado);
            res.json(resultado);
        }catch(err){
            console.error(err);
            res.status(500).json({error: err});
        }
    }
}
