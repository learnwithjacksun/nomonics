import process from "process";

const env = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_EMAIL: process.env.APP_EMAIL,
  APP_PASSWORD: process.env.APP_PASSWORD,
  FRONTEND_URL: process.env.FRONTEND_URL,
  PDF_API_KEY: process.env.PDF_API_KEY,
  PDF_API_URL: process.env.PDF_API_URL,
};

export default env;
