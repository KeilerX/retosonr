"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var observationController_1 = __importDefault(require("../controllers/observationController"));
var jwt_1 = require("./../middlewares/jwt");
var router = express_1.Router();
router.get('/', [jwt_1.checkJwt], observationController_1.default.getObservations);
router.post('/', [jwt_1.checkJwt], observationController_1.default.createObservation);
router.patch('/:id', [jwt_1.checkJwt], observationController_1.default.editObservation);
router.delete('/:id', [jwt_1.checkJwt], observationController_1.default.deleteObservation);
router.patch('/status/:id', [jwt_1.checkJwt], observationController_1.default.updateStatusObservation);
router.get('/employees', [jwt_1.checkJwt], observationController_1.default.getEmployeesObservations);
exports.default = router;
