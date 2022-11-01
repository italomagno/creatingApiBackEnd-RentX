
import {Request,Response} from 'express';

class RefreshTokenControler{

  async handle(request: Request, response:Response): Promise<Response>{


    
    return response.status(200)
  }

}

export {RefreshTokenControler}