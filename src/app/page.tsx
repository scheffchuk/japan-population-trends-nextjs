import { PopulationDataCard } from "@/features/population/components/population-data-card";
import PrefecturesCheckboxContainer from "@/features/prefectures/components/prefectures-checkbox-container";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <PrefecturesCheckboxContainer />
      <PopulationDataCard />
    </div>
  );
}
