require('dotenv').config();

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  postgres: process.env.DATABASE_URL,
  appUrl: process.env.APP_URL,
  hostUrl: process.env.HOST_URL,
  env: process.env.NODE_ENV,
  fine: process.env.FINE_AMOUNT,
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    lifeTime: process.env.JWT_LIFE_TIME,
    refreshTokenLifeTime: process.env.JWT_REFRESH_TOKEN_LIFE_TIME,
  },
};

module.exports = config;
