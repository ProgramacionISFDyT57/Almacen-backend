import {CompraDto} from './compradto';
export class FacturaCompraDto{
    fecha:string;
    num_de_factura:number;
    compra:CompraDto;
    tipo_de_factura:string;
    tipo_de_iva:number;
    montoiva:number;
}
