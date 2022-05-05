import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { MessagePattern, Payload  } from '@nestjs/microservices';
import { OtpService } from '../service/otp.service';

type OtpType = "Numerical" | "Alphanumeric";

type Otp = {
  otpKey:string;
  otpLength:string;
  otpType:OtpType;
  expirationDuration:string;
}

type Validate = {
  otpKey:string;
  otp: string
}

@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @HttpCode(200)
  @Post("/api/v1/generate-otp")
  generateOtp(@Body() dto:Otp):any{
    return this.otpService.generateOtp(dto);
  }

  @HttpCode(200)
  @Post("/api/v1/validate-otp")
  validateOtp(@Body() dto:Validate):any{
    return this.otpService.validateOtp(dto);
  }


  @MessagePattern('generate-otp')
  generateOtpEvent(@Payload() data: string): any {
    return this.otpService.generateOtp(data);
  }

  @MessagePattern('validate-otp')
  validateOtpEvent(@Payload() data: string): any {
    return this.otpService.validateOtp(data);
  }

}