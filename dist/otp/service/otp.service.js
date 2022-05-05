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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const otp_repository_1 = require("../repository/otp.repository");
const logger = new common_1.Logger();
let OtpService = class OtpService {
    constructor(otpRepository, configService) {
        this.otpRepository = otpRepository;
        this.configService = configService;
    }
    async sendEmail(recepientEmail, name, message, subject) {
        try {
            const AWS_SES = new aws_sdk_1.SES({ region: this.configService.get("AWS_REGION"), });
            const params = {
                Source: this.configService.get("AWS_EMAIL_SOURCE"),
                Destination: {
                    ToAddresses: [
                        recepientEmail,
                    ]
                },
                Message: {
                    Body: {
                        Text: {
                            Charset: 'UTF-8',
                            Data: `Dear ${name}, ${message}`,
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: subject,
                    }
                }
            };
            return await AWS_SES.sendEmail(params).promise();
        }
        catch (e) {
            logger.log(e);
            throw new Error(e);
        }
    }
    generateNumericRandomOtp(otpLength) {
        let len = 0;
        let otp = [];
        while (len < otpLength) {
            let val = Math.floor(Math.random() * 10);
            otp.push(val.toString());
            len++;
        }
        return otp.join("");
    }
    generateAlphanumericRandomOtp(otpLength) {
        const alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let len = 0;
        let otp = [];
        while (len < otpLength) {
            let val = alphaString[Math.floor(Math.random() * 10)];
            otp.push(val.toString());
            len++;
        }
        return otp.join("");
    }
    async generateOtp(dto) {
        try {
            const date = new Date();
            const expirationDate = date.setSeconds(date.getSeconds() + parseInt(dto.expirationDuration, 10));
            if (dto.otpType === "Numerical") {
                const otp = this.generateNumericRandomOtp(parseInt(dto.otpLength, 10));
                const data = Object.assign({}, dto);
                data.otp = otp;
                data.expirationDate = expirationDate;
                await this.otpRepository.generateOtp(data);
                await this.sendEmail('briankyole10@gmail.com', "Brian", `Please use ${otp} as your OTP`, `OTP ${otp}`);
                return {
                    status: true,
                    message: "Otp sent successfully",
                };
            }
            else if (dto.otpType === "Alphanumeric") {
                const otp = this.generateAlphanumericRandomOtp(parseInt(dto.otpLength, 10));
                const data = Object.assign({}, dto);
                data.otp = otp;
                data.expirationDate = expirationDate;
                await this.otpRepository.generateOtp(data);
                await this.sendEmail('briankyole10@gmail.com', "Brian", `Please use ${otp} as your OTP`, `OTP ${otp}`);
                return {
                    status: true,
                    message: "Otp sent successfully",
                };
            }
            else {
                throw new Error("An error occured");
            }
        }
        catch (e) {
            logger.log(e);
            throw new Error(e);
        }
    }
    async validateOtp(dto) {
        try {
            const response = await this.otpRepository.validateOtpKey(dto);
            if (response === null || response === void 0 ? void 0 : response.used) {
                throw new Error("Otp already used");
            }
            if ((response.otp !== dto.otp) && (response.otpKey !== dto.otpKey)) {
                throw new Error("Otp Invalid");
            }
            if (response.expirationDate > new Date()) {
                await this.otpRepository.updateOtp(dto.otp);
                return {
                    status: true,
                    message: "Otp is valid"
                };
            }
            throw new Error("Otp Expired");
        }
        catch (e) {
            logger.log(e);
            throw new Error(e);
        }
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_repository_1.OtpRepository, config_1.ConfigService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map