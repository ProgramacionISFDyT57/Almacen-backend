import {ProductoVenta} from './producto_venta';
export interface Venta{
    fecha:string;
    monto_total?:number;
    productos_venta?:ProductoVenta[];
}