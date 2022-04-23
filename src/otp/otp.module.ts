import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OtpSchema, Otp } from './model/otp.model';
import { OtpService } from './service/otp.service';
import { OtpController } from './controller/otp.controller';
import { OtpRepository } from './repository/otp.repository';

dotenv.config();

@Module({
    imports: [MongooseModule.forFeature([{
        name:Otp.name,
        schema:OtpSchema
    }]),
    // ClientsModule.register([{
    //   name: "AUTH_CLIENT",
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: [`${process.env.SERVER_PORT}`],
    //     queue: process.env.QUEUE_NAME,
    //     queueOptions: {
    //       durable: false
    //     }
    //   },
    // }])
],
    controllers: [OtpController],
    providers: [OtpService,OtpRepository],
})
export class OtpModule {}
