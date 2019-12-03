import { Collection, Db, ObjectId, ObjectID } from "mongodb";
import{NotaDeCredCompra} from '../models/nota_de_credito_compra';
export class NotaDeCreditoCompraService {
    private notas_de_credito_de_compra: Collection<any>;
    constructor(db: Db) {
        this.notas_de_credito_de_compra = db.collection('Notas de Credito de Compra');
    }
    public CrearNota(nota:NotaDeCredCompra): Promise<string>{
        return new Promise(async (resolve,reject)=>{
            try{
                const res=await this.notas_de_credito_de_compra.insertOne(nota);
                resolve(res.insertedId.toHexString());
            } catch(err){
                reject(err);
            }
        })
    }public Arreglonotas():Promise<NotaDeCredCompra[]>{
        return new Promise(async(resolve,reject)=>{
            try{
                const arreglonotas = await this.notas_de_credito_de_compra.find().toArray();
                resolve(arreglonotas);

            }catch(err){
                reject(err);
            }
        })
    }
    public Borrarnotas():Promise<number>{
        return new Promise(async(resolve,reject)=>{
            try{
                const notasborradas=await this.notas_de_credito_de_compra.deleteMany({});
                resolve(notasborradas.result.n);
            }catch(err){
                reject(err);
            }
        })
    }
    public BuscarNotaPorId(id:string):Promise<NotaDeCredCompra>{
        return new Promise(async(resolve,reject)=>{
            try{
                const _id=new ObjectID(id);
                const notadecredito=await this.notas_de_credito_de_compra.findOne(_id);
                resolve(notadecredito);
            }catch(err){
                reject(err);
            }
        })
    }
    public FinalizarNota(_idnota: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = new ObjectId(_idnota);
                const notamodificada = await this.notas_de_credito_de_compra.updateOne({ _id: id },
                    { $set: { comprafinalizada: true} })
                    resolve();
            } catch (err) {
                reject(err);
            }
        })
    }


}    