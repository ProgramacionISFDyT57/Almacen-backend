import { Collection, Db, ObjectId } from "mongodb";
import { Producto } from '../models/producto';
export class ProductoService {
    private productos: Collection<any>;
    constructor(db: Db) {
        this.productos = db.collection('Productos');
    }
    public CrearProducto(producto: Producto): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.productos.insertOne(producto);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    public ListarProducto(): Promise<Producto[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arregloproductos = await this.productos.find().toArray();
                resolve(arregloproductos);
            } catch (err) {
                reject(err);
            }

        });
    }
    public BorrarProducto(id:string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
               const idd= new ObjectId(id);
                const productoborrado= await this.productos.deleteOne({_id:idd});
                if(productoborrado.result.n===1){
                    resolve(true);
                }else{
                    resolve(false);
                }
               
            } catch (err) {
                reject(err);
            }

        });
    }
    public BuscarProductos(parametro:any): Promise<Producto[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arregloproductos= await this.productos.find(parametro).toArray();
                resolve(arregloproductos);
            } catch (err) {
                reject(err);
            }

        });
    }
    public ModificarProducto(id:string, p1:any): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const idd= new ObjectId(id);
                const productomodificado= await this.productos.updateOne({_id:idd},
                {$set:p1});
                if(productomodificado.result.n>0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            } catch (err) {
                reject(err);
            }

        });
    }
}