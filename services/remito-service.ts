import { Collection, Db, ObjectId } from "mongodb";
import { Remito } from '../models/remito';

export class RemitoService {
    private remitos: Collection<any>;
    constructor(db: Db) {
        this.remitos = db.collection('Remitos');
    }
    public CrearRemito(remito: Remito): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.remitos.insertOne(remito);
                resolve(res.insertedId.toHexString());
            } catch (err) {
                reject(err);
            }
        });
    }
    public ArregloRemitos():Promise<Remito[]>{
        return new Promise(async(resolve,reject)=>{
            try{
                const arregloremitos = await this.remitos.find().toArray();
                resolve(arregloremitos);

            }catch(err){
                reject(err);
            }
        })
    }
    public BorrarRemitos():Promise<number>{
        return new Promise(async(resolve,reject)=>{
            try{
                const remitosborrados=await this.remitos.deleteMany({});
                resolve(remitosborrados.result.n);
            }catch(err){
                reject(err);
            }
        })
    }

}    