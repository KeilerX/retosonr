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
var User_1 = require("../entity/User");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userRepository, users, userNoPass, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.find()];
                case 2:
                    users = _a.sent();
                    if (users.length > 0) {
                        userNoPass = users.map(function (u) { return ({ id: u.id, nombre_usuario: u.nombre_usuario }); });
                        res.send(userNoPass);
                    }
                    else {
                        res.status(404).json({ message: 'Sin resultado' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'No se puede recuperar a los usuarios' })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepository, user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    res.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(404).json({ message: 'Sin resultado' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, nombre_usuario, password, user, errors, userRepository, e_3, newUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, nombre_usuario = _a.nombre_usuario, password = _a.password;
                    user = new User_1.User();
                    user.nombre_usuario = nombre_usuario;
                    user.password = password;
                    return [4 /*yield*/, class_validator_1.validate(user)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    //Hashing password
                    user.hashPassword();
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El usuario ya existe' })];
                case 5:
                    newUser = {
                        id: user.id,
                        nombre_usuario: user.nombre_usuario
                    };
                    res.send({ newUser: newUser, message: 'Usuario creado' });
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.editUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, id, nombre_usuario, userRepository, e_4, validationObj, errors, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    nombre_usuario = req.body.nombre_usuario;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    user.nombre_usuario = nombre_usuario;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'No se encontró usuario' })];
                case 4:
                    validationObj = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationObj)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'El nombre de usuario ya esta en uso' })];
                case 9:
                    res.status(201).json({ message: 'Usuario modificado' });
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepository, user, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepository = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Usuario no encontrado' })];
                case 4:
                    userRepository.delete(id);
                    res.status(201).json({ message: 'Usuario eliminado' });
                    return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.default = UserController;
