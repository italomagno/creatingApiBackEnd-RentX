import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoiresController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request,response);
});

categoriesRoutes.get("/", (request, response) => {
 return listCategoiresController.handle(request,response)
});

export { categoriesRoutes };
