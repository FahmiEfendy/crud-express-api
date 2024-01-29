const Router = require("express").Router();

const MovieHelper = require("../helpers/movieHelper");

const movieList = async (req, res) => {
  try {
    const response = await MovieHelper.getMovieList();

    return res
      .status(200)
      .send({ message: "Successfully Get All Movie", data: response });
  } catch (err) {
    console.log(err.message, "<<< getMovieList Error");
  }
};

const movieListById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await MovieHelper.getMovieListById(id);

    return res.status(200).send({
      message: `Successfully Get Movie with id of ${id}`,
      data: response,
    });
  } catch (err) {
    console.log(err.message, "<<< getMovieListById Error");
  }
};

const createMovie = async (req, res) => {
  try {
    const response = await MovieHelper.createMovie(req.body);

    return res.status(201).send({
      message: "Successfuly Created New Data!",
      data: response,
    });
  } catch (err) {
    console.log(err.message, "<<< createMovie Error");
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await MovieHelper.deleteMovie(id);

    return res.status(200).send({
      message: "Successfully Deleted a Data!",
      data: response,
    });
  } catch (err) {
    console.log(err.message, "<<< deleteMovie Error");
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await MovieHelper.updateMovie(id, req.body);

    return res.status(200).send({
      message: "Successfully Update a Data!",
      data: response,
    });
  } catch (err) {
    console.log(err.message, "<<< updateMovie Error");
  }
};

Router.get("/", movieList);
Router.get("/:id", movieListById);
Router.post("/", createMovie);
Router.delete("/:id", deleteMovie);
Router.patch("/:id", updateMovie);

module.exports = Router;
