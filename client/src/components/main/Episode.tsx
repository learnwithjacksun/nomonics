import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function Episode({episode}: {episode: IEpisode}) {
  return (
    <div className="flex items-center gap-4 ">
    <div className="h-20 w-20 overflow-hidden rounded-md">
      <img
        src={episode.coverImage}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
    <div className="space-y-2">
      <div>
        <h3 className="text-lg font-bold">Episode {episode.episodeNumber}</h3>
        <p className="text-sm text-muted">{episode.createdAt}</p>
      </div>
      <div className="center gap-4">
        <button>
          <Eye size={20} />
          <span>{episode.views.count}</span>
        </button>
        <button>
          <ThumbsUp size={20} />
          <span>{episode.likes.count}</span>
        </button>
        <button>
          <ThumbsDown size={20} />
          <span>{episode.dislikes.count}</span>
        </button>
      </div>
    </div>
  </div>
  )
}
