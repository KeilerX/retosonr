"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var vehicleController_1 = __importDefault(require("../controllers/vehicleController"));
var jwt_1 = require("./../middlewares/jwt");
var router = express_1.Router();
router.get('/', [jwt_1.checkJwt], vehicleController_1.default.getVehicles);
router.get('/:id', [jwt_1.checkJwt], vehicleController_1.default.getVehicleById);
router.post('/', [jwt_1.checkJwt], vehicleController_1.default.createVehicle);
router.patch('/:id', [jwt_1.checkJwt], vehicleController_1.default.updateVehicle);
router.delete('/:id', [jwt_1.checkJwt], vehicleController_1.default.deleteVehicle);
exports.default = router;
