export interface FacturaVenta{
    _id?:string;
    fecha:string;
    num_de_factura:number;
    _idventa:string;
    tipo_de_factura:string;
    tipo_de_iva:number;
    cliente:string;
}