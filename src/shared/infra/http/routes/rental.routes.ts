import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";
import { DevolutionRentalControler } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalControler";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router()


const createRentalControler = new CreateRentalController();
const devolutionRentalControler = new DevolutionRentalControler()

const listRentalsByUserController = new ListRentalsByUserController()


rentalsRoutes.post("/",
  ensureAuthenticated,
  createRentalControler.handle
)
rentalsRoutes.post("/devolution/:id", ensureAuthenticated,devolutionRentalControler.handle)

rentalsRoutes.get("/user",
ensureAuthenticated,listRentalsByUserController.handle)


export { rentalsRoutes }