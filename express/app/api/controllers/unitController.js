const Unit = require("../models/unitModel");

const getUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    const unitObjects = units.map((unit) => unit.toObject());
    res.json({ units: unitObjects });
  } catch (error) {
    console.error("Failed to fetch units:", error);
    res.status(500).json({ message: "Failed to fetch units" });
  }
};

const getUnit = async (req, res) => {
  const id = req.params.id;
  try {
    const unit = await Unit.findById(id);

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    const unitObject = unit.toObject();

    res.json({ unit: unitObject });
  } catch (error) {
    console.error("Failed to fetch unit:", error);
    res.status(500).json({ message: "Failed to fetch unit" });
  }
};

const updateUnit = async (req, res) => {
  const unitId = req.params.id;

  try {
    const unit = await Unit.findById(unitId);

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }
    const { type, name, parent, uic, echelon, unit_class, template, symbol } =
      req.body;

    // Check for any potential conflicts

    const existingUnit = await Unit.findOne({
      $and: [{ $or: [{ name }, { uic }] }, { _id: { $ne: unitId } }],
    });
    if (existingUnit) {
      if (existingUnit.uic === uic)
        return res
          .status(500)
          .json({ message: "Unit already exists with this UIC!" });
      else
        return res
          .status(500)
          .json({ message: "Unit already exists with this name!" });
    }

    Object.assign(unit, {
      type,
      name,
      parent,
      uic,
      echelon,
      unit_class,
      template,
      symbol,
    });

    await unit.save();
    const unitObject = unit.toObject();
    res
      .status(200)
      .json({ unit: unitObject, message: "Unit updated successfully!" });
  } catch (error) {
    console.error("Failed to update unit:", error);
    const message = error.message || "Failed to update unit.";
    res.status(500).json({ message });
  }
};

const createUnit = async (req, res) => {
  try {
    const { type, name, parent, uic, echelon, unit_class, template, symbol } =
      req.body;

    // Check if the unit already exists
    const existingUnit = await Unit.findOne({ $or: [{ name }, { uic }] });
    if (existingUnit) {
      return res.status(500).json({ message: "Unit already exists" });
    }

    const unit = new Unit({
      type,
      name,
      parent,
      uic,
      echelon,
      unit_class,
      template,
      symbol,
    });

    // Save the unit to the database
    await unit.save();
    const unitObject = unit.toObject();

    const message = { message: "Unit created successfully" };
    res.status(200).json({ unitObject, message });
  } catch (error) {
    console.error("Failed to create unit:", error);
    res.status(500).json({ message: "Failed to create unit", error });
  }
};

const deleteUnit = async (req, res) => {
  {
    try {
      const { id } = req.params;
      // Check if the unit already exists
      const existingUnit = await Unit.findOne({ _id: id });
      if (!existingUnit) {
        return res.status(500).json({ message: "Unit doesn't exists" });
      }

      await Unit.deleteOne({ _id: id });

      const units = await Unit.find();
      const unitObjects = units.map((unit) => unit.toObject());

      res
        .status(200)
        .json({ message: "Unit deleted successfully", units: unitObjects });
    } catch (error) {
      console.error("Failed to delete unit:", error);
      res.status(500).json({ message: "Failed to delete unit" });
    }
  }
};

module.exports = {
  getUnits,
  getUnit,
  updateUnit,
  createUnit,
  deleteUnit,
};
