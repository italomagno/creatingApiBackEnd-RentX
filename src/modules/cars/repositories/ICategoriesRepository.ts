// DTO => Data transfer object

import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository{
  findByName(name:string): Promise<Category>;
  list(): Category[];
  create({name,description}:ICreateCategoryDTO):Promise<void>;
};


export {ICategoriesRepository,ICreateCategoryDTO}