const Router = require("express").Router();

const MovieHelper = require("../helpers/movieHelper");

const movieList = async (req, res) => {
  try {
    const response = await MovieHelper.getMovieList();

    return res.send(response);
  } catch (err) {
    console.log(err.message, "<<< getMovieList err.message");
  }
};

Router.get("/", movieList);

module.exports = Router;
