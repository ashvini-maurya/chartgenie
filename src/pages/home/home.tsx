import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import CgSidebar from "../../components/sidebar/sidebar";
import "./home.css";
import CgButton from "../../components/button/button";
import CgBottomSection from "../../components/bottom-section/bottom-section";
import CgHomeHeader from "../../components/home-header/home-header";
import CgChart from "../../components/chart/chart";
import {
  AgChartOptions,
  AgBarSeriesOptions,
  AgLineSeriesOptions,
  AgPieSeriesOptions,
} from "ag-charts-community";

const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [options, setOptions] = useState<AgChartOptions>({
    // Data: Data to be displayed in the chart
    data: [
      { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
      { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
      { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
      { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
      { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [
      {
        type: chartType,
        xKey: "month",
        yKey: "iceCreamSales",
      } as AgBarSeriesOptions,
    ],
  });

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((error) => alert(error));
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "Hello how are you?",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChartType = (e: any) => {
    console.log(e.target.value, "event");
    setChartType(e.target.value);
  };

  useEffect(() => {
    const session = sessionStorage.getItem("user_session");
    if (session === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let newOptions: AgChartOptions = options;
    if (chartType === "bar") {
      newOptions = {
        data: [
          { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
          { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
          { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
          { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
          { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
          { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
        ],
        series: [
          {
            type: "bar",
            xKey: "month",
            yKey: "iceCreamSales",
          } as AgBarSeriesOptions,
        ],
      };
    } else if (chartType === "line") {
      newOptions = {
        data: [
          { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
          { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
          { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
          { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
          { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
          { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
        ],
        series: [
          {
            type: "line",
            xKey: "month",
            yKey: "iceCreamSales",
          } as AgLineSeriesOptions,
        ],
      };
    } else if (chartType === "pie") {
      newOptions = {
        data: [
          { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
          { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
          { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
          { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
          { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
          { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
        ],
        series: [
          {
            type: "pie",
            angleKey: "iceCreamSales",
            legendItemKey: "month",
          },
        ],
      };
    }
    setOptions(newOptions);
  }, [chartType]);
  return (
    <div className="app">
      <CgSidebar>
        <CgButton type="button">New Chat</CgButton>
        <nav>
          <ul className="history">
            <li>hi1</li>
            <li>hi2</li>
            <li>hi3</li>
          </ul>
        </nav>
      </CgSidebar>

      <section className="main">
        <CgHomeHeader onClick={handleLogout} />
        <div className="feed">
          <select onChange={handleChartType} value={chartType}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
          <div style={{ width: "100%" }}>
            <CgChart chartOptions={options} />
          </div>
        </div>
        <CgBottomSection getMessages={getMessages} />
      </section>
    </div>
  );
};

export default Home;
