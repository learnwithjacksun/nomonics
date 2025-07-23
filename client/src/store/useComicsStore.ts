import { create } from "zustand";

interface ComicStore {
  singleComics: SingleComicType[];
  setSingleComics: (comics: SingleComicType[]) => void;
}

const useComicsStore = create<ComicStore>((set) => ({
  singleComics: [],
  setSingleComics: (comics) => set({ singleComics: comics }),
}));

export default useComicsStore;
