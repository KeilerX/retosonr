"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var jwt_1 = require("./../middlewares/jwt");
var router = express_1.Router();
router.get('/', [jwt_1.checkJwt], userController_1.default.getUsers);
router.get('/:id', [jwt_1.checkJwt], userController_1.default.getUserById);
router.post('/', userController_1.default.createUser);
router.patch('/:id', [jwt_1.checkJwt], userController_1.default.editUser);
router.delete('/:id', [jwt_1.checkJwt], userController_1.default.deleteUser);
exports.default = router;
