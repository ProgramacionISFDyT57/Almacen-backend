import { Compra } from "./compra";
import { Proveedor } from "./proveedor";
export interface NotaDeCredCompraDto{
    _id?:string;
    fecha:string;
    num_de_nota:number;
    proveedor:Proveedor;
    monto_a_favor:number;
}