import { Router } from "express";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";
import {SpecificationsRepository} from "../modules/cars/repositories/SpecificationsRepository"

const specificationsRoutes = Router();

const specificationRepository = new SpecificationsRepository()


specificationsRoutes.post("/",(request,response)=>{
  const {name,description} = request.body;
  const createSpecificationService = new CreateSpecificationService(specificationRepository);

  createSpecificationService.execute({name,description});

  return response.status(201).send()

})
export {specificationsRoutes}