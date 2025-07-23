import { useCreateComic } from "@/hooks";
import { ComicList } from "../ui";

   

const FreeComic = () => {
  const { comics } = useCreateComic();
  const freeComics = comics?.filter((comic) => comic.isFree).slice(0, 10);
  return (
    <div className="main my-[100px] space-y-[24px]">
      <h2 className="text-2xl font-bold uppercase">Free Comic</h2>
     <ComicList comics={freeComics}/>
    </div>
  );
  };

  export default FreeComic;
