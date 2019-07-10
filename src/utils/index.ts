import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import * as Settings from "../settings";
import * as Hapi from "@hapi/hapi";

export const handleFileUpload = (file: any) => {
    return new Promise((resolve, reject) => {
        const filename = file.hapi.filename;
        const data = file._data;

        fs.writeFile("./uploads/" + filename, data, err => {
            if (err) {
                reject(err);
            }
            return true;
        });
    });
}

export const generateToken = (user: any) => {
    return jwt.sign(user, Settings.envVars.SECRET_KEY, {
        expiresIn: Settings.envVars.TOKEN_EXPIRY as number / 1000
    });
}

export async function renewToken(req: any, h: Hapi.ResponseToolkit) {
    const { response, auth } = req;
    if (auth.renew) {
        let token = generateToken(response.source.dataValues);
        const headers = response.isBoom ? response.output.headers : response.headers;
			headers['Authenticate'] = JSON.stringify(token);
    }
    return h.continue;
}