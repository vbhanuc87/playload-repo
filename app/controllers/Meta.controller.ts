import * as express from "express";
import { Meta } from "../models/Meta.model";
import { MetaService } from "../services/Meta.service";

export class MetaController {

    public static async All(req: express.Request, res: express.Response) {
        const MetaList = await MetaService.Find();
        return res.send(MetaList);
    }

    public static async Find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const meta = await MetaService.FindOneById(id);
        return meta ? res.status(200).send(meta) : res.status(404).send({text: "NOT FOUND"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const text: string = req.body.text;
        const meta = new Meta();
        meta.text = text;
        meta.email = "someone@somewhere.com";

        try {
            const Result = await MetaService.Save(meta);
            return res.status(200).send(Result);
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

    public static async Update(req: express.Request, res: express.Response) {

        const meta = new Meta();
        meta.id = req.body.id;
        meta.text = req.body.text;
        meta.email = req.body.email;

        try {
            const Result = await MetaService.Save(meta);
            return Result ? res.status(200).send() : res.status(404).send({text: "NOT FOUND"});
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }

    }

    public static async Delete(req: express.Request, res: express.Response) {
        const id: number = req.body.id;

        try {
            await MetaService.RemoveById(id);
            return res.status(204).send();
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

}
