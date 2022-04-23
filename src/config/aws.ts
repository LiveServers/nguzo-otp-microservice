import * as dotenv from 'dotenv';

dotenv.config();

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.API_VERSION,
};

export default SES_CONFIG;