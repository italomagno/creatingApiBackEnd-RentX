

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsInMemory } from "@modules/cars/repositories/in-memory/SpecificationsInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

let specificationsInMemory: SpecificationsInMemory


describe("Create car specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsInMemory = new SpecificationsInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory,specificationsInMemory);
  });
  it("should not be able to add a new specification to a non existent car", async () => {
    const car_id = "1234"
    const specification_id = ["54321"]
   
    await expect( createCarSpecificationUseCase.execute({ car_id, specification_id })
    ).rejects.toEqual(new AppError("Car does not exists"))
  })

  it("should be able to add a specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "uuid",
      daily_rate: 100,
      description: "Description Car", fine_amount: 60,
      license_plate: "ABC-1235",
      name: "Name Car1"
    });

    const specification = await  specificationsInMemory.create({
      name: "test",
      description: "test"
    })

    const specification_id = [specification.id]

   const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specification_id });

   expect(specificationsCars).toHaveProperty("specifications")
   expect(specificationsCars
    .specifications.length).toBe(1);
  });

 

})