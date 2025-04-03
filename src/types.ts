export type PrefecturesResponse = {
  message: Record<string, unknown> | null;
  result: Prefectures[];
};

export type Prefectures = {
  prefCode: number;
  prefName: string;
};

export type PopulationYearData = {
  year: number;
  value: number;
  rate?: number;
};

export type PopulationCategoryData = {
  label: string;
  data: PopulationYearData[];
};

export type PopulationCompositionPerYear = {
  boundaryYear: number;
  data: PopulationCategoryData[];
};

export type PopulationCompositionPerYearResponse = {
  message: Record<string, unknown> | null;
  result: PopulationCompositionPerYear;
};

export type TransformedChartData = {
  year: number;
  [prefCode: number]: number;
};
