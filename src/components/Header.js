import React from "react";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div style={{ margin: "10px", fontSize: "30px" }}>
        UF Traffic Information Dashboard
      </div>
    </div>
  );
};

export default Header;
