import {config, SES} from 'aws-sdk';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import SES_CONFIG from '../../config/aws';

const logger = new Logger();
dotenv.config();
config.update(SES_CONFIG);

const AWS_SES = new SES();

async function sendEmail(recepientEmail:string, name:string, message:string, subject:string):Promise<any>{
    try{
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
    }catch(e){
        logger.log(e);
        throw new Error(e);
    }
}
export default sendEmail;