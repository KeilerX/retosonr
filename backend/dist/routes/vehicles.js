"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var vehicleController_1 = __importDefault(require("../controllers/vehicleController"));
var router = express_1.Router();
router.get('/', vehicleController_1.default.getVehicles);
router.get('/:id', vehicleController_1.default.getVehicleById);
router.post('/', vehicleController_1.default.createVehicle);
router.patch('/:id', vehicleController_1.default.updateVehicle);
router.delete('/:id', vehicleController_1.default.deleteVehicle);
exports.default = router;
