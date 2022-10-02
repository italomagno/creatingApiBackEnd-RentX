import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoiresController } from "../modules/cars/useCases/listCategories";

const upload = multer({
  dest: "./tmp"
})

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request,response);
});

categoriesRoutes.get("/", (request, response) => {
 return listCategoiresController.handle(request,response)
});

categoriesRoutes.post("/import", upload.single("file"), (request,response)=>{
  return importCategoryController.handle(request,response)
})

export { categoriesRoutes };
