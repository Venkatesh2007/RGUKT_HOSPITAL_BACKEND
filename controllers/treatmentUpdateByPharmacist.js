const { Medicines, Treatments } = require("../models");
const { sendPrescriptionToStudent } = require("./otpCenter");

const treatmentUpdateByPharmacist = async (req, res) => {
  try {
    const { userId } = req;
    const { treatmentId } = req.params;
    const { medicinesWritten } = req.body;

    for (let item of medicinesWritten) {
      let remainingQuantity = item.quantity;
      const currentDate = new Date();

      const medicines = await Medicines.find({
        name: item.name.toLowerCase(),
        expiryDate: { $gte: currentDate },
      }).sort({ expiryDate: 1 });

      for (let med of medicines) {
        if (remainingQuantity <= 0) break;

        if (med.quantity >= remainingQuantity) {
          await Medicines.updateOne(
            { _id: med._id },
            { $inc: { quantity: -remainingQuantity } }
          );
          remainingQuantity = 0;
        } else {
          remainingQuantity -= med.quantity;
          await Medicines.updateOne(
            { _id: med._id },
            { $set: { quantity: 0 } }
          );
        }
      }
    }
    const treatmentData = await Treatments.findByIdAndUpdate(
      treatmentId,
      { $set: { status: "TREATED", medicineIssuedBy: userId } },
      { new: true }
    );

    await sendPrescriptionToStudent(treatmentData);

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = treatmentUpdateByPharmacist;
