import { app } from "@shared/infra/http/app"
import request from "supertest"
import { v4 as uuidV4 } from "uuid";


import createConnection from "@shared/infra/typeorm"

import {Connection} from "typeorm"
import { hash } from "bcryptjs";

let connection: Connection;

describe("Create category controller", () => {
  
  beforeAll(async () =>{
    const connection = await createConnection("localhost")

    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin",8);
    
    await connection.query(
      `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license)
      values('${id}','admin','admin@rentx.com.br','${password}',true,'now()','XXXXXX')
      `
      );
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close(); 

  });

  it("should be able to create a new category", async () => {

    const responseToken = await request(app).post("/sessions").send({
      email:"admin@rentx.com.br",
      password:"admin"
    })

    const {token} = responseToken.body;


  const response = await request(app)
  .post("/categories")
  .send({
    name: "Category SuperTest",
    description: "Category SuperTest Description"
  }).set({
    Authorization: `Bearer ${token}`
  })

  expect(response.status).toBe(201)
  })


})

