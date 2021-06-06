const client = require("./client");

const createVehicleCrashEventData = async ({reportNumber, vehicleNumber, year, make, model, color, travelingOnStreet, travelingDirection, maneuver}) => {

    try {
        const {
            rows: [vehicleData]
        } = await client.query(`
            INSERT INTO vehicle("report_number", "vehicle_number", "year", "make", "model",
            "color", "traveling_on_street", "traveling_direction", "maneuver")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `,
        [reportNumber, vehicleNumber, year, make, model, color, travelingOnStreet, travelingDirection, maneuver]
        );

        return vehicleData;
    } catch (error) {
        throw error;
    }


}

const getVehicleDataByReportNumber = async (reportNumber) => {
    console.log(reportNumber);
    try {
      const { rows: vehicleData } = await client.query(`
              SELECT * 
              FROM vehicle
              WHERE "report_number" = $1;
          `,
          [reportNumber]
          );
  
      return vehicleData;
  
    } catch (error) {
      throw error;
    }
  };

module.exports = {
    createVehicleCrashEventData,
    getVehicleDataByReportNumber,
}