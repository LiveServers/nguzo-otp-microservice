"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const otp_module_1 = require("./otp/otp.module");
const config_2 = require("./config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [config_2.default],
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
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    uri: 'mongodb://root:password@mongo:27017/admin',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
                inject: [config_1.ConfigService],
            }),
            otp_module_1.OtpModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map