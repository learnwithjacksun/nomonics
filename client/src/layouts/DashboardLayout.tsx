import { Header, Sidebar } from "@/components/creator";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

const DashboardLayout = ({
  children,
  title,
  description,
  showHeader = true,
}: DashboardLayoutProps) => {
  return (
    <>
      <div className="flex h-[100dvh] overflow-hidden">
        <div className="md:w-1/5 w-full hide-scrollbar overflow-scroll md:block hidden">
          <Sidebar />
        </div>
        <div className="md:w-4/5 h-full w-full overflow-y-scroll hide-scrollbar">
         {showHeader && <Header />}
          <main className="h-full w-[90%] mx-auto space-y-6">
            <div className="pt-10">
             {title && <h2 className="text-xl font-semibold">{title}</h2>}
              {description && <p className="text-muted">{description}</p>}
            </div>
            <div className="pb-10 space-y-10">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
