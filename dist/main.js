"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const logger = new common_1.Logger();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const microserviceTCP = app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: "127.0.0.1",
            port: parseInt(configService.get("SERVER_PORT_TCP"), 10),
        },
    });
    const url = configService.get("SERVER_PORT");
    const port = configService.get("PORT");
    const microserviceRMQ = await app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [url],
            queue: configService.get("QUEUE_NAME"),
            queueOptions: {
                durable: false,
            },
        },
    });
    aws_sdk_1.config.update({
        accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: configService.get("AWS_SECRET_KEY"),
        region: configService.get("AWS_REGION"),
        apiVersion: configService.get("API_VERSION"),
    });
    await app.startAllMicroservices();
    await app.listen(port, '0.0.0.0');
    logger.log(`Auth service running on http:localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map