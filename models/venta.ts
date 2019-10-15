import {ProductoVenta} from './producto_venta';
export interface Venta{
    _id?:string,
    fecha:string;
    monto_total?:number;
    productos_venta?:ProductoVenta[];
    ventafinalizada:boolean;
}