import { envVarsTypes } from "../types";
require("dotenv").config({silent: true});

export const envVars: envVarsTypes = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.ENV || "production",
    SECRET_KEY: process.env.SECRET_KEY || "",
    COOKIE_NAME: process.env.COOKIE_NAME || "data",
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY || 3600 * 1000,

    development: {

    },

    production: {

    }
}