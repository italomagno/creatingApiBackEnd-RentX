import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMmory: RentalsRepositoryInMemory

describe("Create Rental", () => {

  
  beforeEach(() => {
    rentalsRepositoryInMmory = new RentalsRepositoryInMemory()
   createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMmory);
  })


  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12121212",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })
  it("should not be able to create a new rental if there is another open to the same user ", async () => {
     expect(async ()=>{
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12121212",
        expected_return_date: new Date(),
      });
      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12121212",
        expected_return_date: new Date(),
      });
     }).rejects.toBeInstanceOf(AppError)
  })
  it("should not be able to create a new rental if there is another open to the same car ", async () => {
    expect(async ()=>{
     await createRentalUseCase.execute({
       user_id: "123",
       car_id: "12121212",
       expected_return_date: new Date(),
     });
     const rental = await createRentalUseCase.execute({
       user_id: "321",
       car_id: "12121212",
       expected_return_date: new Date(),
     });
    }).rejects.toBeInstanceOf(AppError)

 })
}
)