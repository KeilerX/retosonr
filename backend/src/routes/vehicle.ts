import { Router } from 'express';
import VehicleController from '../controllers/vehicleController';
import { checkJwt } from './../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], VehicleController.getVehicles);
router.get('/:id', [checkJwt], VehicleController.getVehicleById);
router.post('/', [checkJwt], VehicleController.createVehicle);
router.patch('/:id', [checkJwt], VehicleController.updateVehicle);
router.delete('/:id', [checkJwt], VehicleController.deleteVehicle);

export default router;