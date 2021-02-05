import { Router } from 'express';
import ObservationController from '../controllers/observationController';
import { checkJwt } from './../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], ObservationController.getObservations);
router.post('/', [checkJwt], ObservationController.createObservation);
router.patch('/:id', [checkJwt], ObservationController.editObservation);
router.delete('/:id', [checkJwt], ObservationController.deleteObservation);
router.patch('/status/:id', [checkJwt], ObservationController.updateStatusObservation);
router.get('/employees', [checkJwt], ObservationController.getEmployeesObservations);

export default router;