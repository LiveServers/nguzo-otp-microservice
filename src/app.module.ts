import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule,ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { OtpModule } from './otp/otp.module';
import configuration from './config';

@Module({
  imports: [ 
  ConfigModule.forRoot({
    load: [configuration],
    validationSchema: Joi.object({
      QUEUE_NAME: Joi.string().required(),
      SERVER_PORT: Joi.string().required(),
      PORT: Joi.number().required(),
      SERVER_PORT_TCP: Joi.string().required(),
      MONGODB_CONNECTION_URI: Joi.string().required(),
      MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
      MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
      MONGO_CONTAINER_NAME: Joi.string().required(),
      MONGO_CONNECTION_PORT: Joi.number().required(),
      MONGO_DATABASE: Joi.string().required(),
      ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      ACCESS_TOKEN_SECRET: Joi.string().required(),
      SECRET: Joi.string().required(),
      REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      REFRESH_TOKEN_SECRET: Joi.string().required(),
      NODE_ENV: Joi.string().required(),
      ENCRYPTION_KEY: Joi.string().required(),
      INITIALIZATION_VECTOR: Joi.string().required(),
      AWS_ACCESS_KEY_ID: Joi.string().required(),
      AWS_SECRET_KEY: Joi.string().required(),
      AWS_REGION: Joi.string().required(),
      API_VERSION: Joi.string().required(),
      AWS_EMAIL_SOURCE: Joi.string().required(),
    }),
    isGlobal: true,
    cache: true,
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: 'mongodb://root:password@mongo:27017/admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
  }),
  OtpModule,
],
})
export class AppModule {}
// uri: `mongodb://${config.get('MONGO_INITDB_ROOT_USERNAME')}:${config.get('MONGO_INITDB_ROOT_PASSWORD')}@${config.get('MONGO_CONTAINER_NAME')}:${config.get('MONGO_CONNECTION_PORT')}/${config.get('MONGO_DATABASE')}`,