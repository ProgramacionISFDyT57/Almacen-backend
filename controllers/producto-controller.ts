import { Producto } from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { ProductoService } from '../services/producto-service';
import { Token } from '../models/token';
import jwt = require('jsonwebtoken');

export class ProductoController {
    private nombredb: string;
    private nombrecoleccion = "Productos";
    private conexión: MongoClient;
    private contraseña = 'bBQGAtw75yBuv2jujsO8';
    private productoservice: ProductoService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.Listar = this.Listar.bind(this);
        this.Crear = this.Crear.bind(this);
        this.Buscar = this.Buscar.bind(this);
        this.Borrar = this.Borrar.bind(this);
        this.Modificar = this.Modificar.bind(this);
        this.productoservice = new ProductoService(conexion.db(nombredb));
    }
    public async Listar(req: Request, res: Response) {
        console.log(res.locals);
        try {

            const arregloproductos = await this.productoservice.ListarProducto();
            console.log(arregloproductos);
            res.json(arregloproductos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }



    }

    public async  Crear(req: Request, res: Response) {
        if (req.body.nombre && req.body.cantidad && req.body.marca && req.body.precio && req.body.codigo_de_barras) {
            const producto1: Producto = {
                nombre: req.body.nombre,
                cantidad: req.body.cantidad,
                marca: req.body.marca,
                precio: req.body.precio,
                codigo_de_barras: req.body.codigo_de_barras
            }
            try {
                await this.productoservice.CrearProducto(producto1);
                console.log("Producto agregado");
                res.send("Producto agregado a la base de datos");

            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        } else {
            console.log("No se encontraron todas las propiedades necesarias");
            res.status(400).send("Falta una de las propiedades del producto");
        }

    }

    public async  Borrar(req: Request, res: Response) {
        try {
            const resultado = await this.productoservice.BorrarProducto(req.params._id);
            if (resultado) {
                res.send("Se borro correctamente");
                console.log("Se borro correctamente el producto");
            } else {
                res.status(404).send('No se encontró el producto');
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    public async Buscar(req: Request, res: Response) {
        try {
            const arregloproductos = await this.productoservice.BuscarProductos(req.query);
            console.log(arregloproductos);
            res.json(arregloproductos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }

    }
    public async Modificar(req: Request, res: Response) {
        if (req.body.nombre || req.body.cantidad || req.body.marca || req.body.precio || req.body.codigo_de_barras) {
            try {
                const p1: any = {}
                if (req.body.nombre) {
                    p1.nombre = req.body.nombre;
                }
                if (req.body.cantidad) {
                    p1.cantidad = req.body.cantidad;
                }
                if (req.body.marca) {
                    p1.marca = req.body.marca;
                }
                if (req.body.precio) {
                    p1.precio = req.body.precio;
                }
                if (req.body.codigo_de_barras) {
                    p1.codigo_de_barras = req.body.codigo_de_barras;
                }
                const resultadomodificado = await this.productoservice.ModificarProducto(req.params._id, p1);
                if (resultadomodificado) {
                    console.log("Se modificó correctamente el producto");
                    res.send("Se modificó correctamente el producto");
                } else {
                    res.status(404).send('No se pudo modificar el producto');
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: err });
            }
        } else {
            console.log("Error al enviar las propiedades");
            res.status(400).send("No se enviaron correctamente las propiedades del producto");
        }



    }
}