import {CompraDto} from '../models/compradto';
export interface RemitoDto{
    _id?:string;
    fecha:string;
    num_de_remito:number;
    compra:CompraDto;
}