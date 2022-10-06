import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoiresController = new ListCategoriesController(listCategoriesUseCase);


export { listCategoiresController }
