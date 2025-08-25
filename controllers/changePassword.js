const { Pharmacist, Doctor, Admin, Nurse } = require("../models");
const { hashPassword, verifyPassword } = require("./passwordHashing");

const changePassword = (Model) => async (req, res) => {
  try {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;
    const user = await Model.findOne({ userId });

    // Verify the old password
    const isMatch = await verifyPassword(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect Password" });

    // Hash the new password and update it in the database
    const hashedPassword = await hashPassword(newPassword);
    await Model.updateOne(
      { userId },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.status(200).json({ messag: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePharmacistPassword = changePassword(Pharmacist);
const changeDoctorPassword = changePassword(Doctor);
const changeAdminPassword = changePassword(Admin);
const changeNursePassword = changePassword(Nurse);

module.exports = {
  changePharmacistPassword,
  changeDoctorPassword,
  changeAdminPassword,
  changeNursePassword,
};
