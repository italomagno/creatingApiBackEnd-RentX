import "reflect-metadata"
import { ICreatedUserDTO } from "../dtos/ICreaterUserDTO"
import { User } from "../infra/typeorm/entities/User"



interface IUsersRepository {
    create(data: ICreatedUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}


export { IUsersRepository }