import { Reply, ThumbsUp } from "lucide-react";

export default function Comment() {
  return (
    <>
    <div className="space-y-2 border-b border-line pb-6 last:border-0">
                {/* comment */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 center rounded-full overflow-hidden">
                      <img
                        src="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Jackson"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-md">Gift Jacksun</p>
                    <p className="text-muted text-sm">2mins ago</p>
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore dolores quo ad modi quod id amet, ratione blanditiis
                    non numquam.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="cursor-pointer flex items-center gap-2 text-sm">
                      <span> 2 likes</span>
                    </div>
                    <div className="cursor-pointer flex gap-2  text-sm">
                      <Reply size={18} className="" />
                      <span> Reply</span>
                    </div>
                    <button className="ml-7 text-gray-500">
                      <ThumbsUp size={18} className="-translate-y-[2px]" />
                    </button>
                  </div>
                </div>

                {/* reply */}

                <div className="space-y-2 w-[90%] ml-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 center rounded-full overflow-hidden">
                      <img
                        src="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=John"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="font-semibold text-md">John Doe</p>
                    <p className="text-muted text-sm">2mins ago</p>
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore dolores quo ad modi quod id amet, ratione blanditiis
                    non numquam.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="cursor-pointer flex items-center gap-2 text-sm">
                      <span> 2 likes</span>
                    </div>
                    <div className="cursor-pointer flex gap-2  text-sm">
                      <Reply size={18} className="" />
                      <span> Reply</span>
                    </div>
                    <button className="ml-7 text-gray-500">
                      <ThumbsUp size={18} className="-translate-y-[2px]" />
                    </button>
                  </div>
                </div>
              </div>
    </>
  )
}
