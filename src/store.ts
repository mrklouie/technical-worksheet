import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  isViewMode: false,
};

interface StoreState {
  isViewMode: boolean;
  disableViewMode?: () => void;
  enableViewMode?: () => void;
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    isViewMode: false,
    disableViewMode: () => set(() => ({ isViewMode: false })),
    enableViewMode: () => set(() => ({ isViewMode: true })),
  }))
);
