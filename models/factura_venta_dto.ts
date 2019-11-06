import {VentaDto} from './ventadto'
export class FacturaVentaDto{
    fecha:string;
    num_de_factura:number;
    venta:VentaDto;
    tipo_de_factura:string;
    tipo_de_iva:number;
    montoiva:number;
    cliente:string;
}
