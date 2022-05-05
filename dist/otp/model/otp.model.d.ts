/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from "mongoose";
declare type OtpType = "Numerical" | "Alphanumeric";
export declare class Otp {
    otpKey: string;
    otp: string;
    otpLength: string;
    used: boolean;
    otpType: OtpType;
    expirationDuration: string;
    creationDate: Date;
    expirationDate: Date;
}
export declare const OtpSchema: import("mongoose").Schema<Document<Otp, any, any>, import("mongoose").Model<Document<Otp, any, any>, any, any, any>, {}, {}>;
export declare type OtpDocument = Otp & Document;
export {};
