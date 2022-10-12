import { NextFunction, Request ,Response} from "express";

import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(request:Request,response:Response,next:NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader) throw new Error("Token missing");

  // ele vem como o seguinte: Baerer e o token PASIJAipshavGSGHãjh
  const [,token] = authHeader.split(" ");


    try{
  const {sub: user_id} = verify(token, "019acc25a4e242bb55ad489832ada12d") as IPayload
      const usersRepository = new UsersRepository();
      const user = usersRepository.findById(user_id)
         
      if(!user) throw new Error("User not found");

      next()

      
    }catch(err){
      throw new Error("Invalid token");
    }

}