import { ICreatedUserDTO } from "../dtos/ICreaterUserDTO"



interface IUsersRepository{
    create(data: ICreatedUserDTO):Promise<void>
}


export {IUsersRepository}