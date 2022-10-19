import { app } from "@shared/infra/http/app"
import request from "supertest"


describe("Create category controller", async () => {
  

  it("test", async () => {
  await request(app)
  .get("/cars/available")
  .expect(200)
  })


})