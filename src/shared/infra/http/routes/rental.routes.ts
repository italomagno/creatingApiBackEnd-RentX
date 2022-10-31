import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";
import { DevolutionRentalControler } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalControler";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router()


const createRentalControler = new CreateRentalController();
const devolutionRentalControler = new DevolutionRentalControler()


rentalsRoutes.post("/",
  ensureAuthenticated,
  createRentalControler.handle
)
rentalsRoutes.post("/devolution/:id", ensureAuthenticated,devolutionRentalControler.handle)


export { rentalsRoutes }