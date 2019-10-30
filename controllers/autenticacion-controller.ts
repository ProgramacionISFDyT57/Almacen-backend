import { Compra } from '../models/compra';
import { Producto } from '../models/producto';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import {UsuarioService} from '../services/usuario-service';
import bcrypt =require('bcryptjs');
import jwt=require ('jsonwebtoken');
import {Token} from '../models/token';
import { NextFunction } from 'connect';

export class AutenticacionController {
    private nombredb: string;
    private nombrecoleccion5 ="Usuarios" 
    private conexión: MongoClient;
    private usuarioservice:UsuarioService;
    private contraseña='bBQGAtw75yBuv2jujsO8';
    constructor(conexión: MongoClient, nombredb: string) {
        this.conexión = conexión;
        this.nombredb = nombredb;
        this.usuarioservice=new UsuarioService(conexión.db(nombredb));
        this.Login=this.Login.bind(this);
        this.Token=this.Token.bind(this);
    }
    public async Login(req: Request, res: Response) {
        if(req.body.mail&&req.body.clave){
            try{
                const usuario=await this.usuarioservice.BuscarUsuariopormail(req.body.mail)
                if(usuario){
                    const resultado=await bcrypt.compare(req.body.clave,usuario.clave);
                    if(resultado){
                        const token1: Token ={
                            email: usuario.mail,
                            nombre:usuario.nombre,
                            fecha:new Date().toISOString()
                        }
                        console.log(token1);
                        const token=await jwt.sign(token1,this.contraseña);
                        res.status(200).send(token);
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



    }public async Token(req:Request, res:Response, next:NextFunction){
        const token=req.get('token')
        if(token){
            try{
                const resultado=jwt.verify(token,this.contraseña);
                res.locals=resultado;
                next();
            }catch (err) {
                console.error(err);
                res.status(401).json({ error: err });
            } 
        }else{
            res.status(401).send("No hay token de seguridad");
        }
    }
}