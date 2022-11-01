import { ICreaterUserTokenDTO } from "../dtos/ICreateUserDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens"



interface IUsersTokensRepository{


  create({expires_date,refresh_token,user_id}:ICreaterUserTokenDTO):Promise<UserTokens>
}

export {IUsersTokensRepository}