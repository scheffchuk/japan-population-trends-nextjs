import DisplayPopulationData from "@/components/display-population-data";
import DisplayPrefectures from "@/components/display-prefectures";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <DisplayPrefectures />
      <DisplayPopulationData />
    </div>
  );
}
