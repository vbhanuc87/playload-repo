import * as chai from "chai";
import * as express from "express";
import * as supertest from "supertest";
import { Meta } from "../app/models/Meta.model";
import { JWTService } from "../app/services/Jwt.service";
import { MetaService } from "../app/services/Meta.service";
import { Server } from "../config/Server";

let token: string;
let IdRecord: number;
let IdRecordTwo: number;
const server: Server = new Server();
let app: express.Application;

describe("Meta route", () => {

    before((done) => {

        const meta = new Meta();
        meta.text = "SAMPLE TEXT";
        meta.email = "someone@somewhere.com";

        server.Start().then(() => {
            app = server.App();
            Promise.all([
                JWTService.signToken({name: "name", role: "rol"}),
                MetaService.Save(meta),
            ]).then((res) => {
                token = res[0];
                IdRecord = res[1].id;
                done();
            });
        });
    });

    after(async () => {
        const metaOne = await MetaService.FindOneById(IdRecord);
        const metaTwo = await MetaService.FindOneById(IdRecordTwo);
        if (metaOne) {
            await MetaService.Remove(metaOne);
        }
        if (metaTwo) {
            await MetaService.Remove(metaTwo);
        }
    });

    it("Random Url gives 404", (done) => {
        supertest(app).get("/random-url")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

    it("Can list all Metas", (done) => {
        supertest(app).get("/")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("array");
                chai.expect(res.body[0].text).to.be.a("string");
                done();
            });
    });

    it("Can search for Meta by Id", (done) => {
        supertest(app).get(`/${IdRecord}`)
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.text).to.be.a("string");
                done();
            });
    });

    it("Can create a new Meta", (done) => {
        supertest(app).post("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({text: "Meta text 100"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.id).to.be.a("number");
                chai.expect(res.body.text).to.be.a("string");
                IdRecordTwo = res.body.id;
                done();
            });
    });

    it("Can update an existing Meta", (done) => {
        supertest(app).put("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord, text: "Meta text updateado"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                done();
            });
    });

    it("Can remove a meta by Id", (done) => {
        supertest(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(204);
                done();
            });
    });

    it("Reports an error when finding a non-existent Meta by Id", (done) => {
        supertest(app).get(`/9999`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("NOT FOUND");
                done();
            });
    });

    it("Reports an error when trying to create an invalid Meta", (done) => {
        supertest(app).post("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({meta: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("Reports an error when trying to update a Meta with invalid data", (done) => {
        supertest(app).put("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({meta: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("Reports an error when trying to delete a Meta with invalid data", (done) => {
        supertest(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({meta: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

});
