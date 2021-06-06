import "./App.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import {
  fetchAllCrashEventData,
  fetchAllDriverData,
  fetchCrashData,
  fetchDriverData,
  fetchVehicleData,
} from "./api";
import CrashEvent from "./components/CrashEvent";
import Vehicle from "./components/Vehicle";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Banner from "./components/Banner";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const containerStyle = {
  flexGrow: 5,
  height: "70vh",
};

const center = {
  lat: 29.6516,
  lng: -82.3248,
};

function App() {
  const [markers, setMarkers] = useState([]);
  const [allDriverData, setAllDriverData] = useState([]);
  const [allCrashEventData, setAllCrashEventData] = useState([]);
  const [crashData, setCrashData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclePerPage, setVehiclePerPage] = useState(1);

  const indexOfLastVehicle = currentPage * vehiclePerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclePerPage;
  const currentVehicle = vehicleData.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );
  const currentDriver = driverData.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    try {
      Promise.all([fetchAllCrashEventData()]).then(([data]) => {
        setMarkers(data);
        setAllCrashEventData(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      Promise.all([fetchAllDriverData()]).then(([data]) => {
        setAllDriverData(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = async (reportNumber) => {
    const fetchedCrashData = await fetchCrashData(reportNumber);
    setCrashData(fetchedCrashData[0]);
    const fetchedVehicleData = await fetchVehicleData(reportNumber);
    setVehicleData(fetchedVehicleData);
    const fetchedDriverData = await fetchDriverData(reportNumber);
    setDriverData(fetchedDriverData);
  };

  const handleGoogleMapsMarkerColor = (crashSeverity) => {
    if (crashSeverity === "Property Damage Only") {
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    } else if (crashSeverity === "Injury") {
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    } else if (crashSeverity === "Serious Injury") {
      return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
    } else if (crashSeverity === "Fatal") {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  };

  return (
    <div>
      <Header />
      <Banner />
      <div className="App">
        <LoadScript googleMapsApiKey="AIzaSyCZWa-GNC4dI1t1CbJODfd8uY78sD8kiwE">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {markers.map((crashEvent) => (
              <Marker
                key={crashEvent.report_number}
                icon={handleGoogleMapsMarkerColor(crashEvent.crash_severity)}
                position={{
                  lat: Number(crashEvent.latitude),
                  lng: Number(crashEvent.longitude),
                }}
                onClick={(event) => handleClick(crashEvent.report_number)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        {vehicleData[0] ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "70vh",
              width: "200px",
              backgroundColor: "#C1C1C1",
            }}
          >
            <div>
              <CrashEvent crashData={crashData} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {currentVehicle.map((vehicle) => (
                <Vehicle vehicle={vehicle} driverData={currentDriver} />
              ))}
              <Pagination
                vehiclePerPage={vehiclePerPage}
                totalNumberOfVehicles={vehicleData.length}
                paginate={paginate}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "200px",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              backgroundColor: "grey",
            }}
          >
            Select a marker to see crash data
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#F3F3F3",
        }}
      >
        <BarChart allDriverData={allDriverData} />
        <PieChart allDriverData={allDriverData} />
      </div>
    </div>
  );
}

export default App;

//Google Maps API Key# AIzaSyCZWa-GNC4dI1t1CbJODfd8uY78sD8kiwE
