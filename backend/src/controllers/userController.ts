import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';

class UserController {
  static getUsers = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    try {
      const users = await userRepository.find();
      if (users.length > 0) {
        const userNoPass = users.map(u => ({ id: u.id, nombre_usuario: u.nombre_usuario }));
        res.send(userNoPass);
      } else {
        res.status(404).json({ message: 'Sin resultado' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'No se puede recuperar a los usuarios' });
    }
  }

  static getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(404).json({ message: 'Sin resultado' });
    }
  }

  static createUser = async (req: Request, res: Response) => {
    const { nombre_usuario, password } = req.body;
    const user = new User();
    user.nombre_usuario = nombre_usuario;
    user.password = password;

    //Validations
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const userRepository = getRepository(User);
    try {
      //Hashing password
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }
    const newUser = {
      id: user.id,
      nombre_usuario: user.nombre_usuario
    };
    res.send({ newUser, message: 'Usuario creado' });
  }

  static editUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { nombre_usuario } = req.body;
    const userRepository = getRepository(User);

    try {
      user = await userRepository.findOneOrFail(id);
      user.nombre_usuario = nombre_usuario;
    } catch (e) {
      return res.status(404).json({ message: 'No se encontró usuario' });
    }

    //Validations
    const validationObj = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationObj);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'El nombre de usuario ya esta en uso' });
    }
    res.status(201).json({ message: 'Usuario modificado' });
  }

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    userRepository.delete(id);
    res.status(201).json({ message: 'Usuario eliminado' });
  }
}

export default UserController;