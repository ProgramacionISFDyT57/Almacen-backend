import {CompraDto} from './compradto';
export interface FacturaCompraDto{
    _id?:string;
    fecha:string;
    num_de_factura:number;
    compra:CompraDto;
    tipo_de_factura:string;
    tipo_de_iva:number;
    montoiva:number;
}
