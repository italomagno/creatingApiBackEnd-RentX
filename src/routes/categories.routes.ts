import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoiresController } from "../modules/cars/useCases/listCategories";

const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController();
const categoriesRoutes = Router();

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", (request, response) => {
 return listCategoiresController.handle(request,response)
});

categoriesRoutes.post("/import", upload.single("file"), (request,response)=>{
  return importCategoryController.handle(request,response)
})

export { categoriesRoutes };
