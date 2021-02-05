"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Vehicle_1 = require("../entity/Vehicle");
var VehicleController = /** @class */ (function () {
    function VehicleController() {
    }
    VehicleController.getVehicles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vehicleRepository, vehicles, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vehicleRepository = typeorm_1.getRepository(Vehicle_1.Vehicle);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vehicleRepository.find()];
                case 2:
                    vehicles = _a.sent();
                    if (vehicles.length > 0) {
                        res.send(vehicles);
                    }
                    else {
                        res.status(404).json({ message: 'Sin resultado' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'No se puede recuperar los vehiculos' })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    VehicleController.getVehicleById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, vehicleRepository, vehicle, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    vehicleRepository = typeorm_1.getRepository(Vehicle_1.Vehicle);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vehicleRepository.findOneOrFail(id)];
                case 2:
                    vehicle = _a.sent();
                    res.send(vehicle);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(404).json({ message: 'Sin resultado' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    VehicleController.createVehicle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vim, vehicle, errors, vehicleRepository, e_3, newVehicle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vim = req.body.vim;
                    vehicle = new Vehicle_1.Vehicle();
                    vehicle.vim = vim;
                    return [4 /*yield*/, class_validator_1.validate(vehicle)];
                case 1:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    vehicleRepository = typeorm_1.getRepository(Vehicle_1.Vehicle);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, vehicleRepository.save(vehicle)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Error al registrar vehículo' })];
                case 5:
                    newVehicle = {
                        id: vehicle.id,
                        vim: vehicle.vim
                    };
                    res.send({ newVehicle: newVehicle, message: 'Vehículo creado' });
                    return [2 /*return*/];
            }
        });
    }); };
    VehicleController.updateVehicle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vehicle, id, vim, vehicleRepository, e_4, validationObj, errors, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    vim = req.body.vim;
                    vehicleRepository = typeorm_1.getRepository(Vehicle_1.Vehicle);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vehicleRepository.findOneOrFail(id)];
                case 2:
                    vehicle = _a.sent();
                    vehicle.vim = vim;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'No se encontró vehículo' })];
                case 4:
                    validationObj = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(vehicle, validationObj)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, vehicleRepository.save(vehicle)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'No se puede guardar los datos del vehículo' })];
                case 9:
                    res.status(201).json({ vehicle: vehicle, message: 'Vehículo modificado' });
                    return [2 /*return*/];
            }
        });
    }); };
    VehicleController.deleteVehicle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, vehicleRepository, vehicle, e_6, vehicleDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    vehicleRepository = typeorm_1.getRepository(Vehicle_1.Vehicle);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vehicleRepository.findOneOrFail(id)];
                case 2:
                    vehicle = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Vehículo no encontrado' })];
                case 4:
                    vehicleRepository.delete(id);
                    vehicleDeleted = {
                        id: vehicle.id
                    };
                    res.status(201).json({ vehicleDeleted: vehicleDeleted, message: 'Vehículo Eliminado' });
                    return [2 /*return*/];
            }
        });
    }); };
    return VehicleController;
}());
exports.default = VehicleController;
