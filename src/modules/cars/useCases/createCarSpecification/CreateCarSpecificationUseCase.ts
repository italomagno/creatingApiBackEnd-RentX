
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

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
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationRepository
  ){}

  async execute({car_id,specification_id}:IRequest): Promise<void> {


    const carsExists = await this.carsRepository.findById(car_id)

    if(!carsExists){
      throw new AppError("Car does not exists")
    }

    const specificatons = await this.specificationRepository.findByIds(specification_id)

   carsExists.specifications = specificatons;

   await this.carsRepository.create(carsExists)

   console.log(carsExists)


  }

}

export {CreateCarSpecificationUseCase}