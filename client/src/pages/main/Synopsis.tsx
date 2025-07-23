import { EpisodeCard } from "@/components/main";
import { useCreateComic } from "@/hooks";
import { MainLayout } from "@/layouts";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const Synopsis = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { comics, getEpisodesByComicId } = useCreateComic();
  const episodeNumber = searchParams.get("ep");
  const comic = comics?.find((comic) => comic.id === id);
  const { data: comicEpisodes } = useQuery<IEpisode[]>({
    queryKey: ["episodes", comic?.id],
    queryFn: () => getEpisodesByComicId(comic?.id as string),
  });

  if (!comic) {
    return (
      <MainLayout>
        <div className="main">
          <div className="h-40 bg-foreground center rounded-md my-10">
            <p>Comic not found</p>
          </div>
        </div>
      </MainLayout>
    )
  };

  const otherEpisodes = comicEpisodes?.filter(
    (episode) => episode.episodeNumber !== Number(episodeNumber)
  );
  const episode = comicEpisodes?.find(
    (episode) => episode.episodeNumber === Number(episodeNumber)
  );

  const handleEpisodeChange = (episodeNumber: number) => {
    setSearchParams({ ep: episodeNumber.toString() });
  };


  return (
    <>
      <MainLayout>
        <div>
          <div className="h-[370px] w-full overflow-hidden rounded-t-xl bg-primary/5">
            <img
              src={episode?.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="main grid md:grid-cols-2 grid-cols-1 rounded-t-xl overflow-hidden -translate-y-10 shadow-xl min-h-[500px]">
            <div className="col-span-1 bg-[#fae8e6] p-10 space-y-10 flex flex-col">
              <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-4xl font-bold">
                  {comic.title}
                </h3>
                <p className="text-sm md:text-lg text-muted">
                  Episode {episodeNumber}
                </p>
              </div>

              <p className="text-center">{episode?.description}</p>
              <div className="space-y-10 ms-0 mt-auto">
                <div className="center">
                  <Link
                    to={`/preview/${comic?.id}?ep=${episodeNumber}`}
                  >
                    <button className="bg-secondary text-white px-4 py-2 rounded-md">
                      Episode {episodeNumber}
                      <ChevronRight size={20} />
                    </button>
                  </Link>
                </div>

                <div className="center gap-4">
                  <button>
                    <Eye size={20} />
                    <span>{episode?.views.count}</span>
                  </button>
                  <button>
                    <ThumbsUp size={20} />
                    <span>{episode?.likes.count}</span>
                  </button>
                  <button>
                    <ThumbsDown size={20} />
                    <span>{episode?.dislikes.count}</span>
                  </button>
                  <button>
                    <Bookmark size={20} />
                  </button>
                  <button>
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white p-10 h-full flex flex-col">
              <div>
                {otherEpisodes?.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}

                {otherEpisodes?.length === 0 && (
                  <div className="h-40 bg-foreground center rounded-md">
                    <p>No new episodes yet</p>
                  </div>
                )}
              </div>

              {otherEpisodes && otherEpisodes.length > 1 && (
                <div className="center gap-4 md:mt-auto mt-6">
                  <button
                    className="h-10 w-10 center bg-secondary text-white rounded-full"
                    onClick={() =>
                      handleEpisodeChange(Number(episodeNumber) - 1)
                    }
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="center gap-2">
                    <div className="border border-secondary text-secondary h-10 w-10 rounded-full center">
                      1
                    </div>
                    <div className="border border-secondary text-secondary h-10 w-10 rounded-full center">
                      2
                    </div>
                  </div>
                  <button
                    className="h-10 w-10 center bg-secondary text-white rounded-full"
                    onClick={() =>
                      handleEpisodeChange(Number(episodeNumber) + 1)
                    }
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

       
      </MainLayout>
    </>
  );
};

export default Synopsis;
