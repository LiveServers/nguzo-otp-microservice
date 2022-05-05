import { ConfigService } from '@nestjs/config';
import { OtpRepository } from '../repository/otp.repository';
export declare class OtpService {
    private otpRepository;
    private readonly configService;
    constructor(otpRepository: OtpRepository, configService: ConfigService);
    sendEmail(recepientEmail: string, name: string, message: string, subject: string): Promise<any>;
    generateNumericRandomOtp(otpLength: number): string;
    generateAlphanumericRandomOtp(otpLength: number): string;
    generateOtp(dto: any): Promise<{
        status: boolean;
        message: string;
    }>;
    validateOtp(dto: any): Promise<{
        status: boolean;
        message: string;
    }>;
}
