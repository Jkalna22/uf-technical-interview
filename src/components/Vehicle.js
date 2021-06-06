import React from "react";
import Driver from "./Driver";

const Vehicle = ({ vehicle, driverData }) => {
  const {
    vehicle_number,
    make,
    model,
    color,
    year,
    maneuver,
    traveling_direction,
    traveling_on_Street,
  } = vehicle;

  return (
    <div
      style={{ display: "flex", flexDirection: "row", marginLeft: "20px", marginRight: "20px", fontSize: '15px' }}
    >
      <div style={{ display: "flex", flexDirection: "column", marginRight: '10px' }}>
        <h5>Vehicle # {vehicle_number}</h5>
        <p>Make: {make}</p>
        <p>Model: {model}</p>
        <p>Year: {year}</p>
        <p>Color: {color}</p>
        <p>Traveling On Street: {traveling_on_Street}</p>
        <p>Traveling Direction: {traveling_direction}</p>
        <p>Manuever: {maneuver}</p>
      </div>
      <div style={{marginLeft: '10px'}}>
        {driverData.map((driver) => (
          <Driver driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default Vehicle;
