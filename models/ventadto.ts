import{Producto} from './producto';
export interface VentaDto{
    _id:string;
    fecha:string;
    monto_total:number;
    productos_venta:Producto[];
}