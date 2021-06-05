const client = require("./client");

const createCrashEvent = async ({
  reportNumber,
  crashDate,
  crashTime,
  county,
  city,
  investigatingAgency,
  onStreet,
  offsetFeet,
  offsetDirection,
  fromIntersectingStreet,
  crashSeverity,
  latitude,
  longitude,
}) => {
  try {
    const {
      rows: [crashEvent],
    } = await client.query(
      `

            INSERT INTO crash_event("report_number", "crash_date", "crash_time", "county",
            "city", "investigating_agency", "on_street", "offset_feet", "offset_direction",
            "from_intersecting_street", "crash_severity", "latitude", "longitude")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *;
            `,
      [
        reportNumber,
        crashDate,
        crashTime,
        county,
        city,
        investigatingAgency,
        onStreet,
        offsetFeet,
        offsetDirection,
        fromIntersectingStreet,
        crashSeverity,
        latitude,
        longitude,
      ]
    );

    return crashEvent;
    
  } catch (error) {
    throw error;
  }
};


const getAllCrashEventData = async () => {
  try {
    const { rows: crashEventData } = await client.query(`
            SELECT * 
            FROM crash_event;
        `);

    return crashEventData;

  } catch (error) {
    throw error;
  }
};

module.exports = {
    createCrashEvent,
    getAllCrashEventData,
    
}
