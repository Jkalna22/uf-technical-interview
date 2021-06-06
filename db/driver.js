const client = require("./client");

const createDriverCrashEventData = async ({
  reportNumber,
  vehicleNumber,
  personNumber,
  injurySeverity,
  sex,
  age,
  restraintSystems,
}) => {
  try {
    const {
      rows: [driver],
    } = await client.query(
      `
            INSERT INTO driver("report_number", "vehicle_number", "person_number",
            "injury_severity", "sex", "age", "restraint_systems")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `,
      [
        reportNumber,
        vehicleNumber,
        personNumber,
        injurySeverity,
        sex,
        age,
        restraintSystems,
      ]
    );

    return driver;
  } catch (error) {
    throw error;
  }
};

const getDriverDataByReportNumber = async (reportNumber) => {
  try {
    const { rows: driverData } = await client.query(
      `
              SELECT * 
              FROM driver
              WHERE "report_number" = $1;
          `,
      [reportNumber]
    );

    return driverData;
  } catch (error) {
    throw error;
  }
};

const getAllDriverData = async () => {
  try {
    const { rows: driverData } = await client.query(`
              SELECT * 
              FROM driver
          `);

    return driverData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDriverCrashEventData,
  getDriverDataByReportNumber,
  getAllDriverData,
};
