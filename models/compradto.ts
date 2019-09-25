import {Producto} from './producto';
export interface CompraDto{
    fecha:string;
    monto_total:number;
    productos_compra:Producto[];
}