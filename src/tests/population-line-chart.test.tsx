import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TransformedChartData } from "@/types";
import PopulationLineChart from "@/features/population/components/population-line-chart";

// Mock Recharts components
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: ({ dataKey, name }: { dataKey: string; name: string }) => (
    <div data-testid={`line-${dataKey}`}>Line: {name}</div>
  ),
  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis" data-datakey={dataKey}>
      XAxis
    </div>
  ),
  YAxis: () => <div data-testid="y-axis">YAxis</div>,
  CartesianGrid: () => <div data-testid="cartesian-grid">Grid</div>,
  Tooltip: ({ content }: { content: React.ReactNode }) => (
    <div data-testid="tooltip-wrapper">{content}</div>
  ),
  Legend: () => <div data-testid="legend">Legend</div>,
}));

// Mock CustomTooltip component
jest.mock("@/components/ui/custom-tooltip", () => ({
  __esModule: true,
  default: () => <div data-testid="custom-tooltip">CustomTooltip</div>,
}));

// Mock data (keep this)
const mockChartData: TransformedChartData[] = [
  { year: 1980, "1": 1200000, "13": 8000000 },
  { year: 1990, "1": 1250000, "13": 9000000 },
  { year: 2000, "1": 1300000, "13": 10000000 },
  { year: 2010, "1": 1350000, "13": 11000000 },
];
const mockSelectedPrefCodes: number[] = [1, 13];
const mockPrefectureNames: Record<number, string> = {
  1: "Hokkaido",
  13: "Tokyo",
  47: "Okinawa",
};

describe("PopulationLineChart", () => {
  // This test should now pass as the mock provides the test ID
  it("renders the mocked ResponsiveContainer", () => {
    render(
      <PopulationLineChart
        chartData={mockChartData}
        selectedPrefCodes={mockSelectedPrefCodes}
        prefectureNames={mockPrefectureNames}
      />,
    );
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    // Check that the inner chart mock is also rendered
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  // Adjust test to check for the mocked Line components
  it("renders Line components for selected prefectures with correct props", () => {
    render(
      <PopulationLineChart
        chartData={mockChartData}
        selectedPrefCodes={mockSelectedPrefCodes}
        prefectureNames={mockPrefectureNames}
      />,
    );

    // Check if mocked Lines exist based on dataKey (prefCode)
    const line1 = screen.getByTestId("line-1");
    const line13 = screen.getByTestId("line-13");

    expect(line1).toBeInTheDocument();
    expect(line13).toBeInTheDocument();

    // Check if the correct 'name' was passed to the mocked Line
    expect(line1).toHaveTextContent("Line: Hokkaido");
    expect(line13).toHaveTextContent("Line: Tokyo");
  });

  // Adjust test to check that Line for unselected prefecture is NOT rendered
  it("does not render Line components for unselected prefectures", () => {
    render(
      <PopulationLineChart
        chartData={mockChartData}
        selectedPrefCodes={mockSelectedPrefCodes}
        prefectureNames={mockPrefectureNames}
      />,
    );

    // Check that the Line mock for prefCode 47 does NOT exist
    expect(screen.queryByTestId("line-47")).not.toBeInTheDocument();
  });

  // Adjust test to check for mocked Axes
  it("renders mocked XAxis and YAxis components", () => {
    render(
      <PopulationLineChart
        chartData={mockChartData}
        selectedPrefCodes={mockSelectedPrefCodes}
        prefectureNames={mockPrefectureNames}
      />,
    );

    const xAxis = screen.getByTestId("x-axis");
    expect(xAxis).toBeInTheDocument();
    // Optionally check if the correct dataKey was passed to the XAxis mock
    expect(xAxis).toHaveAttribute("data-datakey", "year");

    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
  });

  // Adjust test to check for the mocked Tooltip and its content
  it("renders the mocked Tooltip containing the mocked CustomTooltip", () => {
    render(
      <PopulationLineChart
        chartData={mockChartData}
        selectedPrefCodes={mockSelectedPrefCodes}
        prefectureNames={mockPrefectureNames}
      />,
    );
    // Check if the wrapper for the tooltip content exists
    expect(screen.getByTestId("tooltip-wrapper")).toBeInTheDocument();
    // Check if the mocked custom tooltip content is inside the wrapper
    expect(screen.getByTestId("custom-tooltip")).toBeInTheDocument();
  });

  // Add a test for the Legend mock
  it("renders the mocked Legend component", () => {
    render(
      <PopulationLineChart
        chartData={mockChartData}
        selectedPrefCodes={mockSelectedPrefCodes}
        prefectureNames={mockPrefectureNames}
      />,
    );
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });
});
