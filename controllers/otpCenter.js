const { Doctor, Admin, Nurse, Pharmacist, Students } = require("../models");
const nodemailer = require("nodemailer");
const { hashPassword } = require("./passwordHashing");
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nithinambati9@gmail.com",
    pass: "nshv cokv qdpw pdzi",
  },
});

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOtp = async (req, res) => {
  const { userId } = req.query;

  try {
    let user;
    if (userId.startsWith("A")) user = await Admin.findOne({ userId });
    else if (userId.startsWith("D")) user = await Doctor.findOne({ userId });
    else if (userId.startsWith("N")) user = await Nurse.findOne({ userId });
    else if (userId.startsWith("P"))
      user = await Pharmacist.findOne({ userId });

    if (!user || !user.email) {
      return res
        .status(404)
        .json({ message: "User not found or email not available" });
    }

    const otp = generateOtp();
    otpStore.set(userId, otp);

    const mailOptions = {
      from: "nithinambati9@gmail.com",
      to: user.email,
      subject: "RGUKT Health Center password reset",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const storedOtp = otpStore.get(userId);

  if (storedOtp === otp) {
    otpStore.delete(userId);
    const hashedPassword = await hashPassword("rgukt123");
    if (userId.startsWith("A"))
      await Admin.updateOne({
        userId,
        $set: {
          password: hashedPassword,
        },
      });
    else if (userId.startsWith("D"))
      await Doctor.updateOne({
        userId,
        $set: {
          password: hashedPassword,
        },
      });
    else if (userId.startsWith("N"))
      await Nurse.updateOne({
        userId,
        $set: {
          password: hashedPassword,
        },
      });
    else if (userId.startsWith("P"))
      await Pharmacist.updateOne({
        userId,
        $set: {
          password: hashedPassword,
        },
      });
    res.status(200).json({ message: "OTP Verified.." });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

const sendPrescriptionToStudent = async (treatmentData) => {
  try {
    const {
      studentId,
      nursingStationBy,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      medicinesWritten,
      advice,
      description,
      reason,
      medicineIssuedBy,
      labTest,
      treatedBy,
    } = treatmentData;

    const user = await Students.findOne({ studentId });

    const mailOptions = {
      from: "nithinambati9@gmail.com",
      to: user.email,
      subject: "Your visit to Hospital on ${treatmentDate}",
      text: `
        Temerature: ${temperature}
        Blood Pressure: ${bloodPressure}
        Pulse Rate: ${pulseRate}
        Weight: ${weight}
        Medicines Written: ${medicinesWritten.join(", ")}
        Advice: ${advice}
        Description: ${description}
        Reason: ${reason}
        Medicine Issued By: ${medicineIssuedBy}
        Lab Test: ${labTest}
        Treated By: ${treatedBy}
        Nurse: ${nursingStationBy}
        
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getOtp,
  verifyOtp,
  sendPrescriptionToStudent,
};
