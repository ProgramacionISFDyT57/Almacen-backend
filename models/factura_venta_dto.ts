import {VentaDto} from './ventadto'
export interface FacturaVentaDto{
    _id?:string;
    fecha:string;
    num_de_factura:number;
    venta:VentaDto;
    tipo_de_factura:string;
    tipo_de_iva:number;
    montoiva:number;
    cliente:string;
}
