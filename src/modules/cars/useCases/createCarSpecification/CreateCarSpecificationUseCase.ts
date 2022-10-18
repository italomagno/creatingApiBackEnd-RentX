import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
  car_id: string;
  specification_id: string[];
  
}
//@injectable()
class CreateCarSpecificationUseCase {

  constructor(
    //@inject("CarsRepository")
    private carsRepository: CarsRepositoryInMemory
  ){}

  async execute({car_id,specification_id}:IRequest): Promise<void> {


    const carsExists = this.carsRepository.findById(car_id)

    if(!carsExists){
      throw new AppError("Car does not exists")
    }


  }

}

export {CreateCarSpecificationUseCase}