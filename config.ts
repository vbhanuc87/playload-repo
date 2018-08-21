import { env } from "process";

export const DIALECT = "sqlite";

const LOCAL_CONFIGURATION = {
	DB: "./playload.meta.sqlite",
	PASSWORD: "",
	PORT_DB: 3306,
	SERVER: "127.0.0.1",
	USER_DB: "root",
};

const PRODUCTION_CONFIGURATION = {
	DB: env.DB || "prod",
	PASSWORD: env.PASSWORD || "",
	PORT_DB: Number(env.PORT_DB) || 3306,
	SERVER: env.SERVER || "localhost",
	USER_DB: env.USER_DB || "root",
};

export const config = {
	DATABASE: env.NODE_ENV === "PRODUCTION" ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION,
	PORT_APP: 9999,
	SECRET: "P@ssw0rd",
};
