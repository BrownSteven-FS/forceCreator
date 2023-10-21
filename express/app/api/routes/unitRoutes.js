const express = require("express");
const authenticateJWT = require("../../middleware/authenticateJWT");
const {
  getUnits,
  createUnit,
  getUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unitController");

const unitRouter = express.Router();

unitRouter.get("/", authenticateJWT, getUnits);

unitRouter.post("/", authenticateJWT, createUnit);

unitRouter.get("/:id", authenticateJWT, getUnit);

unitRouter.patch("/:id", authenticateJWT, updateUnit);

unitRouter.delete("/:id", authenticateJWT, deleteUnit);

module.exports = unitRouter;
