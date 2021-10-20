const db = require("../models");
const uploadFile = require("../middleware/upload");
const Movie = db.movie;
const Actor = db.actor;
const findById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id,{include: {
        model: Actor,
        as: "actors",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },});
    res.send(movie);
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occured when retrieving movies",
    });
  }
};
const findAll = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: {
        model: Actor,
        as: "actors",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    res.send(movies);
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occured when retrieving movies",
    });
  }
};
const create = async (req, res) => {
  try {
    await uploadFile(req, res);
    //validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "The name of the movie is required",
      });
      return;
    }
    //check if the movie exists
    const isExist = await Movie.findOne({ where: { name: req.body.name } });
    if (isExist) {
      res.status(409).send({
        message: `${req.body.name} Exists!`,
      });
      return;
    }
    const movie = {
      name: req.body.name,
      year_of_release: req.body.year_of_release,
      plot: req.body.plot,
      poster: req.file.originalname,
    };

    //create movie
    const newMovie = await Movie.create(movie);
    res.send(newMovie);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured when creating movie",
    });
  }
};
const update = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (!req.body.name) {
      res.status(400).send({
        message: "The name of the movie is required",
      });
      return;
    }
    const movie = {
      name: req.body.name,
      year_of_release: req.body.year_of_release,
      plot: req.body.plot,
    };
    if(req.file){
        movie.poster=req.file.originalname;
    }
    //check if the movie exists
    console.log(movie);
    const updated = await Movie.update(movie, { where: { id: req.params.id } });
    if (updated == 1) {
      res.send({
        message: "updated successfully.",
      });
    } else {
      res.status(404).send({
        message: `Nothing Changed.`,
      });
      return;
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured when updating movie",
    });
  }
};
const deleteById = async (req, res) => {
  const id = req.params.id;
  const deleted = await Movie.destroy({
    where: { id: id },
  });
  if (deleted == 1) {
    res.send({
      message: "deleted successfully.",
    });
  } else {
    res.status(404).send({
      message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`,
    });
    return;
  }
};
module.exports = {
  findById,
  findAll,
  create,
  update,
  deleteById
};
