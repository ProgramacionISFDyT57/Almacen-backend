import { ProductoCompra } from "./producto_compra";
export interface Compra{
    _id?:string;
    fecha:string;
    monto_total?: number;
    productos_compra?: ProductoCompra[];
    comprafinalizada: boolean;
    _idproveedor:string;
    _idnotadecredito?:string;
}