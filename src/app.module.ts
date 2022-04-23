import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI), OtpModule],
})
export class AppModule {}
