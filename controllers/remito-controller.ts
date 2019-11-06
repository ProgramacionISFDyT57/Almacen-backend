import { Proveedor } from '../models/proveedor';
import { Remito } from '../models/remito';
import { RemitoDto } from '../models/remitodto';
import { CompraDto } from '../models/compradto';
import { Compra } from '../models/compra';
import { ProductoCompra } from '../models/producto_compra'
import { ProductoService } from '../services/producto-service';
import { CompraService } from '../services/compra-service';
import { ProveedorService } from '../services/proveedor-service';
import { RemitoService } from '../services/remito-service';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { Producto } from '../models/producto';

export class RemitoController {
    private nombredb: string;
    private nombrecoleccion = "Productos";
    private nombrecoleccion3 = "Compras";
    private nombrecoleccion7 = "Remitos";
    private conexión: MongoClient;
    private productoservice: ProductoService;
    private compraservice: CompraService;
    private proveedorservice: ProveedorService;
    private remitoservice: RemitoService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.productoservice = new ProductoService(conexion.db(nombredb));
        this.compraservice = new CompraService(conexion.db(nombredb));
        this.proveedorservice = new ProveedorService(conexion.db(nombredb));
        this.remitoservice = new RemitoService(conexion.db(nombredb));
        this.CrearRemito=this.CrearRemito.bind(this);
        this.ListarRemitos=this.ListarRemitos.bind(this);
        this.BorrarRemitos=this.BorrarRemitos.bind(this);
    }
    public async CrearRemito(req: Request, res: Response) {
        if (req.body.num_de_remito && req.body._idproveedor && req.body._idcompra) {
            const remito1: Remito = {
                fecha: new Date().toISOString(),
                num_de_remito: req.body.num_de_remito,
                _idcompra: req.body._idcompra,
                _idproveedor: req.body._idproveedor
            }
            try {
                const remitonuevo = await this.remitoservice.CrearRemito(remito1);
                console.log("Remito agregado");
                res.json({
                    mensaje: "Remito agregado a la base de datos",
                    id: remitonuevo,
                });
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        } else {
            res.status(404).send("No se obtuvieron las propiedades necesarias");
            console.log("No se obtuvieron las propiedades necesarias");
        }
    }
    public async ListarRemitos(req:Request, res: Response) {
        try {
            const remitosdto: RemitoDto[] = [];
            const arregloremitos = await this.remitoservice.ArregloRemitos();
            for (const remito of arregloremitos) {
                //console.log('Venta de factura: ' + factura._idventa);
                const compraderemito = await this.compraservice.BuscarCompra(remito._idcompra);
                const compranueva: CompraDto = {
                    fecha: compraderemito.fecha,
                    productos_compra: [],
                    proveedor: []
                }
                 
                if (compraderemito.productos_compra) {
                    for (const producto of compraderemito.productos_compra) {
                        const prod = await this.productoservice.BuscarProductoPorId(producto.id)
                        console.log(prod);
                        const mostrarprod: Producto = {
                            nombre: prod.nombre,
                            cantidad: producto.cantidad,
                            marca: prod.marca,
                            codigo_de_barras: prod.codigo_de_barras
                        }
                        compranueva.productos_compra.push(mostrarprod);
                    }
                    const prov = await this.proveedorservice.BuscarProveedorPorId(remito._idproveedor)
                    if (prov) {
                        const mostrarprov: Proveedor = {
                            razon_social: prov.razon_social,
                            cuil: prov.cuil,
                            num_de_telefono: prov.num_de_telefono,
                        }
                        compranueva.proveedor.push(mostrarprov);
                    }
                }
                const remitonuevo: RemitoDto = {
                    fecha: remito.fecha,
                    num_de_remito: remito.num_de_remito,
                    compra: compranueva,
                }
                remitosdto.push(remitonuevo);
                res.json(remitosdto);
            }
        }catch(err){
            console.error(err);
            res.status(500).json({ error: err });
        }
    } 
    public async BorrarRemitos(req:Request, res:Response){
        try {
            
            const del = await this.remitoservice.BorrarRemitos();
            console.log("Se borro correctamente el remito");
            console.log("Se borraron " + del);
            res.send("Se borro correctamente " + del + " remito/s");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }


    }    
}