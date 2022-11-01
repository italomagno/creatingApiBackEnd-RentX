import "reflect-metadata"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreatedUserDTO } from "../../dtos/ICreaterUserDTO";
import { AppError } from "@shared/errors/AppError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user: ICreatedUserDTO = {
      driver_license: "Apache License 2.0",
      email: "user@example.com",
      name: "user",
      password: "password",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token");

  })

  it("Should not be able to authenticate an noexistent user", async () => {
   await expect(authenticateUserUseCase.execute({
        email: "false@example.com",
        password: "12user.password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
  it("Should not be able to authenticate an invalid password",async () => {
    const user: ICreatedUserDTO = {
      driver_license: '9999',
      email: "usetestr@example.com",
      name: "usertest",
      password: "passwordtest"
    }
    await createUserUseCase.execute(user);
   await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPasswordsTest",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})