import { CreatorComicCard } from "@/components/creator";
import { Search } from "@/components/ui";
import { categoryFilter } from "@/constants/data";
import { useAuth, useCreateComic } from "@/hooks";
import { DashboardLayout } from "@/layouts";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  const { user } = useAuth();
  const { comics } = useCreateComic();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const creatorComics = comics?.filter(
    (comic) => comic.creator.id === user?.id
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  return (
    <DashboardLayout
      title="My Collections"
      description="View and Manage your collections"
    >
      <Link
        to="/creator/upload/type"
        className="md:hidden flex items-center justify-center absolute bottom-4 right-4 z-50 bg-primary/10 text-secondary h-14 w-14 rounded-full"
      >
        <Plus />
      </Link>
      <div className="space-y-6">
        <div className="flex md:flex-row flex-col-reverse md:items-center items-end justify-between gap-4">
          <div className="w-full md:w-auto">
            <Search
              search={search}
              setSearch={setSearch}
              placeholder="Search by title"
            />
          </div>
          <Link
            to="/creator/upload/type"
            className="bg-primary/10 text-secondary hidden md:flex items-center justify-center text-sm font-semibold gap-2 w-[170px] h-11 rounded-md"
          >
            <Plus size={20} />
            <span>Upload Comic</span>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryFilter.map((category) => (
            <div
              key={category}
              className={clsx(
                "border  cursor-pointer rounded-full px-4 py-1 md:text-sm text-xs capitalize",
                activeCategory === category
                  ? "bg-secondary border-secondary text-white"
                  : "bg-white text-main border-line"
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <p>{category}</p>
            </div>
          ))}
        </div>
      </div>

     {creatorComics && creatorComics.length > 0 && <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {creatorComics?.map((comic) => (
          <CreatorComicCard comic={comic} key={comic.id} />
        ))}
      </div>}

      {creatorComics && creatorComics.length === 0 && (
        <div className="h-40 bg-foreground center rounded-md">
          <p>No comics yet</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Collections;
