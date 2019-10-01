import { Collection, Db, ObjectId } from "mongodb";
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';
import { ProductoVenta } from '../models/producto_venta';
export class VentaService {
    private ventas: Collection<any>;
    constructor(db: Db) {
        this.ventas = db.collection('Ventas');
    }
    public CrearVenta(venta: Venta): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.ventas.insertOne(venta);
                resolve(res.insertedId.toHexString());
            } catch (err) {
                reject(err);
            }
        });
    }
    public InsertarProducto(_idventa:string, cantidad:number,): Promise<void> {
        return new Promise(async (resolve, reject) => {
                try{
                    const venta= await this.ventas.findOne({id:_idventa});
                }
        });
    }
}
