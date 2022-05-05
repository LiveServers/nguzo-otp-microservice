import { Model } from "mongoose";
import { OtpDocument } from '../model/otp.model';
declare type OtpUnion = "Numerical" | "Alphanumeric";
declare type OtpType = {
    otpKey: string;
    otp: string;
    otpLength: string;
    used: boolean;
    otpType: OtpUnion;
    expirationDuration: string;
    creationDate: Date;
    expirationDate: Date;
    _id: string;
};
export declare class OtpRepository {
    private otpModel;
    constructor(otpModel: Model<OtpDocument>);
    generateOtp(dto: any): Promise<OtpType | null>;
    validateOtpKey(dto: any): Promise<any>;
    updateOtp(otp: any): Promise<OtpType | null>;
}
export {};
