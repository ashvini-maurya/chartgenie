import "./home.css";

import { AgBarSeriesOptions, AgChartOptions } from "ag-charts-community";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CgBottomSection from "../../components/bottom-section/bottom-section";
import CgButton from "../../components/button/button";
import CgChart from "../../components/chart/chart";
import CgHomeHeader from "../../components/home-header/home-header";
import CgModal from "../../components/modal/modal";
import CgSidebar from "../../components/sidebar/sidebar";
import ChartCustomization from "../chart-customization/chart-customization";
import Papa from "papaparse";
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
  const [value, setValue] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);
  const [previousChats, setPreviousChats] = useState<Chat[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [chartType, setChartType] = useState("pie");
  const lastMessageRef = useRef<HTMLLIElement | null>(null);
  const [chartColor, setChartColor] = useState<string>("#4caf50");
  const [xAxisLabel, setXAxisLabel] = useState<string>("X Axis");
  const [yAxisLabel, setYAxisLabel] = useState<string>("Y Axis");
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [options, setOptions] = useState<AgChartOptions>({
    data: [],
    series: [],
  });
  const [pieOptions, setPieOptions] = useState<AgChartOptions>({ series: [] });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);

  const getAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const parsedData = result.data as Record<string, any>[];
          const headers = Object.keys(parsedData[0] || {});

          if (headers.length < 2) {
            console.error(
              "CSV must contain at least two columns for X and Y axes."
            );
            return;
          }

          const xAxis = headers[0];
          setXAxisLabel(xAxis);
          const yAxis = headers[1];
          setYAxisLabel(yAxis);
          const chartData = parsedData.map((row) => ({
            ...row,
            [xAxis]: row[xAxis],
            [yAxis]: Number(row[yAxis]),
          }));
          setOptions({
            data: chartData,
            series: [
              {
                type: chartType as any,
                xKey: xAxis,
                yKey: yAxis,
              },
            ],
          });
          setPieOptions({
            series: [
              {
                data: chartData,
                type: "pie",
                angleKey: yAxis,
                calloutLabelKey: xAxis,
              },
            ],
          });
          console.log("Parsed data:", parsedData);
        },
      });
    } else {
      console.error("Please upload a valid CSV file.");
    }
  };

  const handleApiResponse = (csvString: string) => {
    const parsedResult = Papa.parse<Record<string, string>>(csvString, {
      header: true,
    });
    const parsedData = parsedResult.data;

    if (parsedData.length === 0) {
      console.error("No data found in the response.");
      return;
    }

    const headers = parsedResult.meta.fields;
    if (!headers || headers.length < 2) {
      console.error("CSV must contain at least two columns for X and Y axes.");
      return;
    }

    const [xKey, yKey] = headers;

    setOptions({
      data: parsedData.map((row) => ({
        ...row,
        [xKey]: row[xKey],
        // [yKey]: row[xKey]
        [yKey]: Number(row[yKey]?.replace(/,/g, "") || 0),
      })),
      series: [
        {
          type: "line",
          xKey,
          yKey,
        },
      ],
    });
  };

  const getMessages = async () => {
    if (!value.trim()) return;
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
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
      const assistantMessage = data?.choices[0]?.message as Message;

      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: assistantMessage.role,
          content: assistantMessage.content,
        },
      ]);
      setMessage(assistantMessage);
      setValue("");

      if (data?.choices[0]?.message?.content) {
        handleApiResponse(data?.choices[0].message.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle: string | null) => {
    setCurrentTitle(uniqueTitle);
    setValue("");
  };

  const handleChartType = (e: any) => {
    setChartType(e.target.value);
  };

  useEffect(() => {
    const session = sessionStorage.getItem("user_session");
    if (session === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (chartType === "bar" || chartType === "line") {
      const newOptions: AgChartOptions = {
        data: options.data,
        series: [
          {
            type: chartType,
            xKey: xAxisLabel,
            yKey: yAxisLabel,
            fill: chartColor,
            label: showLabels ? { enabled: true } : { enabled: false },
          } as AgBarSeriesOptions,
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
            title: { text: xAxisLabel },
          },
          {
            type: "number",
            position: "left",
            title: { text: yAxisLabel },
          },
        ],
      };
      setOptions(newOptions);
    }
  }, [chartType, chartColor, xAxisLabel, yAxisLabel, showLabels]);

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  return (
    <div className="app">
      <CgSidebar>
        <CgButton type="button" onClick={createNewChat}>
          New Chat
        </CgButton>
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
        <div className="chart-section">
          <button onClick={toggleModal}>Customize Chart</button>
          <CgModal isOpen={isModalOpen} onClose={toggleModal}>
            <ChartCustomization
              chartColor={chartColor}
              setChartColor={setChartColor}
              xAxisLabel={xAxisLabel}
              setXAxisLabel={setXAxisLabel}
              yAxisLabel={yAxisLabel}
              showLabels={showLabels}
              setYAxisLabel={setYAxisLabel}
              setShowLabels={(e) => setShowLabels(e)}
            />
          </CgModal>
          <select
            onChange={handleChartType}
            value={chartType}
            className="chart-selection-dropdown"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
          <div style={{ width: "400px" }}>
            <CgChart
              chartOptions={chartType === "pie" ? pieOptions : options}
            />
          </div>
        </div>
        <div className="feed">
          <ul>
            {currentChat?.map((chatMessage, index) => (
              <li
                key={`${chatMessage.role}-${index}`}
                className={
                  chatMessage.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }
                ref={index === currentChat.length - 1 ? lastMessageRef : null}
              >
                <p className="role">{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <CgBottomSection
          getAttachment={getAttachment}
          getMessages={getMessages}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </section>
    </div>
  );
};

export default Home;
