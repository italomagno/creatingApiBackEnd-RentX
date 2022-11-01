import { ICreaterUserTokenDTO } from "../dtos/ICreateUserDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens"



interface IUsersTokensRepository{


  create({expires_date,refresh_token,user_id}:ICreaterUserTokenDTO):Promise<UserTokens>

  findByUserIdAndRefreshToken(user_id:string,refresh_token):Promise<UserTokens>

  deleteById(id:string):Promise<void>
}

export {IUsersTokensRepository}