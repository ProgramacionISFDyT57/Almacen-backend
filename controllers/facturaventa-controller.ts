import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { FacturaVentaService } from '../services/facturaventa-service';
import { VentaService } from '../services/venta-service';
import { VentaDto } from '../models/ventadto';
import { Producto } from '../models/producto';


import { FacturaVenta } from '../models/factura_venta';
import { Venta } from '../models/venta';
import { FacturaVentaDto } from '../models/factura_venta_dto';
import { ProductoService } from '../services/producto-service';
export class FacturaVentaController {
    private nombredb: string;
    private nombrecoleccion2 = "Ventas";
    private nombrecoleccion4 = "Facturas de venta";
    private conexión: MongoClient;
    private facturaventaservice: FacturaVentaService;
    private ventaservice: VentaService;
    private productoservice: ProductoService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.facturaventaservice = new FacturaVentaService(conexion.db(nombredb));
        this.ventaservice = new VentaService(conexion.db(nombredb));
        this.productoservice = new ProductoService(conexion.db(nombredb))
        this.CrearFactura = this.CrearFactura.bind(this);
        this.ListarFacturas = this.ListarFacturas.bind(this);
        this.BorrarFacturas=this.BorrarFacturas.bind(this);
    }

    public async CrearFactura(req: Request, res: Response) {
        if (req.body.num_de_factura && req.body._idventa && req.body.tipo_de_factura && req.body.tipo_de_iva) {
            const factura1: FacturaVenta = {
                fecha: new Date().toISOString(),
                num_de_factura: req.body.num_de_factura,
                _idventa: req.body._idventa,
                tipo_de_factura: req.body.tipo_de_factura,
                tipo_de_iva: req.body.tipo_de_iva,
                cliente:req.body.cliente
            }
            try {
                const facturanueva = await this.facturaventaservice.CrearFactura(factura1);
                console.log("Factura agregada");
                res.json({
                    mensaje: "Factura agregada a la base de datos",
                    id: facturanueva,
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
    public async ListarFacturas(req: Request, res: Response) {
        try {
            const facturasdto: FacturaVentaDto[] = [];
            const arreglofacturas = await this.facturaventaservice.ArregloFacturas();
            for (const factura of arreglofacturas) {
                console.log('Venta de factura: ' + factura._idventa);
                const ventadefactura = await this.ventaservice.BuscarVenta(factura._idventa);
                const ventanueva: VentaDto = {
                    _id: ventadefactura._id,
                    fecha: ventadefactura.fecha,
                    monto_total: ventadefactura.monto_total,
                    productos_venta: []
                }
                if (ventadefactura.productos_venta) {
                    for (const producto of ventadefactura.productos_venta) {
                        const prod = await this.productoservice.BuscarProductoPorId(producto.id)
                        console.log(prod);
                        const mostrarprod: Producto = {
                            nombre: prod.nombre,
                            cantidad: producto.cantidad,
                            marca: prod.marca,
                            precio: prod.precio,
                            codigo_de_barras: prod.codigo_de_barras
                        }
                        ventanueva.productos_venta.push(mostrarprod);
                    }
                } const calculoiva = (21 * ventanueva.monto_total) / 100;

                const facturanueva: FacturaVentaDto = {
                    _id:factura._id,
                    fecha:factura.fecha,
                    num_de_factura: factura.num_de_factura,
                    venta: ventanueva,
                    cliente:factura.cliente,
                    tipo_de_factura: factura.tipo_de_factura,
                    tipo_de_iva: factura.tipo_de_iva,
                    montoiva: calculoiva + ventanueva.monto_total
                }
                facturasdto.push(facturanueva);
                res.json(facturasdto);
            
            }   

        }catch (err) {
                console.error(err);
                res.status(500).json(err);

         }
         
    }public async BorrarFacturas (req: Request, res: Response) {
        try {
            const facturas=await this.facturaventaservice.ArregloFacturas();
            if(facturas){
                const del = await this.facturaventaservice.BorrarFacturas();
                console.log("Se borro correctamente la factura");
                console.log("Se borraron " + del);
                res.send("Se borro correctamente " + del + " factura/s");    
            }else{
                res.status(404).json("No hay facturas guardadas en la base de datos");
            }
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    


}    
