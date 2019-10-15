import { Collection, Db, ObjectId, ObjectID } from "mongodb";
import { Usuario } from "../models/usuario";
export class UsuarioService {
    private usuarios: Collection<any>;
    constructor(db: Db) {
        this.usuarios = db.collection('Usuarios');
    }
}    