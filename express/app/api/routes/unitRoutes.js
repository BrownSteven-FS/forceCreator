const express = require("express");
const {
  getUnits,
  createUnit,
  getUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unitController");

const unitRouter = express.Router();

unitRouter.get("/", getUnits);

unitRouter.post("/", createUnit);

unitRouter.get("/:id", getUnit);

unitRouter.patch("/:id", updateUnit);

unitRouter.delete("/:id", deleteUnit);

module.exports = unitRouter;
