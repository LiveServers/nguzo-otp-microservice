"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const otp_service_1 = require("../service/otp.service");
let OtpController = class OtpController {
    constructor(otpService) {
        this.otpService = otpService;
    }
    generateOtp(dto) {
        return this.otpService.generateOtp(dto);
    }
    validateOtp(dto) {
        return this.otpService.validateOtp(dto);
    }
    generateOtpEvent(data) {
        return this.otpService.generateOtp(data);
    }
    validateOtpEvent(data) {
        return this.otpService.validateOtp(data);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/api/v1/generate-otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], OtpController.prototype, "generateOtp", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/api/v1/validate-otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], OtpController.prototype, "validateOtp", null);
__decorate([
    (0, microservices_1.MessagePattern)('generate-otp'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], OtpController.prototype, "generateOtpEvent", null);
__decorate([
    (0, microservices_1.MessagePattern)('validate-otp'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], OtpController.prototype, "validateOtpEvent", null);
OtpController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [otp_service_1.OtpService])
], OtpController);
exports.OtpController = OtpController;
//# sourceMappingURL=otp.controller.js.map