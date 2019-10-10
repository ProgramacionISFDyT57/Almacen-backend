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
    } public ModificarCompra(_idcompra: string, productos: ProductoCompra[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(_idcompra);
                const compramodificada = await this.compras.updateOne({ _id: id },
                    { $set: { productos_compra: productos } })
                resolve();


            } catch (err) {
                reject(err);
            }
        });
    } public BuscarCompra(parametro: string): Promise<Compra> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(parametro);
                const compra = await this.compras.findOne({ _id: id });
                resolve(compra);
            } catch (err) {
                reject(err);
            }
        })
    } public FinalizarCompra(_idcompra: string, monto: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(_idcompra);
                const compramodificada = await this.compras.updateOne({ _id: id },
                    { $set: { comprafinalizada: true, monto_total: monto } })
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    }public BorrarCompras():Promise<number>{
        return new Promise(async(resolve,reject)=>{
            try{
                const comprasborradas=await this.compras.deleteMany({comprafinalizada:false});
                resolve(comprasborradas.result.n);
            }catch(err){
                reject(err);
            }
        })
    }public ArregloCompras():Promise<Compra[]>{
        return new Promise(async(resolve,reject)=>{
            try{
                const arreglocompras = await this.compras.find({ comprafinalizada: true }).toArray();
                resolve(arreglocompras);

            }catch(err){
                reject(err);
            }
        })
    }
}