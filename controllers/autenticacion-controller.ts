import { Compra } from '../models/compra';
import { Producto } from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import {UsuarioService} from '../services/usuario-service';
import bcrypt =require('bcryptjs');

export class AutenticacionController {
    private nombredb: string;
    private nombrecoleccion5 ="Usuarios" 
    private conexión: MongoClient;
    private usuarioservice:UsuarioService;
    constructor(conexión: MongoClient, nombredb: string) {
        this.conexión = conexión;
        this.nombredb = nombredb;
        this.usuarioservice=new UsuarioService(conexión.db(nombredb));
    }
    public async auntenticar(req: Request, res: Response) {
        if(req.body.mail&&req.body.clave){
            try{
                const usuario=await this.usuarioservice.BuscarUsuariopormail(req.body.mail)
                if(usuario){
                    const resultado=await bcrypt.compare(req.body.clave,usuario.clave);
                    if(resultado){
                        res.status(200).json("Sesion Iniciada");
                    }else{
                        res.status(401).json("Constraseña incorrecta");
                    }
                }else{
                    res.status(401).json("No se encontro el usuario")
                }
            }catch(err){
                res.status(500).json(err);

            }


        }else{
            res.status(400).json("No se obtuvieron las propiedades necesarias")
        }



    }
}