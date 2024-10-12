import React from "react";

interface ICgHomeHeader {
  onClick: () => void;
}

const CgHomeHeader = ({ onClick }: ICgHomeHeader) => {
  return (
    <div className="main-head">
      <h3>CHART GENIE</h3>
      <button onClick={onClick} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default CgHomeHeader;
