import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

type OtpType = "Numerical" | "Alphanumeric";

@Schema()
export class Otp {
   @Prop({required:true, index:true})
    otpKey:string;

   @Prop({required:true, index: true})
    otp:string;

   @Prop({required:true})
    otpLength:string;

   @Prop({required:true, default:false})
    used:boolean;

   @Prop({required:true})
    otpType:OtpType;

   @Prop({required: true})
    expirationDuration:string;

   @Prop({required:true, default:Date})
    creationDate:Date;

   @Prop({required: true})
    expirationDate:Date;

}

export const OtpSchema = SchemaFactory.createForClass(Otp);

export type OtpDocument = Otp & Document;