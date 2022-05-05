import { Injectable, Logger } from '@nestjs/common';
import { SES } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { OtpRepository } from '../repository/otp.repository';

const logger = new Logger();

@Injectable()
export class OtpService {
    constructor(private otpRepository:OtpRepository, private readonly configService:ConfigService){}
    async sendEmail(recepientEmail:string, name:string, message:string, subject:string):Promise<any>{
        try{
            const AWS_SES = new SES({region: this.configService.get("AWS_REGION"),});
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
        }catch(e){
            logger.log(e);
            throw new Error(e);
        }
    }

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
                await this.sendEmail('briankyole10@gmail.com',"Brian",`Please use ${otp} as your OTP`,`OTP ${otp}`);
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
                await this.sendEmail('briankyole10@gmail.com',"Brian",`Please use ${otp} as your OTP`,`OTP ${otp}`);
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