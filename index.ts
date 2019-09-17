import{ProductoController} from './controllers/producto-controller';
import{Producto} from './models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import * as bodyparser from 'body-parser';
const conexión = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
import * as express from 'express';
import { Request, Response } from 'express';
import { Resolver } from 'dns';
import { VentaController } from './controllers/venta-controller';
const app = express();
app.use(bodyparser.json());
const port = 3000;
let nombredb = "almacen-backend";
let nombrecoleccion = "Productos";
app.get('/',async (req:Request, res:Response)=>{
    res.status(200).send('Funcionando almacen-backend');
})
const productoController= new ProductoController(conexión,nombredb);
app.post('/producto/crear', productoController.Crear);
app.get('/producto/listar', productoController.Listar);
app.delete('/producto/borrar/:_id', productoController.Borrar);
app.get('/producto/buscar', productoController.Buscar);
app.put('/producto/modificar/:_id',productoController.Modificar);



const ventaController=new VentaController(conexión,nombredb);
app.post('/venta/crear',ventaController.Crear);
app.put('/venta/insertar_producto/:_id', ventaController.InsertarProductos);
app.get('/venta/listar',ventaController.ListarVentas);



conexión.connect().then(async () => {
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });

})
