import { useCreateComic } from "@/hooks";
import { ComicList } from "../ui";

   

const NewReleases = () => {
  const { comics } = useCreateComic();
  const newComics = comics?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);
  return (
    <div className="main my-[100px] space-y-[24px]">
      <h2 className="text-2xl font-bold uppercase">New Releases</h2>
      <ComicList comics={newComics}/>
    </div>
  );
};

export default NewReleases;
