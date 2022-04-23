import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { OtpRepository } from '../repository/otp.repository';
import sendEmail from './sendEmail';

const logger = new Logger();

@Injectable()
export class OtpService {
//   constructor(
//     @Inject('user-microservice') private readonly UserMicroservice: ClientProxy
//   ) {}
    constructor(private otpRepository:OtpRepository){}

    generateNumericRandomOtp(otpLength:number){
        let len = 0;
        let otp = [];
        while(len<otpLength){
            let val = Math.floor(Math.random()*10);
            otp.push(val.toString());
            len++;
        }
        return otp.join("");
    }

    generateAlphanumericRandomOtp(otpLength:number){
        const alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let len = 0;
        let otp = [];
        while(len<otpLength){
            let val = alphaString[Math.floor(Math.random()*10)];
            otp.push(val.toString());
            len++;
        }
        return otp.join("");
    }

    async generateOtp(dto){
        try{
            // we create expiration date
            const date = new Date();
            const expirationDate = date.setSeconds(date.getSeconds()+parseInt(dto.expirationDuration,10));
            if(dto.otpType === "Numerical"){
                const otp = this.generateNumericRandomOtp(parseInt(dto.otpLength,10));
                const data = {...dto};
                data.otp = otp;
                data.expirationDate = expirationDate;
                await this.otpRepository.generateOtp(data);
                await sendEmail('briankyole10@gmail.com',"Brian",`Please use ${otp} as your OTP`,`OTP ${otp}`);
                return {
                    status: true,
                    message: "Otp sent successfully",
                };
            }else if(dto.otpType === "Alphanumeric"){
                const otp = this.generateAlphanumericRandomOtp(parseInt(dto.otpLength,10));
                const data = {...dto};
                data.otp = otp;
                data.expirationDate = expirationDate;
                await this.otpRepository.generateOtp(data);
                await sendEmail('briankyole10@gmail.com',"Brian",`Please use ${otp} as your OTP`,`OTP ${otp}`);
                return {
                    status: true,
                    message: "Otp sent successfully",
                };
            }else{
                throw new Error("An error occured");
            }
        }catch(e){
            logger.log(e);
            throw new Error(e);
        }
    }

    async validateOtp(dto){
        try{
            const response = await this.otpRepository.validateOtpKey(dto);
            if(response?.used){
                throw new Error("Otp already used");
            }
            if((response.otp !== dto.otp) && (response.otpKey !== dto.otpKey)){
                throw new Error("Otp Invalid");
            }
            if(response.expirationDate > new Date()){
                await this.otpRepository.updateOtp(dto.otp);
                return {
                    status: true,
                    message: "Otp is valid"
                }
            }
            throw new Error("Otp Expired");
        }catch(e){
            logger.log(e);
            throw new Error(e);
        }
    }

}