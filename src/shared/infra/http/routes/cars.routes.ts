import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express"
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import uploadConfig from "../../../../config/upload";

import multer from "multer";


export const carsRoutes = Router();


const upload = multer(uploadConfig.upload("./tmp/cars"));

let createCarController = new CreateCarController()

let listAvailableCarsController = new ListAvailableCarsController();

let createCarsSpecificationsController = new CreateCarSpecificationController();

let uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)


carsRoutes.get("/available", listAvailableCarsController.handle)


carsRoutes.post("/specifications/:id",

  ensureAuthenticated,
  ensureAdmin,
  createCarsSpecificationsController.handle)


  carsRoutes.post("/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle)