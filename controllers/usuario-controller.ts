import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { request } from 'https';
import {Usuario} from '../models/usuario';
import {UsuarioService} from'../services/usuario-service';
export class FacturaController {
    private nombredb: string;
    private nombrecoleccion5 = "Usuarios";
    private conexión: MongoClient;
    private usuarioservice:UsuarioService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.usuarioservice= new UsuarioService(conexion.db(nombredb));
        
    }
}