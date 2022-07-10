import { BookStatus } from './book-status.enum';

export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public description: string,
    public imageUrl: string,
    public status: BookStatus
  ) {
  }
}
