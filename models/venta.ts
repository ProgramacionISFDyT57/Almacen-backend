import {ProductoVenta} from './producto_venta';
export interface Venta{
    fecha:number;
    monto_total:number;
    productos_venta:ProductoVenta[];
}