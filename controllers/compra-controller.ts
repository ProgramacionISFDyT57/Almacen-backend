import { Compra } from '../models/compra';
import { Producto } from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { ProductoCompra } from '../models/producto_compra';
import { CompraDto } from '../models/compradto';
import { ProductoService } from '../services/producto-service';
import { CompraService } from '../services/compra-service';
export class CompraController {
    private nombredb: string;
    private nombrecoleccion = "Productos";
    private nombrecoleccion3 = "Compras";
    private conexión: MongoClient;
    private productoservice: ProductoService;
    private compraservice: CompraService;
    constructor(conexión: MongoClient, nombredb: string) {
        this.conexión = conexión;
        this.nombredb = nombredb;
        this.productoservice = new ProductoService(conexión.db(nombredb));
        this.compraservice = new CompraService(conexión.db(nombredb));
        this.Crear = this.Crear.bind(this);
        this.InsertarProductos=this.InsertarProductos.bind(this);
        this.ListarCompras=this.ListarCompras.bind(this);
        this.SacarMonto=this.SacarMonto.bind(this);
        this.BorrarCompra=this.BorrarCompra.bind(this);
        this.BuscarCompra=this.BuscarCompra.bind(this);

    }
    public async Crear(req: Request, res: Response) {
        const compra1: Compra = {
            fecha: new Date().toISOString(),
            comprafinalizada: false
        }
        try {
            const compranueva = await this.compraservice.CrearCompra(compra1);
            console.log("Compra agregada");
            res.json({
                mensaje: "Compra agregada a la base de datos",
                id: compranueva,
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
                res.status(400).send("El id del producto o de la compra están mal formados");
                return;
            }
            try {
                const productoporcompra: ProductoCompra = {
                    id: req.body._id,
                    cantidad: req.body.cantidad
                }
                console.log("buscando compra");
                const compra:Compra = await this.compraservice.BuscarCompra(req.params._id);
                console.log("se encontro la compra");
                if (compra) {
                    const producto: Producto = await this.productoservice.BuscarProductoPorId(req.body._id);
                    if (compra.comprafinalizada) {
                        res.status(404).send("La compra ha sido finalizada");
                        return;
                    }
                    if (producto) {
                        const productomodificado = await this.productoservice.ModificarProducto(req.body._id, { cantidad: producto.cantidad + productoporcompra.cantidad });
                        if (!compra.productos_compra) {
                            compra.productos_compra = []
                        }
                        compra.productos_compra.push(productoporcompra);
                        const ventamodificada = await this.compraservice.ModificarCompra(req.params._id, compra.productos_compra)

                        res.send("Se ha agregado el objeto a la compra");

                    } else {
                        res.status(404).send("No se encuentra el producto");
                    }

                } else {
                    res.status(404).send("No se ha creado la compra");
                }
            } catch (err) {
                console.error(JSON.stringify(err));
                res.status(500).json(err);
            }
        } else {
            res.status(404).send("No se obtuvieron las propiedades necesarias");
        }
    }
    public async ListarCompras(req: Request, res: Response) {
        try {
            const comprasdto: CompraDto[] = [];
            const arreglocompras = await this.compraservice.ArregloCompras();
            for (const compra of arreglocompras) {
                const compranueva: CompraDto = {
                    fecha: compra.fecha,
                    monto_total: compra.monto_total,
                    productos_compra: []
                }
                console.log(compra.productos_compra)
                if (compra.productos_compra) {
                    for (const producto of compra.productos_compra) {
                        const prod = await this.productoservice.BuscarProductoPorId(producto.id)
                        console.log(prod);
                        const mostrarprod: Producto = {
                            nombre: prod.nombre,
                            cantidad: producto.cantidad,
                            marca: prod.marca,
                            precio: prod.precio,
                            codigo_de_barras: prod.codigo_de_barras
                        }
                        compranueva.productos_compra.push(mostrarprod);
                    }
                }
                comprasdto.push(compranueva);
            }
            console.log(comprasdto);
            res.json(comprasdto);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
    public async SacarMonto(req: Request, res: Response) {
        let montototal = 0;
        try {
            const compra: Compra = await this.compraservice.BuscarCompra(req.params._id);
            if (compra) {
                if (compra.comprafinalizada) {
                    res.status(400).send("La compra ha sido finalizada");
                    return;
                }
                for (const productodecompra of compra.productos_compra) {
                    const producto: Producto = await this.productoservice.BuscarProductoPorId(productodecompra.id);
                    montototal = montototal + productodecompra.cantidad * producto.precio
                }
                const ventamodificada = await this.compraservice.FinalizarCompra(req.params._id, montototal);
                res.send("Compra modificada y finalizada " + "Monto total= " + montototal);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
    public async BorrarCompra(req: Request, res: Response) {
        try {
            const del = await this.compraservice.BorrarCompras();
            console.log("Se borro correctamente la compra");
            console.log("Se borraron " + del);
            res.send("Se borro correctamente " + del + " compra/s");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    public async BuscarCompra(req: Request, res: Response) {
        try {
            const resultado = await this.compraservice.BuscarCompra(req.params.id);
            console.log(resultado);
            res.json(resultado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
}