import { Collection, Db, ObjectId, ObjectID } from "mongodb";
import { Venta } from '../models/venta';
import {Factura} from '../models/factura';
export class FacturaService {
    private facturas: Collection<any>;
    constructor(db: Db) {
        this.facturas = db.collection('Facturas');
    }
    public CrearFactura(factura: Factura): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.facturas.insertOne(factura);
                resolve(res.insertedId.toHexString());
            } catch (err) {
                reject(err);
            }
        });
    }
    public BuscarFactura(_idfactura:string):Promise<Factura>{
        return new Promise(async (resolve,reject)=>{
            try{
                const id=new ObjectID(_idfactura)
                const factura=await this.facturas.findOne(id);
                resolve(factura);

            }catch(err){
                reject(err);
            }
        })
    }
    public ArregloFacturas():Promise<Factura[]>{
        return new Promise(async(resolve,reject)=>{
            try{
                const arreglofacturas = await this.facturas.find().toArray();
                resolve(arreglofacturas);

            }catch(err){
                reject(err);
            }
        })
    }
    public BorrarFacturas():Promise<number>{
        return new Promise(async(resolve,reject)=>{
            try{
                const facturasborradas=await this.facturas.deleteMany({});
                resolve(facturasborradas.result.n);
            }catch(err){
                reject(err);
            }
        })
    }




}