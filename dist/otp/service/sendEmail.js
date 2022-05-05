"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const aws_1 = require("../../config/aws");
const logger = new common_1.Logger();
dotenv.config();
aws_sdk_1.config.update(aws_1.default);
const AWS_SES = new aws_sdk_1.SES();
async function sendEmail(recepientEmail, name, message, subject) {
    try {
        const params = {
            Source: process.env.AWS_EMAIL_SOURCE,
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
    }
    catch (e) {
        logger.log(e);
        throw new Error(e);
    }
}
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map