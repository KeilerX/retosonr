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
var typeorm_1 = require("typeorm");
var Observation_1 = require("../entity/Observation");
var class_validator_1 = require("class-validator");
var User_1 = require("../entity/User");
var ObservationController = /** @class */ (function () {
    function ObservationController() {
    }
    ObservationController.getObservations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var observationRepository, observations, observationsToSend, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    observationRepository = typeorm_1.getRepository(Observation_1.Observation);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, observationRepository.find({
                            relations: ['creado_por', 'idvehiculo', 'idestado', 'actualizada_por']
                        })];
                case 2:
                    observations = _a.sent();
                    if (observations.length > 0) {
                        observationsToSend = observations.map(function (o) { return ({
                            id: o.id,
                            detalle: o.detalle,
                            vim: o.idvehiculo.vim,
                            estado: o.idestado.nombre,
                            creado_por: o.creado_por.nombre_usuario,
                            actualizada_por: o.actualizada_por ? o.actualizada_por.nombre_usuario : ''
                        }); });
                        res.send(observationsToSend);
                    }
                    else {
                        res.status(404).json({ message: 'Sin resultado' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'No se puede recuperar las observaciones' })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    ObservationController.createObservation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, detalle, creado_por, idvehiculo, idestado, observation, errors, observationRepository, e_2, newObservation;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, detalle = _a.detalle, creado_por = _a.creado_por, idvehiculo = _a.idvehiculo, idestado = _a.idestado;
                    observation = new Observation_1.Observation();
                    observation.detalle = detalle;
                    observation.creado_por = creado_por;
                    observation.idvehiculo = idvehiculo;
                    observation.idestado = idestado;
                    return [4 /*yield*/, class_validator_1.validate(observation)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    observationRepository = typeorm_1.getRepository(Observation_1.Observation);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, observationRepository.save(observation)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_2)];
                case 5:
                    newObservation = {
                        id: observation.id,
                        detalle: observation.detalle,
                        creado_por: observation.creado_por,
                        idvehiculo: observation.idvehiculo,
                        idestado: observation.idestado,
                    };
                    res.send({ newObservation: newObservation, message: 'Observación registrada' });
                    return [2 /*return*/];
            }
        });
    }); };
    ObservationController.editObservation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var observation, id, _a, detalle, actualizada_por, observationRepository, e_3, validationObj, errors, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, detalle = _a.detalle, actualizada_por = _a.actualizada_por;
                    observationRepository = typeorm_1.getRepository(Observation_1.Observation);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, observationRepository.findOneOrFail(id)];
                case 2:
                    observation = _b.sent();
                    observation.detalle = detalle;
                    observation.actualizada_por = actualizada_por;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'No se encontró observación' })];
                case 4:
                    validationObj = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(observation, validationObj)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, observationRepository.save(observation)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'No existe observación con ese id' })];
                case 9:
                    res.status(201).json({ observation: observation, message: 'Observación modificada' });
                    return [2 /*return*/];
            }
        });
    }); };
    ObservationController.deleteObservation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, observationRepository, observation, e_5, observationDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    observationRepository = typeorm_1.getRepository(Observation_1.Observation);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, observationRepository.findOneOrFail(id)];
                case 2:
                    observation = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Observación no encontrada' })];
                case 4:
                    observationRepository.delete(id);
                    observationDeleted = {
                        id: observation.id
                    };
                    res.status(201).json({ observationDeleted: observationDeleted, message: 'Observación eliminada' });
                    return [2 /*return*/];
            }
        });
    }); };
    ObservationController.updateStatusObservation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var observation, id, _a, idestado, actualizada_por, observationRepository, e_6, validationObj, errors, e_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, idestado = _a.idestado, actualizada_por = _a.actualizada_por;
                    observationRepository = typeorm_1.getRepository(Observation_1.Observation);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, observationRepository.findOneOrFail(id)];
                case 2:
                    observation = _b.sent();
                    observation.idestado = idestado;
                    observation.actualizada_por = actualizada_por;
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'No se escontró observación' })];
                case 4:
                    validationObj = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(observation, validationObj)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, observationRepository.save(observation)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_7 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'No se pudo actualizar el estado de la observación' })];
                case 9:
                    res.status(201).json({ observation: observation, message: 'Observación modificada' });
                    return [2 /*return*/];
            }
        });
    }); };
    ObservationController.getEmployeesObservations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var observationRepository, userRepository, observations, allUsers, allObservations, employeesObservations, i, j, statusDetails, k, observationDetails, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    observationRepository = typeorm_1.getRepository(Observation_1.Observation);
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, observationRepository.find({
                            relations: ['creado_por', 'idvehiculo', 'idestado', 'actualizada_por']
                        })];
                case 2:
                    observations = _a.sent();
                    return [4 /*yield*/, userRepository.find()];
                case 3:
                    allUsers = _a.sent();
                    if (observations.length > 0 && allUsers.length > 0) {
                        allObservations = observations.map(function (o) { return ({
                            creado_por: o.creado_por.nombre_usuario,
                            estado: o.idestado.nombre
                        }); });
                        employeesObservations = allUsers.map(function (u, i) { return ({
                            id: i,
                            nombre_usuario: u.nombre_usuario,
                            registradas: 0,
                            aceptadas: 0,
                            rechazadas: 0
                        }); });
                        for (i = 0; i < employeesObservations.length; ++i) {
                            for (j = 0; j < allObservations.length; ++j) {
                                if (employeesObservations[i].nombre_usuario === allObservations[j].creado_por) {
                                    if (allObservations[j].estado === "registrada") {
                                        employeesObservations[i].registradas += 1;
                                    }
                                    else if (allObservations[j].estado === "aceptada") {
                                        employeesObservations[i].aceptadas += 1;
                                    }
                                    else if (allObservations[j].estado === "rechazada") {
                                        employeesObservations[i].rechazadas += 1;
                                    }
                                }
                            }
                        }
                        statusDetails = {
                            registradas: 0,
                            aceptadas: 0,
                            rechazadas: 0
                        };
                        for (k = 0; k < allObservations.length; ++k) {
                            if (allObservations[k].estado === "registrada") {
                                statusDetails.registradas += 1;
                            }
                            else if (allObservations[k].estado === "aceptada") {
                                statusDetails.aceptadas += 1;
                            }
                            else if (allObservations[k].estado === "rechazada") {
                                statusDetails.rechazadas += 1;
                            }
                        }
                        observationDetails = [
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
                        res.send({ employeesObservations: employeesObservations, observationDetails: observationDetails, message: 'Observaciones por empleado y resumen de observaciones respecto a su estado' });
                    }
                    else {
                        res.status(404).json({ message: 'Sin resultado' });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'No se puede recuperar las observaciones' })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return ObservationController;
}());
exports.default = ObservationController;
