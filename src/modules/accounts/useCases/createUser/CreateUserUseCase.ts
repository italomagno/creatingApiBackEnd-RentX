import { AppError } from "@shared/errors/AppError";
import { ICreatedUserDTO } from "@modules/accounts/dtos/ICreaterUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import "reflect-metadata"

import { inject, injectable } from "tsyringe";





@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ driver_license, email, name, password }: ICreatedUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }
    const passwordHash = await hash(password, 8)
    await this.usersRepository.create({
      driver_license, email, name, password: passwordHash
    })
  }
}


export { CreateUserUseCase }