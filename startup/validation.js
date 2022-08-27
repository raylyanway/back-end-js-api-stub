import Joi from "joi";
import joiObjectid from "joi-objectid";

export const validation = () => {
  Joi.objectId = joiObjectid(Joi);
};
