import "dotenv/config"
import type { StringValue } from "ms"

import env from "env-var"

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    DATABASE_USERNAME: env.get("DATABASE_USERNAME").required().asString(),
    DATABASE_PASSWORD: env.get("DATABASE_PASSWORD").required().asString(),
    DATABASE_HOST: env.get("DATABASE_HOST").required().asString(),
    DATABASE_PORT: env.get("DATABASE_PORT").required().asPortNumber(),
    DATABASE_NAME: env.get("DATABASE_NAME").required().asString(),
    JWT_KEY: env.get("JWT_KEY").required().asString(),
    JWT_EXIRES_IN: env.get("JWT_EXPIRES_IN").required().asString() as StringValue,
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
    WEBSERVICE_URL: env.get("WEBSERVICE_URL").required().asString(),
    SEND_EMAIL: env.get("SEND_EMAIL").required().asBool(),
}