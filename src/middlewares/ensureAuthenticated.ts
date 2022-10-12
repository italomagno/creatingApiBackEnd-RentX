import { NextFunction, Request ,Response} from "express";

import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(request:Request,response:Response,next:NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader) throw new AppError("Token missing",401);

  // ele vem como o seguinte: Baerer e o token PASIJAipshavGSGHãjh
  const [,token] = authHeader.split(" ");


    try{
  const {sub: user_id} = verify(token, "019acc25a4e242bb55ad489832ada12d") as IPayload
      const usersRepository = new UsersRepository();
      const user = usersRepository.findById(user_id)
         
      if(!user) throw new AppError("User not found",401);

      request.user = {
        id: user_id
      }

      next()


    }catch(err){
      throw new AppError("Invalid token",401);
    }

}