import{Producto} from './models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import * as bodyparser from 'body-parser';
const conexión = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
import * as express from 'express';
import { Request, Response } from 'express';
import { Resolver } from 'dns';
const app = express();
app.use(bodyparser.json());
const port = 3000;
let nombredb = "almacen-backend";
let nombrecoleccion = "Productos";
app.get('/',async (req:Request, res:Response)=>{
    res.status(200).send('Funcionando almacen-backend');
})
app.post('/producto', crear);
app.get('/listar', listar);
app.delete('/borrar/:_id', borrar);
app.get('/buscar', buscar);

async function listar(req:Request, res:Response){
    const db = conexión.db(nombredb);
    const productos = db.collection(nombrecoleccion);
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

async function crear(req: Request, res: Response) {
    if (req.body.nombre && req.body.cantidad && req.body.marca&& req.body.precio && req.body.codigo_de_barras) {
        const producto1: Producto = {
            nombre: req.body.nombre,
            cantidad: req.body.cantidad,
            marca:req.body.marca,
            precio: req.body.precio,
            codigo_de_barras: req.body.codigo_de_barras
        }
        const db = conexión.db(nombredb);
        const productos = db.collection(nombrecoleccion);
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

async function borrar(req: Request, res: Response) {
    const db = conexión.db(nombredb);
    const productos = db.collection(nombrecoleccion);
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
async function buscar(req: Request, res: Response) {
    const db = conexión.db(nombredb);
    const productos = db.collection(nombrecoleccion);
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




















conexión.connect().then(async () => {
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });

})
