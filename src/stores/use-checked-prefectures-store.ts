import { create } from "zustand";

type CheckedPrefecturesStore = {
  checkedPrefCodes: Set<number>;
  togglePrefCode: (prefCode: number) => void;
  isChecked: (prefCode: number) => boolean;
  resetChecked: () => void;
};

const useCheckedPrefecturesStore = create<CheckedPrefecturesStore>(
  (set, get) => ({
    checkedPrefCodes: new Set<number>(),

    togglePrefCode: (prefCode: number) => {
      set((state) => {
        const newCheckedPrefCodes = new Set(state.checkedPrefCodes);
        if (newCheckedPrefCodes.has(prefCode)) {
          newCheckedPrefCodes.delete(prefCode);
        } else {
          newCheckedPrefCodes.add(prefCode);
        }
        return { checkedPrefCodes: newCheckedPrefCodes };
      });
    },

    isChecked: (prefCode: number): boolean => {
      return get().checkedPrefCodes.has(prefCode);
    },

    resetChecked: () => set({ checkedPrefCodes: new Set<number>() }),
  }),
);

export default useCheckedPrefecturesStore;
