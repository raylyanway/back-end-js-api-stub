import { Genre } from "./genre";

export interface Movie {
  title: string;
  genre?: Genre;
  numberInStock: number;
  dailyRentalRate: number;
}
