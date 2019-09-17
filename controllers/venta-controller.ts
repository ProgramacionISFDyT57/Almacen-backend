import { ProductoVenta } from '../models/producto_venta'
import { Venta } from '../models/venta';
import { Producto } from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
export class VentaController {
    private nombredb: string;
    private nombrecoleccion = "Productos";
    private nombrecoleccion2 = "Ventas";
    private conexión: MongoClient;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.Crear = this.Crear.bind(this);
        this.InsertarProductos = this.InsertarProductos.bind(this);
        this.ListarVentas=this.ListarVentas.bind(this);
    }
    public async Crear(req: Request, res: Response) {
        const venta1: Venta = {
            fecha: new Date().toISOString(),
        }
        const db = this.conexión.db(this.nombredb);
        const ventas = db.collection(this.nombrecoleccion2);
        try {
            const ventaNueva = await ventas.insertOne(venta1);

            console.log("Venta agregada");
            res.json({
                mensaje: "Venta agregada a la base de datos",
                id: ventaNueva.insertedId.toHexString(),
            });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
    public async InsertarProductos(req: Request, res: Response) {
        const db = this.conexión.db(this.nombredb);
        const productos = db.collection(this.nombrecoleccion);
        const ventas = db.collection(this.nombrecoleccion2);
        if (req.body._id && req.body.cantidad) {
            try{
                const idprueba=new ObjectId(req.params._id);
                const idprueba2=new ObjectId(req.body._id);
            }catch{
                res.status(400).send("El id del producto o de la venta están mal formados");
                return;
            }
            try {
                const productoporventa: ProductoVenta = {
                    id: req.body._id,
                    cantidad: req.body.cantidad
                }
                const id = new ObjectId(req.params._id);
                const venta: Venta = await ventas.findOne({ _id: id });
                if (venta) {
                    const _idproducto = new ObjectId(req.body._id);
                    const producto: Producto = await productos.findOne({ _id: _idproducto });
                    if (producto) {
                        if (productoporventa.cantidad <= producto.cantidad) {
                            const productomodificado = await productos.updateOne({ _id: _idproducto },
                                { $set: { cantidad: producto.cantidad - productoporventa.cantidad } })
                            if (!venta.productos_venta) {
                                venta.productos_venta = []
                            }
                            venta.productos_venta.push(productoporventa);
                            const ventamodificada = await ventas.updateOne({ _id: id },
                                { $set: { productos_venta: venta.productos_venta } })
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
        try {
            const arregloventas = await ventas.find().toArray();
            console.log(arregloventas);
            res.json(arregloventas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }    
}



