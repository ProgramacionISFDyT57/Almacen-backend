import {VentaDto} from '../models/ventadto'
export class FacturaDto{
    fecha:string;
    num_de_factura:number;
    venta:VentaDto;
    tipo_de_factura:string;
    tipo_de_iva:number;
    montoiva:number;
}
