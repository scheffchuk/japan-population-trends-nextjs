import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopulationLineChart from "@/components/population-line-chart";

describe("PopulationLineChart", () => {
  // Sample chart data that matches your expected TransformedChartData shape.
  // The keys "1" and "2" store the values for prefecture codes 1 and 2.
  const sampleChartData = [
    { year: 2000, "1": 1000, "2": 500 },
    { year: 2005, "1": 1100, "2": 550 },
  ];

  // Two prefecture codes, with corresponding names.
  const selectedPrefCodes = [1, 2];
  const prefectureNames = {
    1: "Tokyo",
    2: "Osaka",
  };

  it("renders a responsive line chart with legend labels", () => {
    // We wrap the component in a fixed-size div because ResponsiveContainer
    // requires an explicit width/height.
    const { container } = render(
      <div style={{ width: 500, height: 400 }}>
        <PopulationLineChart
          chartData={sampleChartData}
          selectedPrefCodes={selectedPrefCodes}
          prefectureNames={prefectureNames}
        />
      </div>,
    );

    // Check that an SVG element has been rendered.
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();

    // Recharts renders the Legend using text elements. Checking for the legend labels
    // "Tokyo" and "Osaka" assures us that the Lines and Legend rendered.
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Osaka")).toBeInTheDocument();
  });
});
