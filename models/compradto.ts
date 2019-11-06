import {Producto} from './producto';
import { Proveedor } from './proveedor';
export interface CompraDto{
    fecha:string;
    monto_total?:number;
    productos_compra:Producto[];
    proveedor?:Proveedor[];
}