import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { nombre_usuario, password } = req.body;

    if (!(nombre_usuario && password)) {
      return res.status(400).json({ message: 'Se requiere de usuario y contraseña' });
    }
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { nombre_usuario } });
    } catch (e) {
      return res.status(404).json({ message: 'Usuario no registrado' });
    }

    //Check hashed password
    if (!user.checkPassword(password)) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrecto' });
    }

    const token = jwt.sign({ userId: user.id, nombre_usuario: user.nombre_usuario }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  };
}

export default AuthController;