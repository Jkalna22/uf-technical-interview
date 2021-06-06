import React from "react";

const Driver = ({ driver }) => {
  const { person_number, injury_severity, sex, age, restraint_systems } =
    driver;
  return (
    <div>
      <h5 style={{ fontSize: "16px" }}>Traveler Details</h5>
      <p>Person Number: {person_number}</p>
      <p>Injury Severity: {injury_severity}</p>
      <p>Sex: {sex}</p>
      <p>Age: {age}</p>
      <p>Restraint Systems: {restraint_systems}</p>
    </div>
  );
};

export default Driver;
