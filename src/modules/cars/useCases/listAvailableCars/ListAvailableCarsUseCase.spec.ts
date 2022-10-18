import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"



let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Avalabe Cars', ()=>{

   beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

    it('Should be able to list all available cars', async () => {
     const car  = await carsRepositoryInMemory.create({
          brand :"Brand",
          category_id:  "075f158f-01b7-474f-8037-aeb043471c7c",
          daily_rate: 110,
          description: "Car_description",
          fine_amount: 40,
          license_plate: "ABC-1254",
          name: "Car1"
        }
      )
     
      const cars = await listCarsUseCase.execute({
      });
      expect(cars).toEqual([car])
    })

    it("Should be able to list all avalable cars by brand", async () => {
      const car  = await carsRepositoryInMemory.create({
        brand :"Car_brand_test",
        category_id:  "075f158f-01b7-474f-8037-aeb043471c7c",
        daily_rate: 110,
        description: "Car_description",
        fine_amount: 40,
        license_plate: "ABC-1254",
        name: "Car2"
      }
    )
   
    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car])
    })

    it("Should be able to list all avalable cars by name", async () => {
      const car  = await carsRepositoryInMemory.create({
        brand :"Car_brand_test",
        category_id:  "075f158f-01b7-474f-8037-aeb043471c7c",
        daily_rate: 110,
        description: "Car_description",
        fine_amount: 40,
        license_plate: "ABC-1254",
        name: "Car3"
      }
    )
   
    const cars = await listCarsUseCase.execute({
      name: "Car3"
    });
    expect(cars).toEqual([car])
    })
    it("Should be able to list all avalable cars by category", async () => {
      const car  = await carsRepositoryInMemory.create({
        brand :"Car_brand_test",
        category_id:  "categoryTd_test",
        daily_rate: 110,
        description: "Car_description",
        fine_amount: 40,
        license_plate: "ABC-1254",
        name: "Car3"
      }
    )
   
    const cars = await listCarsUseCase.execute({
      category_id: "categoryTd_test"
    });
    expect(cars).toEqual([car])
    })
})