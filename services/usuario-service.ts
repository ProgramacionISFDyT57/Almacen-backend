import { Collection, Db, ObjectId, ObjectID } from "mongodb";
import { Usuario } from "../models/usuario";
export class UsuarioService {
    private usuarios: Collection<any>;
    constructor(db: Db) {
        this.usuarios = db.collection('Usuarios');
    }
    public CrearUsuario(usuario: Usuario): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.usuarios.insertOne(usuario);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    public ListarUsuario(): Promise<Usuario[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arreglousuarios = await this.usuarios.find().toArray();
                resolve(arreglousuarios);
            } catch (err) {
                reject(err);
            }

        });
    }
    public BorrarUsuario(id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const idd = new ObjectId(id);
                const usuarioborrado = await this.usuarios.deleteOne({ _id: idd });
                if (usuarioborrado.result.n === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }

            } catch (err) {
                reject(err);
            }

        });
    }
    public BuscarUsuarios(parametro: any): Promise<Usuario[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const arreglousuarios = await this.usuarios.find(parametro).toArray();
                resolve(arreglousuarios);
            } catch (err) {
                reject(err);
            }

        });
    }
    public ModificarUsuario(id: string, s1: any): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const idd = new ObjectId(id);
                const usuariomodificado = await this.usuarios.updateOne({ _id: idd },
                    { $set: s1 });
                if (usuariomodificado.result.n > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (err) {
                reject(err);
            }

        });
    }
    public BuscarUsuarioPorId(id: string): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            try {
                const idd = new ObjectId(id);
                const usuario = await this.usuarios.findOne({ _id: idd });
                resolve(usuario);
            } catch (err) {
                reject(err);
            }
        });
    }
    public BuscarUsuariopormail(mail:string): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            try {
                const usuario = await this.usuarios.findOne({ mail })
                resolve(usuario);

            }catch(err){
                reject(err);
            }
            
        })
    }
}    