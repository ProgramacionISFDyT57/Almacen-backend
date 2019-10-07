import {Compra} from '../models/compra';
import {Producto} from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import {ProductoCompra} from '../models/producto_compra';
import {CompraDto} from '../models/compradto';
import {ProductoService} from '../services/producto-service';
import {CompraService} from '../services/compra-service';
export class CompraController {
    private nombredb: string;
    private nombrecoleccion= "Productos";
    private nombrecoleccion3= "Compras";
    private conexión: MongoClient;
    private productoservice: ProductoService;
    private compraservice: CompraService;
    constructor (conexión: MongoClient, nombredb:string) {
        this.conexión= conexión;
        this.nombredb= nombredb;
        this.productoservice = new ProductoService(conexión.db(nombredb));
        this.compraservice= new CompraService(conexión.db(nombredb));
        this.Crear= this.Crear.bind(this);

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
}