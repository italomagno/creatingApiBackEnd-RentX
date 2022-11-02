import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMmory: RentalsRepositoryInMemory
let dayJsProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, "day").toDate();


  beforeEach(() => {
    rentalsRepositoryInMmory = new RentalsRepositoryInMemory()
    dayJsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory()

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMmory,
      dayJsProvider,
      carsRepositoryInMemory);
  })


  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "car test",
      brand:"brand",
      category_id:"1234",
      daily_rate:40,
      fine_amount:100,
      license_plate:"test"
    })
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })
  it("should not be able to create a new rental if there is another open to the same user ", async () => {
    const car = await rentalsRepositoryInMmory.create({
      user_id: "12345",
      car_id: "1212121",
      expected_return_date: dayAdd24Hours,
    })
   
    await expect(
        createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12121212",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Has other rental processing"))
  })
  it("should not be able to create a new rental if there is another open to the same car ", async () => {
    await rentalsRepositoryInMmory.create({
      user_id: "12345",
      car_id: "1212121",
      expected_return_date: dayAdd24Hours,
    })
   await  expect(
       createRentalUseCase.execute({
        user_id: "321",
      car_id: "1212121",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available"))
  })
  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
        user_id: "123",
        car_id: "12121212",
        expected_return_date: dayjs().toDate(),
      })

    ).rejects.toEqual(new AppError("Invalid return time!"))
  })
}
)