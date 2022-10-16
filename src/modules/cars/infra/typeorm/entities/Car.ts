import { v4 as uuidV4 } from "uuid";


class Car{
  id: string
  
  name: string
  
  description: string
  
  daily_rate: number
  
  license_plate: string
  
  fine_amount: number
  
  available: boolean
  
  brand: string
  
  category_id: string
}

export {Car}