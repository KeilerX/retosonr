import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import routes from './routes';
import { Status } from './entity/Status';

const PORT = process.env.PORT || 3061;

createConnection().then(async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  //Routes
  app.use('/', routes);

  //Run this once
    /* const statusRepository = getRepository(Status);
    const status1 = new Status();
    status1.nombre = "registrada";
    await statusRepository.save(status1);
  
    const status2 = new Status();
    status2.nombre = "aceptada";
    await statusRepository.save(status2);
  
    const status3 = new Status();
    status3.nombre = "rechazada";
    await statusRepository.save(status3); */
  //End

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
}).catch(error => console.log(error));
