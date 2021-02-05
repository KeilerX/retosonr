import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Observation } from '../entity/Observation';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import { Status } from '../entity/Status';

class ObservationController {
  static getObservations = async (req: Request, res: Response) => {
    const observationRepository = getRepository(Observation);

    try {
      const observations = await observationRepository.find({
        relations: ['creado_por', 'idvehiculo', 'idestado', 'actualizada_por']
      });
      if (observations.length > 0) {
        const observationsToSend = observations.map(o => ({
          id: o.id,
          detalle: o.detalle,
          vim: o.idvehiculo.vim,
          estado: o.idestado.nombre,
          creado_por: o.creado_por.nombre_usuario,
          actualizada_por: o.actualizada_por ? o.actualizada_por.nombre_usuario : ''
        }))
        res.send(observationsToSend);
      } else {
        res.status(404).json({ message: 'Sin resultado' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'No se puede recuperar las observaciones' });
    }
  }

  static createObservation = async (req: Request, res: Response) => {
    const { detalle, creado_por, idvehiculo, idestado } = req.body;
    const observation = new Observation();
    observation.detalle = detalle;
    observation.creado_por = creado_por;
    observation.idvehiculo = idvehiculo;
    observation.idestado = idestado;

    //Validations
    const errors = await validate(observation);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const observationRepository = getRepository(Observation);

    try {
      await observationRepository.save(observation);
    } catch (e) {
      return res.status(409).json(e);
    }
    const newObservation = {
      id: observation.id,
      detalle: observation.detalle,
      creado_por: observation.creado_por,
      idvehiculo: observation.idvehiculo,
      idestado: observation.idestado,
    }
    res.send({ newObservation, message: 'Observación registrada' });
  }

  static editObservation = async (req: Request, res: Response) => {
    let observation;
    const { id } = req.params;
    const { detalle, actualizada_por } = req.body;
    const observationRepository = getRepository(Observation);

    try {
      observation = await observationRepository.findOneOrFail(id);
      observation.detalle = detalle;
      observation.actualizada_por = actualizada_por;
    } catch (e) {
      return res.status(404).json({ message: 'No se encontró observación' });
    }

    //Validations
    const validationObj = { validationError: { target: false, value: false } };
    const errors = await validate(observation, validationObj);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await observationRepository.save(observation);
    } catch (e) {
      return res.status(409).json({ message: 'No existe observación con ese id' });
    }

    res.status(201).json({ observation, message: 'Observación modificada' });
  }

  static deleteObservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const observationRepository = getRepository(Observation);
    let observation: Observation;

    try {
      observation = await observationRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Observación no encontrada' });
    }

    observationRepository.delete(id);
    const observationDeleted = {
      id: observation.id
    };
    res.status(201).json({ observationDeleted, message: 'Observación eliminada' });
  }

  static updateStatusObservation = async (req: Request, res: Response) => {
    let observation;
    const { id } = req.params;
    const { idestado, actualizada_por } = req.body;
    const observationRepository = getRepository(Observation);

    try {
      observation = await observationRepository.findOneOrFail(id);
      observation.idestado = idestado;
      observation.actualizada_por = actualizada_por;
    } catch (e) {
      return res.status(404).json({ message: 'No se escontró observación' });
    }

    //Validations
    const validationObj = { validationError: { target: false, value: false } };
    const errors = await validate(observation, validationObj);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await observationRepository.save(observation);
    } catch (e) {
      return res.status(409).json({ message: 'No se pudo actualizar el estado de la observación' });
    }
    res.status(201).json({ observation, message: 'Observación modificada' });
  }

  static getEmployeesObservations = async (req: Request, res: Response) => {
    const observationRepository = getRepository(Observation);
    const userRepository = getRepository(User);

    try {
      const observations = await observationRepository.find({
        relations: ['creado_por', 'idvehiculo', 'idestado', 'actualizada_por']
      });
      const allUsers = await userRepository.find();
      if (observations.length > 0 && allUsers.length > 0) {
        const allObservations = observations.map(o => ({
          creado_por: o.creado_por.nombre_usuario,
          estado: o.idestado.nombre
        }));

        const employeesObservations = allUsers.map((u, i) => ({
          id: i,
          nombre_usuario: u.nombre_usuario,
          registradas: 0,
          aceptadas: 0,
          rechazadas: 0
        }));

        for (let i = 0; i < employeesObservations.length; ++i) {
          for (let j = 0; j < allObservations.length; ++j) {
            if (employeesObservations[i].nombre_usuario === allObservations[j].creado_por) {
              if (allObservations[j].estado === "registrada") {
                employeesObservations[i].registradas += 1;
              } else if (allObservations[j].estado === "aceptada") {
                employeesObservations[i].aceptadas += 1;
              } else if (allObservations[j].estado === "rechazada") {
                employeesObservations[i].rechazadas += 1;
              }
            }
          }
        }

        const statusDetails = {
          registradas: 0,
          aceptadas: 0,
          rechazadas: 0
        };

        for (let k = 0; k < allObservations.length; ++k) {
          if (allObservations[k].estado === "registrada") {
            statusDetails.registradas += 1;
          } else if (allObservations[k].estado === "aceptada") {
            statusDetails.aceptadas += 1;
          } else if (allObservations[k].estado === "rechazada") {
            statusDetails.rechazadas += 1;
          }
        }

        const observationDetails = [
          {
            nombre: "registradas",
            cantidad: statusDetails.registradas,
          },
          {
            nombre: "aceptadas",
            cantidad: statusDetails.aceptadas,
          },
          {
            nombre: "rechazadas",
            cantidad: statusDetails.rechazadas,
          },
        ];

        res.send({ employeesObservations, observationDetails, message: 'Observaciones por empleado y resumen de observaciones respecto a su estado' });
      } else {
        res.status(404).json({ message: 'Sin resultado' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'No se puede recuperar las observaciones' });
    }
  }
}

export default ObservationController;