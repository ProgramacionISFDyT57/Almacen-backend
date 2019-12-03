import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { NotaDeCredCompra } from '../models/nota_de_credito_compra';
import { Compra } from '../models/compra';
import { NotaDeCreditoCompraService } from '../services/nota_de_credito_compra-service';
import { ProductoService } from '../services/producto-service';
import { CompraService } from '../services/compra-service';
import { ProveedorService } from '../services/proveedor-service';
import { NotaDeCredCompraDto } from '../models/nota_de_credito_compradto';
import { CompraDto } from '../models/compradto';
import { Producto } from '../models/producto';
import { Proveedor } from '../models/proveedor';
export class NotaDeCreditoCompraController {
    private nombredb: string;
    private nombrecoleccion8 = "Notas de credito de Compras";
    private nombrecoleccion3 = "Compras";
    private conexión: MongoClient;
    private productoservice: ProductoService;
    private compraservice: CompraService;
    private proveedorservice: ProveedorService;
    private notadecreditocompraservice: NotaDeCreditoCompraService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.productoservice = new ProductoService(conexion.db(nombredb));
        this.compraservice = new CompraService(conexion.db(nombredb));
        this.proveedorservice = new ProveedorService(conexion.db(nombredb));
        this.notadecreditocompraservice = new NotaDeCreditoCompraService(conexion.db(nombredb));
        this.CrearNotaDeCredito = this.CrearNotaDeCredito.bind(this);
        this.ListarNotasDeCredito = this.ListarNotasDeCredito.bind(this);
    }
    public async CrearNotaDeCredito(req: Request, res: Response) {
        if (req.body.num_de_nota && req.body._idcompra && req.body._idproveedor && req.body.arreglodeproductos) {
            const nota1: NotaDeCredCompra = {
                fecha: new Date().toISOString(),
                num_de_nota: req.body.num_de_nota,
                _idcompra: req.body._idcompra,
                _idproveedor: req.body._idproveedor,
                arreglodeproductos: req.body.arreglodeproductos,
                notafinalizada: false

            }
            try {
                let montoafavor = 0;
                for (const producto of nota1.arreglodeproductos) {
                    const productodecompra = await this.productoservice.BuscarProductoPorId(producto.id);
                    montoafavor = montoafavor + producto.cantidad * productodecompra.precio;
                    const productomodificado = await this.productoservice.ModificarProducto(producto.id, { cantidad: productodecompra.cantidad - producto.cantidad });
                    const prov=await this.proveedorservice.BuscarProveedorPorId(nota1._idproveedor);
                    const proveedormodificado = await this.proveedorservice.ModificarProveedor(req.body._idproveedor, { monto_a_favor:prov.monto_a_favor + montoafavor });
                }
                nota1.monto_a_favor = montoafavor;



                const notanueva = await this.notadecreditocompraservice.CrearNota(nota1);
                console.log("Nota de credito agregada");
                res.json({
                    mensaje: "Nota de credito de compra agregada a la base de datos",
                    id: notanueva,

                })
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            }
        } else {
            res.status(404).send("No se obtuvieron las propiedades necesarias");
            console.log("No se obtuvieron las propiedades necesarias");
        }
    }
    public async ListarNotasDeCredito(req: Request, res: Response) {
        try {
            const notasdto: NotaDeCredCompraDto[] = [];
            const notasdecredito = await this.notadecreditocompraservice.Arreglonotas();
            for (const nota of notasdecredito) {
                const prov = await this.proveedorservice.BuscarProveedorPorId(nota._idproveedor)
                const notanueva: NotaDeCredCompraDto = {
                    _id:nota._id,
                    fecha: nota.fecha,
                    num_de_nota: nota.num_de_nota,
                    proveedor: prov,
                    monto_a_favor: nota.monto_a_favor
                }
                notasdto.push(notanueva);
            }
            res.send(notasdto);


        


        }catch(err){
            console.error(err);
            res.status(500).json({ error: err });
        }
        
        
    }

    

}