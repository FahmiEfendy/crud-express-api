const Router = require("express").Router();

const MovieHelper = require("../helpers/movieHelper");

const movieList = async (req, res) => {
  try {
    const response = await MovieHelper.getMovieList();

    return res.send(response);
  } catch (err) {
    console.log(err.message, "<<< getMovieList Error");
  }
};

const movieListById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await MovieHelper.getMovieListById(id);

    return res.send(response);
  } catch (err) {
    console.log(err.message, "<<< getMovieListById Error");
  }
};

const createMovie = async (req, res) => {
  try {
    const response = await MovieHelper.createMovie(req.body);

    return res.send(response);
  } catch (err) {
    console.log(err.message, "<<< createMovie Error");
  }
};

Router.get("/", movieList);
Router.get("/:id", movieListById);
Router.post("/", createMovie);

module.exports = Router;
