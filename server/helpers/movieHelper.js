const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const MovieValidation = require("../helpers/validationHelper");

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

    return [movieDataById];
  } catch (err) {
    console.log(err.message, "<<< getMovieListById Error");
  }
};

const createMovie = async (objectData) => {
  MovieValidation.createMovieValidation(objectData);

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
    return err.message;
  }
};

const deleteMovie = async (id) => {
  try {
    const movieData = await readFileAsync(moviesPath, "utf-8");
    const parsedMovieData = JSON.parse(movieData);

    const notDeletedMovie = parsedMovieData.filter(
      (data) => String(data.id) !== id
    );

    const deletedMovie = parsedMovieData.find((data) => String(data.id) === id);

    await writeFileAsync(moviesPath, JSON.stringify(notDeletedMovie));

    return deletedMovie;
  } catch (err) {
    console.log(err.message, "<<< deleteMovie Error");
  }
};

const updateMovie = async (id, objectData) => {
  MovieValidation.updateMovieValidation(objectData);

  const { title, director, genre, releaseDate, cast } = objectData;

  try {
    const movieData = await readFileAsync(moviesPath, "utf-8");
    const parsedMovieData = JSON.parse(movieData);

    const newMovieData = parsedMovieData.map((data) => {
      if (String(data.id) === id) {
        newData = {
          id,
          title: title || data.title,
          director: director || data.director,
          genre: genre || data.genre,
          releaseDate: releaseDate || data.releaseDate,
          cast: cast || data.cast,
        };
        return newData;
      }
      return data;
    });

    const updatedMovie = newMovieData.find((data) => String(data.id) === id);

    await writeFileAsync(moviesPath, JSON.stringify(newMovieData));

    return updatedMovie;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getMovieList,
  getMovieListById,
  createMovie,
  deleteMovie,
  updateMovie,
};
