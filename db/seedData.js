const client = require("./client");
const { createCrashEvent } = require("./crashEvent");
const { createDriverCrashEventData } = require("./driver");
const { createVehicleCrashEventData } = require("./vehicle");

async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS driver;
        DROP TABLE IF EXISTS vehicle;
        DROP TABLE IF EXISTS crash_event;
        `)
    } catch (error) {
        throw error;
    }
}

async function createTables() {
    console.log('Starting to build the tables');
    try {
        await client.query(`
        CREATE TABLE crash_event (
            "report_number" INTEGER NOT NULL UNIQUE,
            "crash_date" DATE,
            "crash_time" TIME,
            "county" TEXT,
            "city" TEXT,
            "investigating_agency" TEXT,
            "on_street" TEXT,
            "offset_feet" INTEGER,
            "offset_direction" TEXT,
            "from_intersecting_street" TEXT,
            "crash_severity" TEXT,
            "latitude" DECIMAL,
            "longitude" DECIMAL
        );
        CREATE TABLE vehicle (
            "report_number" INTEGER REFERENCES crash_event("report_number"),
            "vehicle_number" INTEGER NOT NULL,
            "year" INTEGER NOT NULL,
            "make" TEXT,
            "model" TEXT,
            "color" TEXT,
            "traveling_on_street" TEXT,
            "traveling_direction" TEXT,
            "maneuver" TEXT
        );
        CREATE TABLE driver (
            "report_number" INTEGER REFERENCES crash_event("report_number"),
            "vehicle_number" INTEGER,
            "person_number" INTEGER NOT NULL,
            "injury_severity" TEXT,
            "sex" VARCHAR(1),
            "age" INTEGER,
            "restraint_systems" TEXT
        )
        `)
    } catch (error) {
        throw error;
    }
}

async function populateCrashEventData() {
    console.log('creating crash event data');
    try {
        const crashData = [
            {
                reportNumber: 5000001, crashDate: "2021/05/01", crashTime: "11:12:00", county: "Alachua", city: "Gainesville", investigatingAgency: "Gainesville Police Department", 
                onStreet: "NW 14th Street", offsetFeet: null, offsetDirection: null, fromIntersectingStreet: "NW 2nd Avenue", crashSeverity: "Property Damage Only", latitude: 29.65336, longitude: -82.340477
            },
            {
                reportNumber: 5000002, crashDate: "2021/05/01", crashTime: "15:58:00", county: "Alachua", city: "Gainesville", investigatingAgency: "Florida Highway Patrol", 
                onStreet: "SR-24", offsetFeet: null, offsetDirection: null, fromIntersectingStreet: "SW 34th Street", crashSeverity: "Serious Injury", latitude: 29.627061, longitude: -82.372452
            },
            {
                reportNumber: 5000003, crashDate: "2021/05/01", crashTime: "16:08:00", county: "Alachua", city: "Gainesville", investigatingAgency: "Gainesville Police Department", 
                onStreet: "SW 34th Street", offsetFeet: 150, offsetDirection: "North", fromIntersectingStreet: "SW Archer Road", crashSeverity: "Injury", latitude: 29.627653, longitude: -82.37244
            },
            {
                reportNumber: 5000004, crashDate: "2021/05/01", crashTime: "17:15:00", county: "Alachua", city: "Unincorporated", investigatingAgency: "Florida Highway Patrol", 
                onStreet: "I-75", offsetFeet: 3000, offsetDirection: "North", fromIntersectingStreet: "SR-24", crashSeverity: "Fatal", latitude: 29.623165, longitude: -82.390096
            },
            {
                reportNumber: 5000005, crashDate: "2021/05/01", crashTime: "18:11:00", county: "Alachua", city: "Unincorporated", investigatingAgency: "Alachua County Sheriff's Office", 
                onStreet: "3970 SW Archer Road (Parking Lot)", offsetFeet: null, offsetDirection: null, fromIntersectingStreet: null, crashSeverity: "Property Damage Only", latitude: 29.620315, longitude: -82.384064
            }
        ]

        const crashEventData = await Promise.all(crashData.map(createCrashEvent));
        console.log("crash event data created");
        console.log(crashEventData);
        console.log("finished creating crash event data");

    } catch (error) {
        throw error
    }
}

async function populateVehicleCrashEventData() {
    console.log('creating vehicle crash event data');
    try {
        const vehicleData = [
            {
                reportNumber: 5000001, vehicleNumber: 1, year: 2017, make: "HOND", model: "ACCORD", color: "WHT", travelingOnStreet: "NW 14th Street", travelingDirection: "North", maneuver: "Straight Ahead"
            },
            {
                reportNumber: 5000001, vehicleNumber: 2, year: 2020, make: "TESL", model: "MODEL S", color: "RED", travelingOnStreet: "NW 2nd Avenue", travelingDirection: "West", maneuver: "Turning Left"
            },
            {
                reportNumber: 5000002, vehicleNumber: 1, year: 1968, make: "PONT", model: "FIREBIRD", color: "WHT", travelingOnStreet: "SR-24", travelingDirection: "East", maneuver: "Turning Left"
            },
            {
                reportNumber: 5000002, vehicleNumber: 2, year: 1984, make: "CHEV", model: "CAMARO", color: "BLU", travelingOnStreet: "SR-24", travelingDirection: "West", maneuver: "Straight Ahead"
            },
            {
                reportNumber: 5000003, vehicleNumber: 1, year: 2008, make: "FORD", model: "EXPEDITION", color: "BLK", travelingOnStreet: "SW 34th Street", travelingDirection: "North", maneuver: "Straight Ahead"
            },
            {
                reportNumber: 5000003, vehicleNumber: 2, year: 2018, make: "GMC", model: "YUKON", color: "GRN", travelingOnStreet: "SW 34th Street", travelingDirection: "North", maneuver: "Turning Right"
            },
            {
                reportNumber: 5000004, vehicleNumber: 1, year: 2016, make: "FORD", model: "TRANSIT", color: "SIL", travelingOnStreet: "I-75", travelingDirection: "North", maneuver: "Straight Ahead"
            },
            {
                reportNumber: 5000005, vehicleNumber: 1, year: 2019, make: "JEEP", model: "CHEROKEE", color: "BLK", travelingOnStreet: "Target Parking Lot", travelingDirection: "East", maneuver: "Backing"
            },
            {
                reportNumber: 5000005, vehicleNumber: 2, year: 2021, make: "MERC", model: "E300", color: "WHT", travelingOnStreet: "Target Parking Lot", travelingDirection: "South", maneuver: "Straight Ahead"
            },
        ]


        const vehicleCrashEventData = await Promise.all(vehicleData.map(createVehicleCrashEventData));
        console.log('vehicle data created')
        console.log(vehicleCrashEventData);
        console.log('finished creating vehicle data');

    } catch (error) {
        throw error;
    }
}

async function populateDriverCrashEventData() {
    console.log('creating driver crash event data');
    try {
        const driverData = [
            {
                reportNumber: 5000001, vehicleNumber: 1, personNumber: 1, injurySeverity: 'None', sex: 'M', age: 62, restraintSystems: "Shoulder & Lap Belts"
            },
            {
                reportNumber: 5000001, vehicleNumber: 2, personNumber: 3, injurySeverity: 'None', sex: 'F', age: 26, restraintSystems: "Shoulder & Lap Belts"
            },
            {
                reportNumber: 5000002, vehicleNumber: 1, personNumber: 1, injurySeverity: 'Injury', sex: 'F', age: 56, restraintSystems: "Lap Belt Only"
            },
            {
                reportNumber: 5000002, vehicleNumber: 2, personNumber: 2, injurySeverity: 'Serious Injury', sex: 'M', age: 68, restraintSystems: "None Used"
            },
            {
                reportNumber: 5000003, vehicleNumber: 1, personNumber: 1, injurySeverity: 'none', sex: 'M', age: 22, restraintSystems: "Shoulder & Lap Belts"
            },
            {
                reportNumber: 5000003, vehicleNumber: 2, personNumber: 2, injurySeverity: 'Injury', sex: 'F', age: 19, restraintSystems: "Shoulder & Lap Belts"
            },
            {
                reportNumber: 5000004, vehicleNumber: 1, personNumber: 1, injurySeverity: 'Fatal', sex: 'M', age: 29, restraintSystems: "None Used"
            },
            {
                reportNumber: 5000005, vehicleNumber: 1, personNumber: 1, injurySeverity: 'None', sex: 'F', age: 18, restraintSystems: "Shoulder & Lap Belts"
            },
            {
                reportNumber: 5000005, vehicleNumber: 2, personNumber: 2, injurySeverity: 'None', sex: 'M', age: 34, restraintSystems: "Shoulder & Lap Belts"
            }
        ]

        const driverCrashEventData = await Promise.all(driverData.map(createDriverCrashEventData));
        console.log('driver data created')
        console.log(driverCrashEventData);
        console.log('finished creating driver data');

    } catch (error) {
        throw error
    }
}



async function buildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await populateCrashEventData();
        await populateVehicleCrashEventData();
        await populateDriverCrashEventData();
    } catch (error) {
        console.log('error building DB');
        throw error
    }
}

module.exports = {
    buildDB
}