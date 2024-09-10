import { Models } from "react-native-appwrite";
import { create } from "zustand";

interface Props {
  user: Models.Document | null;
  setUser: (user: Models.Document | null) => void;
}

export const useUserStore = create<Props>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
