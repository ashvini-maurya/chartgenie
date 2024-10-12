import "./home.css";

import {
  AgBarSeriesOptions,
  AgChartOptions,
  AgLineSeriesOptions
} from "ag-charts-community";
import { useEffect, useState } from "react";

import CgBottomSection from "../../components/bottom-section/bottom-section";
import CgButton from "../../components/button/button";
import CgChart from "../../components/chart/chart";
import CgHomeHeader from "../../components/home-header/home-header";
import CgSidebar from "../../components/sidebar/sidebar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Message {
  role: string;
  content: string;
}

interface Chat {
  title: string | null;
  role: string;
  content: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [message, setMessage] = useState<Message | null>(null);
  const [previousChats, setPreviousChats] = useState<Chat[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
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

   const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data?.choices[0]?.message as Message);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle: string | null) => {
    setCurrentTitle(uniqueTitle);
    setValue('');
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

useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle, value]);

  return (
    <div className="app">
      <CgSidebar>
        <CgButton type="button" onClick={createNewChat}>New Chat</CgButton>
        <nav>
          <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) => (
              <li key={index} onClick={() => handleClick(uniqueTitle)}>
                {uniqueTitle}
              </li>
            ))}
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
          <ul>
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        </div>
        <CgBottomSection getMessages={getMessages} value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </div>
  );
};

export default Home;
