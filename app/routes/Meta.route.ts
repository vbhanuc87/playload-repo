import * as express from "express";
import { MetaController } from "../controllers/Meta.controller";
import * as MetaMiddleware from "../middlewares/Meta.middleware";

export const MetaRoute: express.Router = express.Router()
    .get("/", MetaController.All)
    .get("/:id", MetaController.Find)
    .post("/", [MetaMiddleware.CheckCreate], MetaController.Create)
    .put("/", [MetaMiddleware.CheckUpdate], MetaController.Update)
    .delete("/", [MetaMiddleware.CheckDelete], MetaController.Delete);
