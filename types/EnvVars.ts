export interface envVarsTypes {
    PORT: number | string,
    ENV: string,
    SECRET_KEY: string,
    COOKIE_NAME: string,
    TOKEN_EXPIRY: number | string,
    development: any,
    production: any
}