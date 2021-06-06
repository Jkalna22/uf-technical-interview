import React from "react";

const crashEvent = ({ crashData }) => {
  const {
    report_number,
    crash_severity,
    crash_date,
    crash_time,
    on_street,
    from_intersecting_street,
    offset_direction,
    offset_feet,
    investigating_agency,
    city,
    county,
  } = crashData;

  const formattedDate = crash_date.split("T")[0];
  const formattedTimeFunction = (time) => {
    const splitTime = time.split(":");
    let hours = splitTime[0];
    const minutes = splitTime[1];
    const seconds = splitTime[2];
    if (hours > 12) {
      return `${hours - 12}:${minutes}:${seconds} pm`;
    } else {
      return `${hours}:${minutes}:${seconds} am`;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        marginRight: "20px",
        fontSize: "12px",
      }}
    >
      <h3 style={{ textDecoration: "underline" }}>Report # {report_number}</h3>
      <h4>Investigating Agency: {investigating_agency}</h4>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "10px" }}>
          <p>Severity: {crash_severity}</p>
          <p>Date: {formattedDate}</p>
          <p>Time: {formattedTimeFunction(crash_time)}</p>
          <p>On Street: {on_street}</p>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <p>From Street: {from_intersecting_street}</p>
          {offset_direction ? <p>Offset direction: {offset_direction}</p> : ""}
          {offset_feet ? <p>Offset feet: {offset_feet}</p> : ""}
          <p>City: {city}</p>
          <p>County: {county}</p>
        </div>
      </div>
    </div>
  );
};

export default crashEvent;
