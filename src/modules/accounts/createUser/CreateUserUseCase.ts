import { inject, injectable } from "tsyringe";
import { ICreatedUserDTO } from "../dtos/ICreaterUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";



@injectable()
class CreateUserUseCase{

  constructor(
    @inject("UsersRepository")
    private usesRepository: IUsersRepository
  ){}
  async execute({driver_license,email,name,password,username}:ICreatedUserDTO): Promise<void>{
    await this.usesRepository.create({driver_license,email,name,password,username
    })
  }
}


export {CreateUserUseCase}