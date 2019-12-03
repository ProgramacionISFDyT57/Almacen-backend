import {ProductoCompra} from './producto_compra';
export interface Remito{
    _id?:string;
    fecha:string;
    num_de_remito:number;
    _idcompra:string;
    _idproveedor:string;
}