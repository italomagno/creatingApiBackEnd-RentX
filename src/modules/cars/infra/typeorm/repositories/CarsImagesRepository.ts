import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";



class CarsImagesRepository implements ICarsImagesRepository{
  private respository: Repository<CarImage>


  constructor(){
    this.respository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.respository.create({
      car_id,
      image_name
    })

    await this.respository.save(carImage);

    return carImage;

  }

}

export {CarsImagesRepository}