import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create Car", ()=>{
  
  beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })


  it("should be able to create a car", async ()=>{
    await createCarUseCase.execute({
      brand: "Brand",
     category_id: "uuid",
      daily_rate: 100,
       description: "Description Car", fine_amount: 60,
        license_plate: "ABC-1234",
         name:"Name Car" 
    });
  })
})