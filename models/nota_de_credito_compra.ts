import { ProductoCompra } from "./producto_compra";
export interface NotaDeCredCompra{
    _id?:string;
    fecha:string;
    num_de_nota:number;
    _idcompra:string;
    _idproveedor:string;
    arreglodeproductos:ProductoCompra[];
    monto_a_favor?:number;
    notafinalizada: boolean;
}