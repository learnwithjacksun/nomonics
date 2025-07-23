import { useCreateComic } from "@/hooks";
import { ComicList } from "../ui";

   

const MostViewed = () => {
  const { comics } = useCreateComic();
  return (
    <div className="main my-[100px] space-y-[24px]">
      <h2 className="text-2xl font-bold uppercase">Most Viewed</h2>
      <ComicList comics={comics?.slice(0, 10)}/>
    </div>
  );
};

export default MostViewed;
