import{ProductoController} from './controllers/producto-controller';
import{Producto} from './models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import * as bodyparser from 'body-parser';
const conexión = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
import * as express from 'express';
import { Request, Response } from 'express';
import { Resolver } from 'dns';
import { VentaController } from './controllers/venta-controller';
import { CompraController } from './controllers/compra-controller';
import { FacturaVentaController } from './controllers/facturaventa-controller';
import {FacturaCompraController} from './controllers/facturacompra-controller';
import {UsuarioController} from './controllers/usuario-controller';
import {ProveedorController} from './controllers/proveedor-controller';
import{AutenticacionController} from './controllers/autenticacion-controller';
import { RemitoController } from './controllers/remito-controller';
import { createNonNullExpression } from 'typescript';
import { NotaDeCreditoCompraController } from './controllers/nota_de_credito_compra-controller';
const app = express();
app.use(bodyparser.json());
const port = 3000;
let nombredb = "almacen-backend";
let nombrecoleccion = "Productos";




conexión.connect().then(async () => {
    app.get('/',async (req:Request, res:Response)=>{
        res.status(200).send('Funcionando almacen-backend');
    })
    
    const autenticacionController=new AutenticacionController(conexión,nombredb);
    app.post('/login',autenticacionController.Login);

    //app.use(autenticacionController.Token);
    
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
    app.put('/venta/sacarmonto/:_id',ventaController.SacarMonto);
    app.delete('/venta/borrar',ventaController.BorrarVenta);
    app.get('/venta/buscar/:_id', ventaController.BuscarVenta);
    
    
    const compraController= new CompraController (conexión,nombredb);
    app.post('/compra/crear',compraController.Crear);
    app.put('/compra/insertar_producto/:_id', compraController.InsertarProductos);
    app.get('/compra/listar', compraController.ListarCompras);
    app.put('/compra/sacarmonto/:_id', compraController.SacarMonto);
    app.delete('/compra/borrar', compraController.BorrarCompra);
    app.get('/compra/buscar/:_id', compraController.BuscarCompra);


    const facturaventaController=new FacturaVentaController(conexión,nombredb);
    app.post('/facturaventa/crear',facturaventaController.CrearFactura);
    app.get('/facturaventa/listar',facturaventaController.ListarFacturas);
    app.delete('/facturaventa/borrar',facturaventaController.BorrarFacturas);

    const facturacompraController=new FacturaCompraController(conexión,nombredb);
    app.post('/facturacompra/crear',facturacompraController.CrearFactura);
    app.get('/facturacompra/listar',facturacompraController.ListarFacturas);
    app.delete('/facturacompra/borrar',facturacompraController.BorrarFacturas);


    const usuarioController=new UsuarioController(conexión,nombredb);
    app.post('/usuario/crear',usuarioController.Crear);
    app.get('/usuario/listar',usuarioController.Listar);
    app.delete('/usuario/borrar/:_id',usuarioController.Borrar);
    app.get('/usuario/buscar',usuarioController.Buscar);
    app.put('/usuario/modificar/:_id',usuarioController.Modificar);


    const proveedorController=new ProveedorController(conexión,nombredb);
    app.post('/proveedor/crear',proveedorController.Crear);
    app.get('/proveedor/listar',proveedorController.Listar);
    app.delete('/proveedor/borrar/:_id',proveedorController.Borrar);
    app.get('/proveedor/buscar',proveedorController.Buscar);
    app.put('/proveedor/modificar/:_id',proveedorController.Modificar);

    const remitoController=new RemitoController(conexión,nombredb);
    app.post('/remito/crear', remitoController.CrearRemito);
    app.get('/remito/listar', remitoController.ListarRemitos);
    app.delete('/remito/borrar', remitoController.BorrarRemitos);

    const notadecreditocompraController=new NotaDeCreditoCompraController(conexión,nombredb);
    app.post('/notacompra/crear',notadecreditocompraController.CrearNotaDeCredito);
    app.get('/notacompra/listar',notadecreditocompraController.ListarNotasDeCredito);


    
    
    
    app.listen(port, () => {
        console.log(`Servidor de ejemplo escuchando en puerto ${port}!`);
    });

})
