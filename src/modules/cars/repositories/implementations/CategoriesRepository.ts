import { Category } from "../../entities/Category";
import { ICreateCategoryDTO } from "../ICategoriesRepository";

import {getRepository, Repository} from "typeorm"


class CategoriesRepository {
  private repository: Repository<Category>
 // private categories: Category[];

 // private static INSTANCE : CategoriesRepository;


 constructor()
{
  this.repository = getRepository(Category)
}




  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
  const category = this.repository.create({
    name,
    description,
  })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories
  }

  async findByName(name:string): Promise<Category>{
    // select * from categories where name = "name"
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository };
