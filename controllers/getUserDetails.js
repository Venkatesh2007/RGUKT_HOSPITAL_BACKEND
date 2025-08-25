const { Doctor, Admin, Nurse, Pharmacist } = require("../models");

const getUserDetails = (Model) => async (req, res) => {
  try {
    const userDetails = await Model.find();
    res.status(200).json({ userDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorDetails = getUserDetails(Doctor);
const getAdminDetails = getUserDetails(Admin);
const getNurseDetails = getUserDetails(Nurse);
const getPharmacistDetails = getUserDetails(Pharmacist);

module.exports = {
  getDoctorDetails,
  getAdminDetails,
  getNurseDetails,
  getPharmacistDetails,
};
