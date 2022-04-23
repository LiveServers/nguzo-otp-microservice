import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Ctx  } from '@nestjs/microservices';
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


  @EventPattern('generate-otp')
  replaceEmoji(@Payload() data: string): any {
    return this.otpService.generateOtp(data);
  }

}