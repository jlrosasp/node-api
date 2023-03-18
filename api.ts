import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { MongoClient } from 'mongodb';

// Variable para la cadena de conexión a MongoDB
let url: string = ``;

// Evaluación de variables de entorno según ambiente
/* if (process.env.NODE_ENV == 'DEV ') { */ // PARA WINDOWS
if (process.env.NODE_ENV == 'DEV') { // PARA LINUX
    dotenv.config({debug: false});
    // Ambiente DEV | Sin Credenciales (Sin usuario y contraseña)
    url = `mongodb://${process.env.DELASALLE_MONGO_HOST}:${process.env.DELASALLE_MONGO_PORT}/${process.env.DELASALLE_MONGO_DATABASE}`;
/* } else if (process.env.NODE_ENV == 'QAs ') { */ // PARA WINDOWS
} else if (process.env.NODE_ENV == 'QAs') { // PARA LINUX
    // Ambiente QAs | Con autenticación
    url = `mongodb://${process.env.DELASALLE_MONGO_USER}:${process.env.DELASALLE_MONGO_PASSWORD}@${process.env.DELASALLE_MONGO_HOST}:${process.env.DELASALLE_MONGO_PORT}/${process.env.DELASALLE_MONGO_DATABASE}`;
/* } else { */ // PARA WINDOWS
} else { // PARA LINUX
    // Ambiente PRO | Con autenticación y en modo clúster
    url = `mongodb://${process.env.DELASALLE_MONGO_USER}:${process.env.DELASALLE_MONGO_PASSWORD}@${process.env.DELASALLE_MONGO_HOST_NODE01}:${process.env.DELASALLE_MONGO_PORT01},${process.env.DELASALLE_MONGO_HOST_NODE02}:${process.env.DELASALLE_MONGO_PORT02},${process.env.DELASALLE_MONGO_HOST_NODE03}:${process.env.DELASALLE_MONGO_PORT03}/${process.env.DELASALLE_MONGO_DATABASE}?rs=${process.env.DELASALLE_MONGO_RS}`;
}


// console.log(`La variable de entorno para el servidor ${process.env.DELASALLE_MONGO_HOST}`);

console.log(`La cadena de conexión es: ${url}`);

const clientdb = new MongoClient(url);

const api = express();

api.use(cors());

api.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        data: 'Sucess'
    });
});

api.get('/dc', (req: Request, res: Response) => {
    
    getDataDC()
        .then((dc: any) => {
            // Código Asíncrono
            res.status(200).json({
                status: 'OK',
                title: 'Hello from DC Comic Heroes...',
                logo: '',
                data: dc
            });
        })
        .catch((err: any) => {
            // Código Asíncrono
            res.status(500).json({
                status: 'FAIL',
                title: 'Error from DC Comic Heroes...',
                logo: '',
                data: err
            });
        })
        .finally(() => {
            clientdb.close()
        });

    // const dc: any = getDatataDC()
    // // Demo
    // res.status(200).json({
    //     status: 'OK',
    //     title: 'Hello from DC Comic Heroes...',
    //     logo: '',
    //     data: []
    // });
});

api.get('/marvel', (req: Request, res: Response) => {
    
    getDataMarvel()
        .then((marvel: any) => {
            // Código Asíncrono
            res.status(200).json({
                status: 'OK',
                title: 'Hello from Marvel Comic Heroes...',
                logo: '',
                data: marvel
            });
        })
        .catch((err: any) => {
            // Código Asíncrono
            res.status(500).json({
                status: 'FAIL',
                title: 'Error from Marvel Comic Heroes...',
                logo: '',
                data: err
            });
        })
        .finally(() => {
            clientdb.close()
        });
    
    // res.status(200).json({
    //     status: 'OK',
    //     title: 'Hello from Marvel Comic Heroes...',
    //     logo: '',
    //     data: []
    // });
});

api.get('/about', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        title: 'Hello from about site info...',
        logo: '',
        data: {
            siteName: 'Catálogo de superhéroes 2022',
            trademarks: [
                'Marvel',
                'DC Comics'
            ],
            frontEnd: [
                'Angular'
            ],
            backEnd: [
                'Node JS',
                'Express',
                'Mongo DB'
            ],
            developedBy: 'Rafael Paniagua Soto',
            studentFolio: '616863',
            subject: 'Tecnologías Web de Código Abierto',
            programStudy: 'Maestría en Tecnologías Web y Dispositivos Móviles'
        }
    });
});

api.listen(3000, () => {
    console.log(`Servidor Express funcionando correctamente en puerto 3000`);
});

/**
 * FUNCTIONS DECLARATIONS
 */
const getDataDC:any = async () => {
    // Conexión a MongoDB
    await clientdb.connect();
    // Selección de Base de Datos
    const db = clientdb.db(process.env.DELASALLE_MONGO_DATABASE);
    // Obtenemos los datos de la colección Heroes | DC Comics
    return await db.collection('heroes').find({publisher: "DC Comics"}).toArray();
};

const getDataMarvel:any = async () => {
    // Conexión a MongoDB
    await clientdb.connect();
    // Selección de Base de Datos
    const db = clientdb.db(process.env.DELASALLE_MONGO_DATABASE);
    // Obtenemos los datos de la colección Heroes | Marvel Comics
    return await db.collection('heroes').find({publisher: "Marvel Comics"}).toArray();
};



// const nombre: string = `Jose Luis Rosas Peimbert`;
// const edad: number = 36;

// const domicilio1: string = "Oceano Indico 252";

// const domicilio2: string = "Privada Minivet";

// const test: string = "Un valor de prueba";

// console.log(`Hola NodeJS... te saluda ${nombre}, con una traspilacion dinámica de TS a JS, 08/10/2022`);

// console.log(`Domicilio 1 ${domicilio1}`);

// console.log(`Domicilio 2 ${domicilio2}`);

// console.log(`Constante de prueba con valor: ${test}`)