import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import { FacturaCompraService } from '../services/facturacompra-service';
import { CompraService } from '../services/compra-service';
import { CompraDto } from '../models/compradto';
import { Producto } from '../models/producto';
import { ProveedorService } from '../services/proveedor-service';


import { FacturaCompra } from '../models/factura_compra';
import { Compra } from '../models/compra';
import { FacturaCompraDto } from '../models/factura_compra_dto';
import { ProductoService } from '../services/producto-service';
import { Proveedor } from '../models/proveedor';
export class FacturaCompraController {
    private nombredb: string;
    private nombrecoleccion3 = "Compras";
    private nombrecoleccion9 = "Facturas de compra";
    private conexión: MongoClient;
    private facturacompraservice: FacturaCompraService;
    private compraservice: CompraService;
    private productoservice: ProductoService;
    private proveedorservice: ProveedorService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.facturacompraservice = new FacturaCompraService(conexion.db(nombredb));
        this.compraservice = new CompraService(conexion.db(nombredb));
        this.productoservice = new ProductoService(conexion.db(nombredb));
        this.proveedorservice = new ProveedorService(conexion.db(nombredb));
        this.CrearFactura = this.CrearFactura.bind(this);
        this.ListarFacturas = this.ListarFacturas.bind(this);
        this.BorrarFacturas = this.BorrarFacturas.bind(this);
    }

    public async CrearFactura(req: Request, res: Response) {
        if (req.body.num_de_factura && req.body._idcompra && req.body.tipo_de_factura && req.body.tipo_de_iva) {
            const factura1: FacturaCompra = {
                fecha: new Date().toISOString(),
                num_de_factura: req.body.num_de_factura,
                _idcompra: req.body._idcompra,
                tipo_de_factura: req.body.tipo_de_factura,
                tipo_de_iva: req.body.tipo_de_iva
            }
            try {
                const facturanueva = await this.facturacompraservice.CrearFactura(factura1);
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
            const facturasdto: FacturaCompraDto[] = [];
            const arreglofacturas = await this.facturacompraservice.ArregloFacturas();
            for (const factura of arreglofacturas) {
                console.log('Venta de factura: ' + factura._idcompra);
                const compradefactura = await this.compraservice.BuscarCompra(factura._idcompra);
                const compranueva: CompraDto = {
                    fecha: compradefactura.fecha,
                    monto_total: compradefactura.monto_total,
                    productos_compra: [],
                    proveedor: []
                }
                if (compradefactura.productos_compra) {
                    for (const producto of compradefactura.productos_compra) {
                        const prod = await this.productoservice.BuscarProductoPorId(producto.id)
                        console.log(prod);
                        const mostrarprod: Producto = {
                            nombre: prod.nombre,
                            cantidad: producto.cantidad,
                            marca: prod.marca,
                            precio: prod.precio,
                            codigo_de_barras: prod.codigo_de_barras
                        }
                        compranueva.productos_compra.push(mostrarprod);
                    }
                } const calculoiva = (21 * compranueva.monto_total) / 100;
                const prov = await this.proveedorservice.BuscarProveedorPorId(compradefactura._idproveedor)
                if (prov) {
                    const mostrarprov: Proveedor = {
                        razon_social: prov.razon_social,
                        cuil: prov.cuil,
                        num_de_telefono: prov.num_de_telefono,
                    }
                    compranueva.proveedor.push(mostrarprov);
                }

                const facturanueva: FacturaCompraDto = {
                    fecha: factura.fecha,
                    num_de_factura: factura.num_de_factura,
                    compra: compranueva,
                    tipo_de_factura: factura.tipo_de_factura,
                    tipo_de_iva: factura.tipo_de_iva,
                    montoiva: calculoiva + compranueva.monto_total
                }
                facturasdto.push(facturanueva);
                res.json(facturasdto);

            }

        } catch (err) {
            console.error(err);
            res.status(500).json(err);

        }

    } public async BorrarFacturas(req: Request, res: Response) {
        try {
            const del = await this.facturacompraservice.BorrarFacturas();
            console.log("Se borro correctamente la factura");
            console.log("Se borraron " + del);
            res.send("Se borro correctamente " + del + " factura/s");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }



}    
