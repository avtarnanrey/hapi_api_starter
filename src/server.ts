import * as Hapi from "@hapi/hapi";
const Inert = require("@hapi/inert");
import * as Settings from "./settings";
import { IRequest } from "./types";
const UserHandler = require("./routes/route/Users");
import * as JWTAuth from "hapi-auth-jwt2";
import { renewToken } from "./utils";

const server = new Hapi.Server({
    host: "localhost",
    port: Settings.envVars.PORT,
    routes: {
        cors: true
    }
});

const validate = async function (decoded: any, request: any) {
    const { auth } = request;

    if (!decoded.id) {
        return { isValid: false };
    }
    else {
        const tokenExpiration = decoded.exp * 1000;
        // const timeLeft =  Math.floor(((tokenExpiration - 60000) - new Date().getTime()) / 60000 ); // <-- two min setup
        const timeLeft =  Math.floor(((tokenExpiration - (24 * 60 * 60 * 1000)) - new Date().getTime()) / (24 * 60 * 60 * 1000) ); // (Expiration Date - 1 Day) - Current Time in Milliseconds / 1 day

        if (timeLeft <= 1) {
            auth.renew = true;
        }

        return { isValid: true };
    }
};

const init = async () => {

    // Register Hapi Auth JWT2
    await server.register(JWTAuth);

    server.auth.strategy("jwt", "jwt", {
        key: Settings.envVars.SECRET_KEY,
        validate: validate,
        verifyOptions: {
            algorithms: ["HS256"]
        }
    });

    server.auth.default("jwt");

    server.ext("onPreResponse", renewToken);

    await server.register(UserHandler,
        {
            routes: {
                prefix: "/users"
            }
        }
    )

    // Register Static File Serving Router
    await server.register(Inert);

    server.route({
        method: "GET",
        path: "/{file*}",
        handler: {
            directory: {
                path: "uploads"
            }
        }
    });

    // Init server.state()
    server.state(Settings.envVars.COOKIE_NAME, {
        ttl: Settings.envVars.TOKEN_EXPIRY as number || 1440,
        encoding: "base64json",
        isSecure: Settings.envVars.ENV === "production"
    })

    // 404 Handling
    server.route({
        method: "*",
        path: "/{any*}",
        handler: (req: IRequest, h: Hapi.ResponseToolkit) => {
            return {
                error: "404 Error! Page Not Found!"
            };
        }
    })

    await server.start();

    return server;
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init().then(server => {
    console.log(`Server running on %s`, server.info.uri);
})
    .catch(err => {
        console.log(err);
    })