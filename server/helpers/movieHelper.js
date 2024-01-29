const fs = require("fs");
const util = require("util");

const moviesPath = `${__dirname}/../../assets/movies.json`;

const readFileAsync = util.promisify(fs.readFile);

const getMovieList = async () => {
  try {
    const movieData = await readFileAsync(moviesPath, "utf-8");
    const parsedMovieData = JSON.parse(movieData);

    return parsedMovieData;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getMovieList,
};
