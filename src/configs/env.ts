import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,

  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY as string,
  REDIS_URL: process.env.REDIS_URL as string,
};
