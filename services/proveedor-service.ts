import { Collection, Db, ObjectId } from "mongodb";
import { Proveedor } from '../models/proveedor';
import { rejects } from "assert";
export class ProveedorService {
    private proveedores: Collection<any>;
    constructor(db: Db) {
        this.proveedores = db.collection('Proveedores');
    }
    public CrearProveedor(proveedor: Proveedor): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const _idproveedor=await this.proveedores.insertOne(proveedor);
                resolve(_idproveedor.insertedId.toHexString());
            } catch (err) {
                reject(err);
            }
        });
    }
    public ListarProveedor(): Promise<Proveedor[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arregloproveedores = await this.proveedores.find().toArray();
                resolve(arregloproveedores);
            } catch (err) {
                reject(err);
            }

        });
    }
    public BorrarProveedor(id:string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
               const idd= new ObjectId(id);
                const proveedorborrado= await this.proveedores.deleteOne({_id:idd});
                if(proveedorborrado.result.n===1){
                    resolve(true);
                }else{
                    resolve(false);
                }
               
            } catch (err) {
                reject(err);
            }

        });
    }
    public BuscarProveedor(parametro:any): Promise<Proveedor[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arregloproveedores= await this.proveedores.find(parametro).toArray();
                resolve(arregloproveedores);
            } catch (err) {
                reject(err);
            }

        });
    }
    public ModificarProveedor(id:string, p1:any): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const idd= new ObjectId(id);
                const proveedormodificado= await this.proveedores.updateOne({_id:idd},
                {$set:p1});
                if(proveedormodificado.result.n>0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            } catch (err) {
                reject(err);
            }

        });
    }

    public BuscarProveedorPorId (id:string): Promise<Proveedor>{
        return new Promise(async (resolve, reject) => {
            try{
                const idd= new ObjectId(id);
                const proveedor= await this.proveedores.findOne({_id:idd});
                resolve(proveedor); 
            }catch(err){
                reject(err);
            }
        });
    }
}

