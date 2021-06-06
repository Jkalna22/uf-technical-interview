import './App.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {useEffect, useState} from 'react'
import { fetchCrashEventData } from './api';

const containerStyle = {
  flexGrow: 5,
  height: '100vh'
};

const center = {
  lat: 29.6516,
  lng: -82.3248
};

function App() {

  const [markers, setMarkers] = useState([]);
  const [crashData, setCrashData] = useState([]);


  useEffect(() => {
    try {
      Promise.all([fetchCrashEventData()]).then(([data]) => {
        setMarkers(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = (reportNumber) => {
    console.log(reportNumber);
  }

  console.log(markers);


  return (
    <div className="App">
      <LoadScript
      googleMapsApiKey="AIzaSyBWZ5_RG4kiTvO-FdnG5aLKloSzygBWmjs"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
      {markers.map((crashEvent) => <Marker key={crashEvent.report_number} position={{lat: Number(crashEvent.latitude), lng: Number(crashEvent.longitude)}} onClick={(event) => handleClick(crashEvent.report_number)}/>)}
      </GoogleMap>
    </LoadScript>
    <div style={{flexGrow: 1}}>
    hello
    </div>
    </div>
  );
}

export default App;

//Google Maps API Key# AIzaSyA4v_sBo_JIiO5upKMKFuTJso2VMZotTd0

