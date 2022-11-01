import { ICreaterUserTokenDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";



class UsersTokensRepository implements IUsersTokensRepository{

  private repository: Repository<UserTokens>;

  constructor(){
    this.repository = getRepository(UserTokens)
  }

  async create({ expired_date, refresh_token, user_id }: ICreaterUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
     expired_date,
     refresh_token,
     user_id
    })

    await this.repository.save(userToken)
    return userToken
  }

}


export {UsersTokensRepository}