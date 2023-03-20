import Joi from "joi";
import mongoose from "mongoose";

import { Genre as GenreType } from "../types/genre";

export const genreSchema = new mongoose.Schema<GenreType>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

export const Genre = mongoose.model("Genre", genreSchema);

export function validate(genre: GenreType) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    user: Joi.object().required(),
  });

  return schema.validate(genre);
}
