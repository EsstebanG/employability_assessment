import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    PORT: Joi.number().required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    JWT_SECRET: Joi.string().min(10).required(),
    JWT_EXPIRES_IN: Joi.string().required(),

    JWT_REFRESH_SECRET: Joi.string().optional(),

    X_API_KEY: Joi.string().min(16).required(),
});
