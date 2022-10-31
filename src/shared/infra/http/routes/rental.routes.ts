import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router()


const createRentalControler = new CreateRentalController();


rentalsRoutes.post("/",
  ensureAuthenticated,
  createRentalControler.handle
)


export { rentalsRoutes }