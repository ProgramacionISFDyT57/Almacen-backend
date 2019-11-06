import { ProductoCompra } from "./producto_compra";
export interface NotaDeCredCompra{
    fecha:string;
    num_de_nota:number;
    _idcompra:string;
    _idproveedor:string;
    arreglodeproductos:ProductoCompra[];
    cantidad:number;
    monto_a_favor?:number;
}