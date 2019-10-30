import {CompraDto} from '../models/compradto';
export interface RemitoDto{
    fecha:string;
    num_de_remito:number;
    compra:CompraDto;
}