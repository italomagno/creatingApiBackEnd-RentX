import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { AppError } from "@shared/errors/AppError";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../repositories/IRentalsRepository";


dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRepository
  ) { }

  async execute({
    car_id,
    user_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHour = 24
    /*
      [x] Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo carro. */
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is not available")
    }
    // [x] Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo usuário.

    const rentalOpenTouser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenTouser) {
      throw new AppError("Has other rental processing")
    }
    //[] O aluguel deve ter duração mínima de 24 horas.
    const expectedReturnDateFormat = dayjs(expected_return_date)
    .utc()
    .local()
    .format()
    const dateNow = dayjs()
    .utc()
    .local()
    .format()
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow,"hours")

    if(compare < minimumHour) throw new AppError("Invalid return time!")

    const rental = await this.rentalsRepository.create(
      {user_id,
      car_id,
      expected_return_date}
    )

    return rental
  }
}

export { CreateRentalUseCase }