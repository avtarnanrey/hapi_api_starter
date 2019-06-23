require("dotenv").config({silent: true});

export const envVars = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.ENV || "production",
    SECRET_KEY: process.env.SECRET_KEY || "",

    development: {

    },

    production: {

    }
}