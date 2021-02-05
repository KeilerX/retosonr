"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observation = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Vehicle_1 = require("./Vehicle");
var Status_1 = require("./Status");
var Observation = /** @class */ (function (_super) {
    __extends(Observation, _super);
    function Observation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Observation.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Observation.prototype, "detalle", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.observationsCreated; }),
        __metadata("design:type", User_1.User)
    ], Observation.prototype, "creado_por", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.observationsSolved; }, { nullable: true }),
        __metadata("design:type", User_1.User)
    ], Observation.prototype, "actualizada_por", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Vehicle_1.Vehicle; }, function (vehicle) { return vehicle.vehiclesRegistered; }),
        __metadata("design:type", Vehicle_1.Vehicle)
    ], Observation.prototype, "idvehiculo", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Status_1.Status; }, function (status) { return status.observationsStatus; }),
        __metadata("design:type", Status_1.Status)
    ], Observation.prototype, "idestado", void 0);
    Observation = __decorate([
        typeorm_1.Entity()
    ], Observation);
    return Observation;
}(typeorm_1.BaseEntity));
exports.Observation = Observation;
