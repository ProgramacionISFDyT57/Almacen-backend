import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { FacturaService } from '../services/factura-service';
import { VentaService } from '../services/venta-service';
import { VentaDto } from '../models/ventadto';
import { Producto } from '../models/producto';

import { Factura } from '../models/factura';
import { Venta } from '../models/venta';
import { FacturaDto } from '../models/facturadto';
import { ProductoService } from '../services/producto-service';
export class FacturaController {
    private nombredb: string;
    private nombrecoleccion2 = "Ventas";
    private nombrecoleccion4 = "Facturas";
    private conexión: MongoClient;
    private facturaservice: FacturaService;
    private ventaservice: VentaService;
    private productoservice: ProductoService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.facturaservice = new FacturaService(conexion.db(nombredb));
        this.ventaservice = new VentaService(conexion.db(nombredb));
        this.productoservice = new ProductoService(conexion.db(nombredb))
        this.Crearfactura = this.Crearfactura.bind(this);
        this.ListarFacturas = this.ListarFacturas.bind(this);
    }
    public async Crearfactura(req: Request, res: Response) {
        if (req.body.num_de_factura && req.body._idventa && req.body.tipo_de_factura && req.body.tipo_de_iva) {
            const factura1: Factura = {
                fecha: new Date().toISOString(),
                num_de_factura: req.body.num_de_factura,
                _idventa: req.body.id_venta,
                tipo_de_factura: req.body.tipo_de_factura,
                tipo_de_iva: req.body.tipo_de_iva
            }
            try {
                const facturanueva = await this.facturaservice.CrearFactura(factura1);
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
            const facturasdto: FacturaDto[] = [];
            const arreglofacturas = await this.facturaservice.ArregloFacturas();
            for (const factura of arreglofacturas) {
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

                const facturanueva: FacturaDto = {
                    fecha: factura.fecha,
                    num_de_factura: factura.num_de_factura,
                    venta: ventanueva,
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
        







     
    }
    


}    
