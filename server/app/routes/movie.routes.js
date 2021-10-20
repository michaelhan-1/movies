const express = require("express");
const router = express.Router();
const controller = require("../controllers/movie.controller");

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.create);
router.post("/:id", controller.update);
router.delete("/:id", controller.deleteById);


module.exports=router