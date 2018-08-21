import { createConnection } from "typeorm";
import { Meta } from "../app/models/Meta.model";
import { config, DIALECT } from "../config";

let conn = null;
if (DIALECT === "sqlite") {
    conn = createConnection({
        database: config.DATABASE.DB,
        entities: [
            Meta,
        ],
        logging: true,
        synchronize: true,
        type: DIALECT,
    });
} else {

    conn = createConnection({
        database: config.DATABASE.DB,
        entities: [
            Meta,
        ],
        host: config.DATABASE.SERVER,
        logging: false,
        password: config.DATABASE.PASSWORD,
        port: config.DATABASE.PORT_DB,
        synchronize: true,
        type: DIALECT,
        username: config.DATABASE.USER_DB
    });
}

export const Connection = conn;
