import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { compare } from "bcryptjs"
import { AppError } from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {


    //usuario existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new AppError("Email or password incorrect");

    const passwordMatch = await compare(password, user.password);


    // senha está correta
    if (!passwordMatch)
      throw new AppError("Email or password incorrect");


    // gerar o jsonweb token
    const token = sign({
    }, "019acc25a4e242bb55ad489832ada12d", {
      subject: user.id,
      expiresIn: "1D"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn


  }

}

export { AuthenticateUserUseCase }