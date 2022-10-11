import { getRepository, Repository } from "typeorm"
import { ICreatedUserDTO } from "../../dtos/ICreaterUserDTO"
import { User } from "../../entities/User"
import { IUsersRepository } from "../IUsersRepository"




class UsersRepository implements IUsersRepository {

  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
     name, 
      driver_license,
       email, 
       password
    }: ICreatedUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      driver_license,
      email,
       password
    });

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
      const user= await this.repository.findOne({ email})
      return user
  }



}


export { UsersRepository }