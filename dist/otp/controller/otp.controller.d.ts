import { OtpService } from '../service/otp.service';
declare type OtpType = "Numerical" | "Alphanumeric";
declare type Otp = {
    otpKey: string;
    otpLength: string;
    otpType: OtpType;
    expirationDuration: string;
};
declare type Validate = {
    otpKey: string;
    otp: string;
};
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    generateOtp(dto: Otp): any;
    validateOtp(dto: Validate): any;
    generateOtpEvent(data: string): any;
    validateOtpEvent(data: string): any;
}
export {};
