const db = require("../models");
const Actor = db.actor;
const moment = require("moment");
const findAll = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.send(actors);
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occured when retrieving actors",
    });
  }
};

const create = async (req, res) => {
    try {
      //validate request
      if (!req.body.name) {
        res.status(400).send({
          message: "The name of the actor is required",
        });
        return;
      }
      //check if the actor exists
      const isExist = await Actor.findOne({ where: { name: req.body.name } });
      if (isExist) {
        res.status(409).send({
          message: `${req.body.name} Exists!`,
        });
        return;
      }
      const actor = {
        name: req.body.name,
        sex: req.body.sex,
        dob: moment(req.body.dob, "YYYY-MM-DD").toDate(),
        bio: req.body.bio,
      }
  
      //create actor
      const newActor = await Actor.create(actor);
      res.send(newActor);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured when creating actor",
      });
    }
  };

  module.exports={
      findAll,
      create
  }