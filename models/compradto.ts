import {Producto} from './producto';
import { Proveedor } from './proveedor';
export interface CompraDto{
    _id?:string;
    fecha:string;
    monto_total?:number;
    _idnotadecredito?:string;
    productos_compra:Producto[];
    proveedor?:Proveedor[];
}