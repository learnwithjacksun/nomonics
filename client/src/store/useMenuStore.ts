import { create } from "zustand";

interface MenuStore {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));

export default useMenuStore;
