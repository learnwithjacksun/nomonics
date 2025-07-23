import { CreatorComicCard } from "@/components/creator";
import { Wrapper } from "@/components/ui";
import { useAuth, useCreateComic } from "@/hooks";
import { DashboardLayout } from "@/layouts";
import { BarChart, BookOpen, Plus, UsersRound, Wallet } from "lucide-react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { name, earnings, totalComics } = user || {};
  const stats = [
    {
      title: "Total Earnings",
      value: earnings,
      icon: Wallet,
      isMoney: true,
    },
    {
      title: "Total Comics",
      value: totalComics,
      icon: BookOpen,
      isMoney: false,
    },
    {
      title: "Total Subscribers",
      value: 0,
      icon: UsersRound,
      isMoney: false,
    },
    {
      title: "Highest Views",
      value: 0,
      icon: BarChart,
      isMoney: false,
    },
  ];

  const { comics } = useCreateComic();
  const creatorComics = comics?.filter(
    (comic) => comic.creator.id === user?.id
  );
  const recentComics = creatorComics
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);
  return (
    <>
      <DashboardLayout
        title={`Hi, ${name}`}
        description="Welcome to your space of creativity"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background/50 shadow-xl shadow-primary/5 border border-line rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted">{stat.title}</p>
                <p className="text-lg font-bold">
                  {" "}
                  {stat.isMoney && "NGN"}{" "}
                  <CountUp
                    end={stat.value || 0}
                    separator=","
                    decimals={stat.isMoney ? 2 : 0}
                  />
                </p>
              </div>
              <div className="h-12 w-12 center rounded-md bg-primary/10 text-secondary">
                <stat.icon size={20} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-4 gap-4">
          <Link
            to="/creator/upload/type"
            className="btn gap-2 bg-secondary text-white px-4 py-3 rounded-md"
          >
            <Plus size={20} /> <span>Create Comic</span>
          </Link>
          <Link
            to="/creator/collections"
            className=" btn gap-2 bg-primary/10 text-secondary px-4 py-3 rounded-md"
          >
            <BookOpen size={20} /> <span> See Collections</span>
          </Link>
        </div>

        <Wrapper
          title="Recent Comics"
          linkTo="/creator/collections"
          linkText="See All"
        >
          {recentComics && recentComics.length > 0 && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {recentComics?.map((comic) => (
                <CreatorComicCard comic={comic} key={comic.id} />
              ))}
            </div>
          )}
          {creatorComics && creatorComics.length === 0 && (
            <div className="h-40 bg-foreground center rounded-md">
              <p>No comics yet</p>
            </div>
          )}
        </Wrapper>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
