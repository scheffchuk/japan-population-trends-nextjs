import { create } from "zustand";

type isExpandedState = {
  isExpanded: boolean;
  toggleExpand: () => void;
};

const useExpandedStore = create<isExpandedState>((set) => ({
  isExpanded: false,
  toggleExpand: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));

export default useExpandedStore;
