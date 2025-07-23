import { Comment } from "@/components/main";
import { MainLayout } from "@/layouts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Episode() {
  return (
    <>
      <MainLayout>
        <div className="space-y-10 pb-10">
          <div className="bg-[#fae8e6] md:py-0">
            <div className="min-h-[160px]  main flex items-center md:justify-between justify-center">
              <div className="hidden md:block">
                <button className="bg-secondary h-10 px-4 text-white rounded-md">
                  <ChevronLeft size={20} />
                  <span>Episode 2</span>
                </button>
              </div>
              <div className="text-center space-2">
                <h2 className="text-2xl md:text-4xl font-bold">Spider Man</h2>
                <p>Episode 1</p>
              </div>
              <div className="hidden md:block">
                <button className="bg-secondary h-10 px-4 text-white rounded-md">
                  <span>Episode 3</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="main flex md:hidden gap-4 pb-6">
              <button className="bg-secondary h-10 w-full text-white rounded-md">
                <ChevronLeft size={20} />
                <span>Episode 2</span>
              </button>

              <button className="bg-secondary h-10 w-full text-white rounded-md">
                <span>Episode 3</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <button className="w-full layout border border-secondary text-secondary h-12 rounded-md">
            Watch Advert to receive coin
          </button>

          <div className="layout">
            <img
              src="/comic.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="main border-t border-line py-10">
            <h3 className="text-xl font-semibold">Comments</h3>

            <div className="space-y-4 mt-6">
              <Comment/>
              <Comment/>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
