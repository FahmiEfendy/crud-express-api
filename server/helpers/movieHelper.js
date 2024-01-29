const fs = require("fs");
const util = require("util");

const moviesPath = `${__dirname}/../../assets/movies.json`;

const readFileAsync = util.promisify(fs.readFile);

const getMovieList = async () => {
  try {
    const movieData = await readFileAsync(moviesPath, "utf-8");

    return JSON.parse(movieData);
  } catch (err) {
    console.log(err.message, "<<< geMovieList Error");
  }
};

const getMovieListById = async (id) => {
  try {
    const movieData = await readFileAsync(moviesPath, "utf-8");
    const parsedMovieData = JSON.parse(movieData);

    const movieDataById = parsedMovieData.find(
      (data) => String(data.id) === id
    );

    return movieDataById;
  } catch (err) {
    console.log(err.message, "<<< getMovieListById Error");
  }
};

module.exports = {
  getMovieList,
  getMovieListById,
};
