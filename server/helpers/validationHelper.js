const Joi = require("joi");
const Boom = require("boom");

const createMovieValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().description("Movie title, i.e. Inception"),
    director: Joi.string()
      .required()
      .description("Movie director, i.e. Christopher Nolan"),
    genre: Joi.string().required().description("Sci-Fi"),
    releaseDate: Joi.string()
      .required()
      .description("Movie release date, i.e. 2010-07-16"),
    cast: Joi.array()
      .required()
      .description(
        "Movie cast, i.e. [Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page]"
      ),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateMovieValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().optional().description("Movie title, i.e. Inception"),
    director: Joi.string()
      .optional()
      .description("Movie director, i.e. Christopher Nolan"),
    genre: Joi.string().optional().description("Sci-Fi"),
    releaseDate: Joi.string()
      .optional()
      .description("Movie release date, i.e. 2010-07-16"),
    cast: Joi.array()
      .optionalal()
      .description(
        "Movie cast, i.e. [Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page]"
      ),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  createMovieValidation,
  updateMovieValidation,
};
