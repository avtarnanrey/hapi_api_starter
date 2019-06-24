// import * as bcrypt from "bcrypt";
import * as Hapi from "hapi";
// import { User } from "../../models/User";
// import * as Settings from "../../settings";
import { IDXLoginRequest } from "../../../types";
import * as xml2js from "xml2js";
// import * as jwt from "jsonwebtoken";

export default class IDXController {

    public async login(req: IDXLoginRequest, h: Hapi.ResponseToolkit) {
        // const userData = {
        //     username: req.payload.username,
        //     password: req.payload.password
        // }
        const parseString = xml2js.parseString;

        let digestRequest = require("request-digest")("efntFF1gxDJwXCgZPSw7RuF6", "OBsVyWYa7DuCxUif0a3thauN");
        digestRequest.requestAsync({
            host: "http://data.crea.ca",
            path: "/Login.svc/Login",
            method: "GET",
            excludePort: true,
            headers: {
                "upgrade-insecure-requests": "1",
                "pragma": " no-cache",
                "accept-language": "en-US,en;q=0.9",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "cache-control": "no-cache"
            }
        })
            .then((response: any) => {
                console.log("IDX Login Response --------->\n\n");

                return parseString(response.body, (err: any, res: any) => {
                        JSON.parse(res);
                        res;
                    });
            })
            .catch((error: any) => {
                console.log("IDX Login Error --------->");
                console.log(error.statusCode);
                console.log(error);
            });

        //  return User.findOne({
        //     where: {
        //         email: req.payload.email
        //     }
        // })
        //     .then((user: any) => {
        //         if (user) {
        //             if (bcrypt.compareSync(req.payload.password, user.password)) {
        //                 let token = jwt.sign(user.dataValues, Settings.envVars.SECRET_KEY, {
        //                     expiresIn: Settings.envVars.TOKEN_EXPIRY
        //                 })
        //                 return h.response({
        //                     message: "Login successful"
        //                 }).state((Settings.envVars.COOKIE_NAME), { token: token });
        //             } else {
        //                 return;
        //             }
        //         } else {
        //             return { error: "User does not exist" };
        //         }
        //     })
        //     .catch(err => {
        //         return { error: err };
        //     })
    }
}