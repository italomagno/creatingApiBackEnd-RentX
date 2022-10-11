import { ICreatedUserDTO } from "../dtos/ICreaterUserDTO"
import { User } from "../entities/User"



interface IUsersRepository{
    create(data: ICreatedUserDTO):Promise<void>
    findByEmail(email: string): Promise<User>
}


export {IUsersRepository}