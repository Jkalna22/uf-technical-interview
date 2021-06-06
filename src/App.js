import "./App.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import {
  fetchAllCrashEventData,
  fetchCrashData,
  fetchDriverData,
  fetchVehicleData,
} from "./api";
import CrashEvent from "./components/CrashEvent";
import Vehicle from "./components/Vehicle";
import Driver from "./components/Driver";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Banner from "./components/Banner";

const containerStyle = {
  flexGrow: 5,
  height: "90vh",
};

const center = {
  lat: 29.6516,
  lng: -82.3248,
};

function App() {
  const [markers, setMarkers] = useState([]);
  const [crashData, setCrashData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclePerPage, setVehiclePerPage] = useState(1);

  const indexOfLastVehicle = currentPage * vehiclePerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclePerPage;
  const currentVehicle = vehicleData.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const currentDriver = driverData.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    try {
      Promise.all([fetchAllCrashEventData()]).then(([data]) => {
        setMarkers(data);
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
    console.log(driverData, vehicleData);
  };

  const handleGoogleMapsMarkerColor = (crashSeverity) => {
    if(crashSeverity === 'Property Damage Only') {
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    } else if (crashSeverity === 'Injury') {
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    } else if (crashSeverity === 'Serious Injury') {
      return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
    } else if (crashSeverity === 'Fatal') {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
  }

  return (
    <div>
      <Header />
      <Banner />
    <div className="App">
      <LoadScript googleMapsApiKey="AIzaSyBWZ5_RG4kiTvO-FdnG5aLKloSzygBWmjs">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
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
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, maxWidth: '400px' }}>
        <div>
          <CrashEvent crashData={crashData}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {currentVehicle.map((vehicle) => <Vehicle vehicle={vehicle} driverData={currentDriver}/>)}
          <Pagination vehiclePerPage={vehiclePerPage} totalNumberOfVehicles={vehicleData.length} paginate={paginate}/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;

//Google Maps API Key# AIzaSyA4v_sBo_JIiO5upKMKFuTJso2VMZotTd0
