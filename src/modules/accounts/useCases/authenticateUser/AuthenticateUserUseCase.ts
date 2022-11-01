import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { compare } from "bcryptjs"
import { AppError } from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


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
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider

  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const {expires_in_token,secret_refresh_token,secret_token,expires_in_refresh_token,expires_refresh_token_days} = auth
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
    },secret_token , {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({email}, secret_refresh_token,{
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date:refresh_token_expires_date,
      refresh_token,
    })

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn


  }

}

export { AuthenticateUserUseCase }