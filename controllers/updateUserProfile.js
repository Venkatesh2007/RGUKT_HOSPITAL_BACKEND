const { Pharmacist, Doctor, Admin, Nurse } = require("../models");

const getUserData = (Model) => async (req, res) => {
  try {
    const { userId } = req;
    const { username, email, contactNumber } = req.body;
    await Model.updateOne(
      { userId },
      {
        $set: {
          username,
          email,
          contactNumber,
        },
      }
    );
    res.status(200).json({ message: "Succesuly Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePharmacistProfile = getUserData(Pharmacist);
const updateDoctorProfile = getUserData(Doctor);
const updateAdminProfile = getUserData(Admin);
const updateNurseProfile = getUserData(Nurse);

module.exports = {
  updatePharmacistProfile,
  updateDoctorProfile,
  updateAdminProfile,
  updateNurseProfile,
};
