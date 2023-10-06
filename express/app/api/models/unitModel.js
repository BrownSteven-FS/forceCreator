const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["T", "U"],
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: String,
      required: true,
    },
    uic: {
      type: String,
    },
    echelon: {
      type: String,
      required: true,
      enum: ["ARMY", "DIV", "RGT", "CMD", "BDE", "BN", "CO", "PLT"],
    },
    unit_class: {
      type: String,
    },
    template: {
      type: String,
    },
    symbol: {
      type: String,
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        const id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
        return {
          id,
          ...ret,
        };
      },
    },
  }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
