const { Medicines, Treatments, Others } = require("../models");

const getChartsData = async (req, res) => {
  try {
    const medicinesImportedChartsData = await getMedicinesImportedChartsData();
    const patientsChartsData = await getPatientsChartsData();
    const medicinesConsumedChartsData = await getMedicinesConsumedChartsData();
    const patientDistributionData = await getPatientDistributionData();

    res.status(200).json({
      medicinesImportedChartsData,
      patientsChartsData,
      medicinesConsumedChartsData,
      patientDistributionData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientDistributionData = async () => {
  const distributionData = {
    Students: 0,
    Staff: 0,
  };

  const studentsCount = await Treatments.countDocuments();
  const staffCount = await Others.countDocuments();
  distributionData.Students = studentsCount;
  distributionData.Staff = staffCount;

  const pieData = {
    labels: Object.keys(distributionData),
    datasets: [
      {
        label: "Patient Distribution",
        data: Object.values(distributionData),
        backgroundColor: ["rgba(75, 192, 192, 1)", "orange"],
      },
    ],
  };
  return pieData;
};

const getMedicinesConsumedChartsData = async () => {
  const treatments = await Treatments.find();
  const monthlyMedicines = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  treatments.forEach((treatment) => {
    const month = new Date(treatment.treatmentDate).toLocaleString("default", {
      month: "long",
    });
    if (monthlyMedicines[month] !== undefined) {
      monthlyMedicines[month] += treatment.medicinesWritten.length;
    }
  });

  const barData = {
    labels: Object.keys(monthlyMedicines),
    datasets: [
      {
        label: "Medicines Consumed",
        data: Object.values(monthlyMedicines),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  return barData;
};

const getMedicinesImportedChartsData = async (req, res) => {
  try {
    const medicines = await Medicines.find();
    const barData = processMedicineData(medicines);
    return barData;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientsChartsData = async (req, res) => {
  try {
    const treatments = await Treatments.find();
    const barData = processTreatmentData(treatments);
    return barData;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processTreatmentData = (treatments) => {
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthData = Array(12).fill(0);

  treatments.forEach((treatment) => {
    const month = new Date(treatment.treatmentDate).getMonth();
    monthData[month] += 1;
  });

  const barData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Patient Admissions",
        data: monthData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return barData;
};

const processMedicineData = async (medicines) => {
  try {
    const monthLabels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthData = Array(12).fill(0); // Initialize array for 12 months

    medicines.forEach((medicine) => {
      const month = new Date(medicine.importDate).getMonth();
      monthData[month] += medicine.quantity; // Sum up the quantity for each month
    });

    const barData = {
      labels: monthLabels,
      datasets: [
        {
          label: "Medicines Imported",
          data: monthData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    return barData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

module.exports = { getChartsData };
