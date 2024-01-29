const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const moviesPath = `${__dirname}/../../assets/movies.json`;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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

const createMovie = async (objectData) => {
  const { title, director, genre, releaseDate, cast } = objectData;

  try {
    const formattedBody = {
      id: uuidv4(),
      title,
      director,
      genre,
      releaseDate,
      cast,
    };

    const movieData = await getMovieList();
    const combinedData = [...movieData, formattedBody];

    await writeFileAsync(moviesPath, JSON.stringify(combinedData));

    return formattedBody;
  } catch (err) {
    console.log(err.message, "<<< createMovie Error");
  }
};

module.exports = {
  getMovieList,
  getMovieListById,
  createMovie,
};
