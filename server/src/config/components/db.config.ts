// Libs
import * as joi from "@hapi/joi";
import * as dotenv from "dotenv";

// Config
dotenv.config();

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envVarsSchema = joi
  .object({
    DB_DEV_URL: joi.string(),
    DB_URL: joi.string(),
    DB_USER: joi.string(),
    DB_HOST: joi.string(),
    DB_PASSWORD: joi
      .string()
      .optional()
      .empty(""),
    DB_DATABASE: joi.string(),
    DB_PORT: joi.number(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const {
  error,
  value: envVars,
} = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const dbConfig = {
  dev_url: envVars.DB_DEV_URL,
  url: envVars.DB_URL,
  user: envVars.DB_USER,
  host: envVars.DB_HOST,
  password: envVars.DB_PASSWORD,
  database: envVars.DB_DATABASE,
  port: envVars.DB_PORT,
};

export { dbConfig };
