import { Collection, Db, ObjectId } from "mongodb";
import { Producto } from '../models/producto';
import { Compra } from '../models/compra';
import { ProductoCompra } from '../models/producto_compra';
export class CompraService {
    private compras: Collection<any>;
    constructor(db: Db) {
        this.compras = db.collection('Compras');
    }
    public CrearCompra(compra: Compra): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.compras.insertOne(compra);
                resolve(res.insertedId.toHexString());
            } catch (err) {
                reject(err);
            }
        });
    }
}