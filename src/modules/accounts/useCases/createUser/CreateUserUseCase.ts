import { inject, injectable } from "tsyringe";
import { ICreatedUserDTO } from "../../dtos/ICreaterUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { hash } from 'bcryptjs'



@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usesRepository: IUsersRepository
  ) { }
  async execute({ driver_license, email, name, password }: ICreatedUserDTO): Promise<void> {

    const userAlreadyExists = await this.usesRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const passwordHash = await hash(password, 8)
    await this.usesRepository.create({
      driver_license, email, name, password: passwordHash
    })
  }
}


export { CreateUserUseCase }