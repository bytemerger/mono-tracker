// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_VALIDATION_PERIOD: process.env.TOKEN_VALIDATION_PERIOD,
    ENV: process.env.ENV,
    DB_URI: process.env.DB_URI || '',
    MONO_SEC_KEY: process.env.MONO_SEC_KEY,
};

export default config;
