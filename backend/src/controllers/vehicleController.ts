import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';

class VehicleController {
  static getVehicles = async (req: Request, res: Response) => {
    const vehicleRepository = getRepository(Vehicle);

    try {
      const vehicles = await vehicleRepository.find();
      if (vehicles.length > 0) {
        res.send(vehicles);
      } else {
        res.status(404).json({ message: 'Sin resultado' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'No se puede recuperar los vehiculos' });

    }
  }

  static getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const vehicleRepository = getRepository(Vehicle);

    try {
      const vehicle = await vehicleRepository.findOneOrFail(id);
      res.send(vehicle);
    } catch (e) {
      res.status(404).json({ message: 'Sin resultado' });
    }
  }

  static createVehicle = async (req: Request, res: Response) => {
    const { vim } = req.body;
    const vehicle = new Vehicle();
    vehicle.vim = vim;

    //Validations
    const errors = await validate(vehicle);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const vehicleRepository = getRepository(Vehicle);
    try {
      await vehicleRepository.save(vehicle);
    } catch (e) {
      return res.status(409).json({ message: 'Error al registrar vehículo' });
    }
    const newVehicle = {
      id: vehicle.id,
      vim: vehicle.vim
    };
    res.send({ newVehicle, message: 'Vehículo creado' });
  }

  static updateVehicle = async (req: Request, res: Response) => {
    let vehicle;
    const { id } = req.params;
    const { vim } = req.body;
    const vehicleRepository = getRepository(Vehicle);

    try {
      vehicle = await vehicleRepository.findOneOrFail(id);
      vehicle.vim = vim;
    } catch (e) {
      return res.status(404).json({ message: 'No se encontró vehículo' });
    }

    //Validations
    const validationObj = { validationError: { target: false, value: false } };
    const errors = await validate(vehicle, validationObj);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await vehicleRepository.save(vehicle);
    } catch (e) {
      return res.status(409).json({ message: 'No se puede guardar los datos del vehículo' });
    }
    res.status(201).json({ vehicle, message: 'Vehículo modificado' });
  }

  static deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const vehicleRepository = getRepository(Vehicle);
    let vehicle: Vehicle;

    try {
      vehicle = await vehicleRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    vehicleRepository.delete(id);
    const vehicleDeleted = {
      id: vehicle.id
    };
    res.status(201).json({ vehicleDeleted, message: 'Vehículo Eliminado' });
  }
}

export default VehicleController;