import { Proveedor } from '../models/proveedor';
import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { ProveedorService } from '../services/proveedor-service';

export class ProveedorController {
    private nombredb: string;
    private nombrecoleccion6 = "Proveedores";
    private conexión: MongoClient;
    private proveedorservice: ProveedorService;
    constructor(conexion: MongoClient, nombredb: string, ) {
        this.conexión = conexion;
        this.nombredb = nombredb;
        this.Listar = this.Listar.bind(this);
        this.Crear = this.Crear.bind(this);
        this.Buscar = this.Buscar.bind(this);
        this.Borrar = this.Borrar.bind(this);
        this.Modificar = this.Modificar.bind(this);
        this.proveedorservice = new ProveedorService(conexion.db(nombredb));
    }
    public async Listar(req: Request, res: Response) {
        console.log(req.query);
        try {
            const arregloproveedores = await this.proveedorservice.ListarProveedor();
            console.log(arregloproveedores);
            res.json(arregloproveedores);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }

    }

    public async  Crear(req: Request, res: Response) {
        if (req.body.razon_social && req.body.cuil && req.body.num_de_telefono) {
            const proveedor1: Proveedor = {
                razon_social: req.body.razon_social,
                cuil: req.body.cuil,
                num_de_telefono: req.body.num_de_telefono,

            }
            try {
                const producto= await this.proveedorservice.CrearProveedor(proveedor1);
                console.log("Proveedor agregado");
                res.send({
                    mensaje:"Proveedor agregado a la base de datos",
                    id:producto
                });    

            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        } else {
            console.log("No se encontraron todas las propiedades necesarias");
            res.status(400).send("Falta una de las propiedades del proveedor");
        }

    }

    public async  Borrar(req: Request, res: Response) {
        try {
            const resultado = await this.proveedorservice.BorrarProveedor(req.params._id);
            if (resultado) {
                res.send("Se borro correctamente");
                console.log("Se borro correctamente el proveedor");
            } else {
                res.status(404).send('No se encontró el proveedor');
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    public async Buscar(req: Request, res: Response) {
        try {
            const arregloproveedores = await this.proveedorservice.BuscarProveedor(req.query);
            console.log(arregloproveedores);
            res.json(arregloproveedores);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }

    }
    public async Modificar(req: Request, res: Response) {
        if (req.body.razon_social || req.body.cuil || req.body.num_de_telefono) {
            try {
                const p1: any = {}
                if (req.body.razon_social) {
                    p1.razon_social = req.body.razon_social;
                }
                if (req.body.cuil) {
                    p1.cuil = req.body.cuil;
                }
                if (req.body.num_de_telefono) {
                    p1.num_de_telefono = req.body.num_de_telefono;
                }
                
                const resultadomodificado = await this.proveedorservice.ModificarProveedor(req.params._id, p1);
                if (resultadomodificado) {
                    console.log("Se modificó correctamente el proveedor");
                    res.send("Se modificó correctamente el proveedor");
                } else {
                    res.status(404).send('No se pudo modificar el proveeedor');
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: err });
            }
        } else {
            console.log("Error al enviar las propiedades");
            res.status(400).send("No se enviaron correctamente las propiedades del proveedor");
        }



    }
}    