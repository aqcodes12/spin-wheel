import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./wheel.css";
import arrow from "../assets/spinner-arrow-.svg";

const SpinWheelApp = () => {
  const [finalValue, setFinalValue] = useState(
    "Click On The Spin Button To Start"
  );
  const [spinDisabled, setSpinDisabled] = useState(false);

  useEffect(() => {
    let myChart;

    const initializeChart = () => {
      const wheelCanvas = document.getElementById("wheel");
      myChart = new Chart(wheelCanvas, {
        type: "pie",
        plugins: [ChartDataLabels],
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              backgroundColor: [
                "#8b35bc",
                "#b163da",
                "#8b35bc",
                "#b163da",
                "#8b35bc",
                "#b163da",
              ],
              data: [16, 16, 16, 16, 16, 16],
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 0 },
          plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
              color: "#ffffff",
              formatter: (_, context) =>
                context.chart.data.labels[context.dataIndex],
              font: { size: 24 },
            },
          },
        },
      });
    };

    initializeChart();

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
  ];

  const spinWheel = () => {
    setSpinDisabled(true);
    setFinalValue("Good Luck!");

    let count = 0;
    let resultValue = 101;
    // let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let randomDegree = 50;

    const wheelCanvas = document.getElementById("wheel");
    const myChart = Chart.getChart(wheelCanvas);

    const rotationInterval = setInterval(() => {
      myChart.options.rotation += resultValue;
      myChart.update();

      if (myChart.options.rotation >= 360) {
        count++;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  };

  const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setFinalValue(`Value: ${i.value}`);
        setSpinDisabled(false);
        break;
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <canvas id="wheel"></canvas>
        <button id="spin-btn" onClick={spinWheel} disabled={spinDisabled}>
          Spin
        </button>
        <img src={arrow} alt="spinner-arrow" />
      </div>
      <div id="final-value">
        <p>{finalValue}</p>
      </div>
    </div>
  );
};

export default SpinWheelApp;
