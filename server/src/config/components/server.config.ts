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
    NODE_ENV: joi.string()
      .valid("development", "production", "test")
      .default("development"),
      // .required(),
    PORT: joi.number()
      .default(3000),
      // .required(),
    API_VERSION: joi.string()
      .default("v1"),
    LOGGER_LEVEL: joi.string()
      .valid("error", "warn", "info", "verbose", "debug", "silly")
      .default("info"),
    LOGGER_ENABLED: joi.boolean()
      .truthy("TRUE")
      .truthy("true")
      .falsy("FALSE")
      .falsy("false")
      .default(true),
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

const serverConfig = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === "test",
  isDevelopment: envVars.NODE_ENV === "development",
  isProduction: envVars.NODE_ENV === "production",
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED,
  },
  server: {
    port: envVars.PORT,
    apiVersion: envVars.API_VERSION,
  },
};

export { serverConfig };
