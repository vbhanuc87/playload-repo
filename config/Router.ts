import * as express from "express";
import * as jwt from "express-jwt";
import { anyCheck, anyCheckTwo } from "../app/middlewares/Meta.middleware";
import { JWTRoute } from "../app/routes/Jwt.route";
import { MetaRoute } from "../app/routes/Meta.route";
import { config } from "../config";

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

export const ROUTER: IROUTER[] = [{
    handler: JWTRoute,
    middleware: [],
    path: "/JWT",
}, {
    handler: MetaRoute,
    middleware: [
        jwt({secret: config.SECRET}),
    ],
    path: "/meta",
}, {
    handler: MetaRoute,
    middleware: [anyCheck, anyCheckTwo],
    path: "/",
}];
