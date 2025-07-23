import { MainLayout } from "@/layouts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Comment } from "@/components/main";
import { useParams, useSearchParams } from "react-router-dom";
import { useCreateComic } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { PDFViewer } from "@/components/ui";

const Preview = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { comics, getEpisodesByComicId } = useCreateComic();
  const episodeNumber = searchParams.get("ep");
  const comic = comics?.find((comic) => comic.id === id);
  const { data: comicEpisodes } = useQuery<IEpisode[]>({
    queryKey: ["episodes", comic?.id],
    queryFn: () => getEpisodesByComicId(comic?.id as string),
  });

  const episode = comicEpisodes?.find(
    (episode) => episode.episodeNumber === Number(episodeNumber)
  );

  if (!episode) return null;

  const previousEpisodeNumber = episode.episodeNumber - 1;
  const nextEpisodeNumber = episode.episodeNumber + 1;

  const previousEpisode = comicEpisodes?.find(
    (episode) => episode.episodeNumber === previousEpisodeNumber
  );

  const nextEpisode = comicEpisodes?.find(
    (episode) => episode.episodeNumber === nextEpisodeNumber
  );

  const handleEpisodeChange = (episodeNumber: number) => {
    setSearchParams({ ep: episodeNumber.toString() });
  };

  const isOnlyOneEpisode = comicEpisodes?.length === 1;

  return (
    <>
      <MainLayout>
        <div className="space-y-10 pb-10">
          <div className="bg-[#fae8e6] md:py-0">
            <div className="min-h-[160px]  main flex items-center md:justify-between justify-center">
              {!isOnlyOneEpisode && (
                <div className="hidden md:block">
                  <button
                    onClick={() =>
                      handleEpisodeChange(
                        previousEpisode?.episodeNumber as number
                      )
                    }
                    className="bg-secondary h-10 px-4 text-white rounded-md"
                  >
                    <ChevronLeft size={20} />
                    <span>Episode {previousEpisode?.episodeNumber}</span>
                  </button>
                </div>
              )}
              <div className="flex-1">
                <div className="text-center space-2">
                  <h2 className="text-2xl md:text-4xl font-bold">
                    {comic?.title}
                  </h2>
                  <p>Episode {episodeNumber}</p>
                </div>
              </div>
              {!isOnlyOneEpisode && (
                <div className="hidden md:block">
                  <button
                    onClick={() =>
                      handleEpisodeChange(nextEpisode?.episodeNumber as number)
                    }
                    className="bg-secondary h-10 px-4 text-white rounded-md"
                  >
                    <span>Episode {nextEpisode?.episodeNumber}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
            {!isOnlyOneEpisode && (
              <div className="main flex md:hidden gap-4 pb-6">
                <button
                  onClick={() =>
                    handleEpisodeChange(
                      previousEpisode?.episodeNumber as number
                    )
                  }
                  className="bg-secondary h-10 w-full text-white rounded-md"
                >
                  <ChevronLeft size={20} />
                  <span>Episode {previousEpisode?.episodeNumber}</span>
                </button>

                <button
                  onClick={() =>
                    handleEpisodeChange(nextEpisode?.episodeNumber as number)
                  }
                  className="bg-secondary h-10 w-full text-white rounded-md"
                >
                  <span>Episode {nextEpisode?.episodeNumber}</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          <button className="w-full layout border border-secondary text-secondary h-12 rounded-md">
            Watch Advert to receive coin
          </button>

          <div className="bg-primary/10">
            <PDFViewer fileUrl={episode?.pdf as string} />
          </div>

          <div className="main border-t border-line py-10">
            <h3 className="text-xl font-semibold">Comments</h3>

            <div className="space-y-4 mt-6">
              <Comment />
              <Comment />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Preview;
