import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
