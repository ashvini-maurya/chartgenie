import React, { useState } from "react";
import "./sidebar.css";

interface ICgSidebar {
  children: React.ReactNode;
}

const CgSidebar = ({ children }: ICgSidebar) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <>
      <div className="burger" id="burger">
        <span className="burger-open" onClick={toggleSideBar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
            <g fill="#ffffff" fillRule="evenodd">
              <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
            </g>
          </svg>
        </span>
      </div>
      <section className={`sidebar ${showSideBar ? "active" : ""}`}>
        <div className="sidebar-head">
          <div className="burger" id="burger">
            <span className="burger-open" onClick={toggleSideBar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
                <g fill="#ffffff" fillRule="evenodd">
                  <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="sidebar-body">{children}</div>
      </section>
    </>
  );
};

export default CgSidebar;
