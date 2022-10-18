import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository{
  
  private repository: Repository<Car>;

  constructor(
  ){
    this.repository = getRepository(Car)
  }
 
  

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car =  this.repository.create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    })
    await this.repository.save(car)
    return car;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({license_plate: licensePlate})
    return car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder("c")
    .where("available = :available", {available: true});
    if(brand){
      carsQuery.andWhere("c.brand = :brand", {brand: brand});
    }
    if(category_id){
      carsQuery.andWhere("c.category_id = :category_id", {category_id: category_id});
    }
    if(name){
      carsQuery.andWhere("c.name = :name", {name: name});
    }

   const cars =  await carsQuery.getMany();

   return cars;  

  }

  findById(id: string): Promise<Car> {
    throw new Error("Method not implemented.");
  }
}

export {CarsRepository}