import{Producto} from './producto';
export interface VentaDto{
    fecha:string;
    monto_total:number;
    productos_venta:Producto[];
}