import{Producto} from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';

export class ProductoController{
    private nombredb:string;
    private nombrecoleccion="Productos";
    private conexión:MongoClient;
    constructor(conexion:MongoClient, nombredb:string,){
        this.conexión=conexion;
        this.nombredb=nombredb;
        this.Listar=this.Listar.bind(this);
        this.Crear=this.Crear.bind(this);
        this.Buscar=this.Buscar.bind(this);
        this.Borrar=this.Borrar.bind(this);
    }
    public async Listar(req:Request, res:Response){
    const db = this.conexión.db(this.nombredb);
    const productos = db.collection(this.nombrecoleccion);
    console.log(req.query);
        try {
            const arregloproductos = await productos.find(req.query).toArray();
            console.log(arregloproductos);
            res.json(arregloproductos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
        
}

public async  Crear(req: Request, res: Response) {
    if (req.body.nombre && req.body.cantidad && req.body.marca&& req.body.precio && req.body.codigo_de_barras) {
        const producto1: Producto = {
            nombre: req.body.nombre,
            cantidad: req.body.cantidad,
            marca:req.body.marca,
            precio: req.body.precio,
            codigo_de_barras: req.body.codigo_de_barras
        }
        const db = this.conexión.db(this.nombredb);
        const productos = db.collection(this.nombrecoleccion);
        try {
            await productos.insertOne(producto1);
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
    const db = this.conexión.db(this.nombredb);
    const productos = db.collection(this.nombrecoleccion);
    try {
        const id = new ObjectId(req.params.id);
        const del=await productos.deleteOne({ "_id": id });
        console.log("Se borraron " + del.result.n);
        res.send("Se borro correctamente");
        console.log("Se borro correctamente el producto");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
public async Buscar(req: Request, res: Response) {
    const db = this.conexión.db(this.nombredb);
    const productos = db.collection(this.nombrecoleccion);
    console.log(req.query);
        try {
            const arregloproductos = await productos.find(req.query).toArray();
            console.log(arregloproductos);
            res.json(arregloproductos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
        
}
    




}