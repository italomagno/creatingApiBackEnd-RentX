
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create car specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  });
  it("should not be able to add a new specification to a non existent car", async () => {
    expect(async () => {
      const car_id = "1234"
      const specification_id = ["54321"]
      await createCarSpecificationUseCase.execute({ car_id, specification_id });

    }).rejects.toBeInstanceOf(AppError)
  });

  it("should be able to add a specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "uuid",
      daily_rate: 100,
      description: "Description Car", fine_amount: 60,
      license_plate: "ABC-1235",
      name: "Name Car1"
    });

    const specification_id = ["54321"]

    await createCarSpecificationUseCase.execute({ car_id: car.id, specification_id });

  });

})