import "reflect-metadata"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"



let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create Car", ()=>{

  beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })


  it("should be able to create a car", async ()=>{
    const car = await createCarUseCase.execute({
      brand: "Brand",
     category_id: "uuid",
      daily_rate: 100,
       description: "Description Car", fine_amount: 60,
        license_plate: "ABC-1234",
         name:"Name Car" 
    });
    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with same license plate", async ()=>{
    await createCarUseCase.execute({
      brand: "Brand",
     category_id: "uuid",
      daily_rate: 100,
       description: "Description Car", fine_amount: 60,
        license_plate: "ABC-1235",
         name:"Name Car1" 
    });
    await expect(createCarUseCase.execute({
        brand: "Brand",
       category_id: "uuid",
        daily_rate: 100,
         description: "Description Car", fine_amount: 60,
          license_plate: "ABC-1235",
           name:"Name Car2" 
      })
    ).rejects.toEqual(new AppError("Car already Exists!"))
  })

  it("should be able to create with available true by default", async ()=>{

    const car = await createCarUseCase.execute({
      brand: "Brand",
     category_id: "uuid",
      daily_rate: 100,
       description: "Description Car", fine_amount: 60,
        license_plate: "ABC-1244",
         name:"Name Car Available" 
    });
    expect(car.available).toBe(true);
  })
})