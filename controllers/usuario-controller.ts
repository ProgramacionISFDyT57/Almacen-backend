import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import bcrypt =require('bcryptjs');
import {Usuario} from '../models/usuario';
import {UsuarioService} from'../services/usuario-service';
export class UsuarioController {
    private nombredb: string;
    private nombrecoleccion5 = "Usuarios";
    private conexión: MongoClient;
    private usuarioservice:UsuarioService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.usuarioservice= new UsuarioService(conexion.db(nombredb));
        this.Crear=this.Crear.bind(this);
        this.Listar=this.Listar.bind(this);
        this.Modificar=this.Modificar.bind(this);
        this.Buscar=this.Buscar.bind(this);
        this.Borrar=this.Borrar.bind(this);
        
    }
    public async  Crear(req: Request, res: Response) {
        if (req.body.nombre && req.body.mail&&req.body.clave) {
            try{
                const hash =await bcrypt.hash(req.body.clave, 10);
                const usuario1: Usuario = {
                    nombre: req.body.nombre,
                    mail:req.body.mail,
                    clave:hash
                }  
                await this.usuarioservice.CrearUsuario(usuario1);
                console.log("Usuario agregado");
                res.send("Usuario agregado a la base de datos");
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            console.log("No se encontraron todas las propiedades necesarias");
            res.status(400).send("Falta una de las propiedades del ususario");
        }

    }

    public async  Borrar(req: Request, res: Response) {
        try {
            const resultado=  await this.usuarioservice.BorrarUsuario(req.params._id);
            if(resultado){
            res.send("Se borro correctamente");
            console.log("Se borro correctamente el usuario");
            }else{
                res.status(404).send('No se encontró el usuario');
            }
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    public async Buscar(req: Request, res: Response) {
        try {
            const arreglousuarios = await this.usuarioservice.BuscarUsuarios(req.query);
            console.log(arreglousuarios);
            res.json(arreglousuarios);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }

    }
    public async Modificar(req: Request, res: Response) {
        if (req.body.nombre || req.body.mail || req.body.clave) {
            try {
                const s1: any = {}
                if(req.body.nombre){
                    s1.nombre = req.body.nombre;
                }
                if(req.body.mail){
                    s1.mail = req.body.mail;
                }
                if(req.body.clave){
                    s1.clave = req.body.clave;
                }
                const resultadomodificado = await this.usuarioservice.ModificarUsuario(req.params._id, s1);
                if(resultadomodificado){
                    console.log("Se modificó correctamente el usuario");
                    res.send("Se modificó correctamente el usuario");
                }else{
                    res.status(404).send('No se pudo modificar el usuario');
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: err });
            }
        } else {
            console.log("Error al enviar las propiedades");
            res.status(400).send("No se enviaron correctamente las propiedades del usuario");
        }



    }
    public async Listar(req: Request, res: Response) {
        console.log(req.query);
        try {
            const arreglousuarios= await this.usuarioservice.ListarUsuario();
            console.log(arreglousuarios);
            res.json(arreglousuarios);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }

    }


}