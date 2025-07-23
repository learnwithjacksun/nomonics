import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ComicCard from "./ComicCard";


const ComicList = ({ comics }: { comics: IComic[] | undefined }) => {
  return (
    <div className="space-y-[24px]">
    {comics && comics.length > 0 && <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-[480px]:grid-cols-1 gap-4 mt-10">
       {comics && comics.length > 0 && comics.map((comic) => (
        <ComicCard comic={comic} key={comic.id} />
       ))}
      </div>}

      {comics && comics.length === 0 && (
        <div className="h-40 bg-foreground center rounded-md">
          <p>No comics yet</p>
        </div>
      )}

     {comics && comics.length > 10 && <div className="center">
        <Link
          to="/comics"
          className="min-w-[200px] rounded-lg font-semibold py-4 px-4 mx-auto inline-flex items-center gap-2 justify-center btn-primary"
        >
          See More <ChevronRight size={20} />
        </Link>
      </div>}
    </div>
  );
};

export default ComicList;
