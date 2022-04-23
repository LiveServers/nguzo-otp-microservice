import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import {Model} from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { OtpDocument, Otp } from '../model/otp.model';

type OtpUnion = "Numerical" | "Alphanumeric";

type OtpType = {
  otpKey:string;
  otp:string;
  otpLength:string;
  used:boolean;
  otpType:OtpUnion;
  expirationDuration:string;
  creationDate:Date;
  expirationDate:Date;
  _id:string;
}

@Injectable()
export class OtpRepository {
  constructor(@InjectModel(Otp.name) private otpModel:Model<OtpDocument>) {}

  async generateOtp(dto):Promise<OtpType | null>{
    return this.otpModel.create(dto);
  }

  async validateOtpKey(dto):Promise<any>{
    return this.otpModel.findOne({otp:dto.otp},'otp used otpKey expirationDate').exec();
  }

  async updateOtp(otp):Promise<OtpType | null>{
    return this.otpModel.findOneAndUpdate({otp},{used:true},{new:true}).exec();
  }
}