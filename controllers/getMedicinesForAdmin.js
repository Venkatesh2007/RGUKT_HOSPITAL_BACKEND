const { Medicines } = require("../models");

const getMedicinesForAdmin = async (req, res) => {
  try {
    const data = await Medicines.find();
    res.send({ medicinesData: data });
  } catch (error) {
    res.status(500).json({ message: error.messag });
  }
};

module.exports = getMedicinesForAdmin;
