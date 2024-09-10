import { create } from "zustand";

interface Props {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<Props>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
}));
