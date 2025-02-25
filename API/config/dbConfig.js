import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    }
};

console.log(config);

export default config;