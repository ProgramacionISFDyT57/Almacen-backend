import { MongoClient, ObjectId } from 'mongodb';
import * as bodyparser from 'body-parser';
const conexión = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
import * as express from 'express';
import { Request, Response } from 'express';
import { Resolver } from 'dns';
const app = express();
app.use(bodyparser.json());
const port = 3000;
let nombredb = "pruebadb";
let nombrecoleccion = "Productos";
app.get('/',async (req:Request, res:Response)=>{
    res.status(200).send('Funcionando almacen-backend');

})






















conexión.connect().then(async () => {
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });

})
