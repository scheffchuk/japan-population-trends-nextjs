import { create } from "zustand";

type CheckedPrefecturesStore = {
  checkedPrefectureCodes: Set<number>;
  togglePrefectureCode: (prefCode: number) => void;
  isChecked: (prefCode: number) => boolean;
  resetChecked: () => void;
};

const useCheckedPrefecturesStore = create<CheckedPrefecturesStore>(
  (set, get) => ({
    checkedPrefectureCodes: new Set<number>(),

    togglePrefectureCode: (prefCode: number) => {
      set((state) => {
        const newCheckedPrefectureCodes = new Set(state.checkedPrefectureCodes);
        if (newCheckedPrefectureCodes.has(prefCode)) {
          newCheckedPrefectureCodes.delete(prefCode);
        } else {
          newCheckedPrefectureCodes.add(prefCode);
        }
        return { checkedPrefectureCodes: newCheckedPrefectureCodes };
      });
    },

    isChecked: (prefCode: number): boolean => {
      return get().checkedPrefectureCodes.has(prefCode);
    },

    resetChecked: () => set({ checkedPrefectureCodes: new Set<number>() }),
  }),
);

export default useCheckedPrefecturesStore;
