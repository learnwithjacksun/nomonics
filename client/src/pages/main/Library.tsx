import { Breadcrumb, ComicList, Search } from "@/components/ui";
import { libraryFilter } from "@/constants/data";
import { useCreateComic } from "@/hooks";
import { MainLayout } from "@/layouts";
import clsx from "clsx";
import { useState } from "react";

const Library = () => {
  const { comics } = useCreateComic();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <>
      <MainLayout>
        <div className="main flex md:items-center flex-col md:flex-row gap-4 justify-between pt-10">
          <Breadcrumb title="Library" link="/library" />

          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Search by name"
          />
        </div>

        <div className="main flex flex-wrap gap-2 pt-4">
            {libraryFilter.map((category) => (
                <div key={category} className={clsx("border  cursor-pointer rounded-full px-4 py-1 text-sm capitalize", activeCategory === category ? "bg-secondary border-secondary text-white" : "bg-white text-main border-line")} onClick={() => handleCategoryClick(category)}>
                    <p>{category}</p>
                </div>
            ))}
        </div>
        <div className="main pb-10">
          <ComicList comics={comics}/>
        </div>
      </MainLayout>
    </>
  );
};

export default Library;
