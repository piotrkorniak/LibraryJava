import { BookResponse } from './book-response';
import { RenteeResponse } from './rentee-response';

export interface RentalResponse {
  id: string;
  status: string;
  startDate: Date;
  endDate: Date;
  book: BookResponse;
  rentee: RenteeResponse;
}
