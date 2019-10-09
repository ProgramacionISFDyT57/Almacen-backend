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
    public ModificarVenta(_idventa: string, productos: ProductoVenta[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(_idventa);
                const ventamodificada = await this.ventas.updateOne({ _id: id },
                    { $set: { productos_venta: productos } })
                resolve();


            } catch (err) {
                reject(err);
            }
        });
    }
    public BuscarVenta(parametro: string): Promise<Venta> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(parametro);
                const venta = await this.ventas.findOne({ _id: id });
                resolve(venta);
            } catch (err) {
                reject(err);
            }
        })
    } public FinalizarVenta(_idventa: string, monto: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(_idventa);
                const ventamodificada = await this.ventas.updateOne({ _id: id },
                    { $set: { ventafinalizada: true, monto_total: monto } })
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    }public BorrarVentas():Promise<number>{
        return new Promise(async(resolve,reject)=>{
            try{
                const ventasborradas=await this.ventas.deleteMany({ventafinalizada:false});
                resolve(ventasborradas.result.n);
            }catch(err){
                reject(err);
            }
        })
    }
    
}
