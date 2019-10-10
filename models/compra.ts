import { ProductoCompra } from "./producto_compra";
export interface Compra{
    fecha:string;
    monto_total?: number;
    productos_compra?: ProductoCompra[];
    comprafinalizada: boolean;
}