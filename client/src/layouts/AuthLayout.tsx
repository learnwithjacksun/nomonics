import { Link } from "react-router-dom";

const AuthLayout = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div
      style={{ backgroundImage: `url(/auth.svg)` }}
      className="h-[100dvh] overflow-y-scroll hide-scrollbar bg-cover bg-center bg-no-repeat py-14 md:py-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 main">
        <div className="flex items-center justify-center md:h-screen">
          <Link to="/">
            <img src="/logo.svg" alt="logo" width={300} />
          </Link>
        </div>
        <div className="center">
          <main className="bg-white h-fit md:w-[480px] w-full rounded-[30px] my-10 p-6 pb-8 shadow-2xl">
            <div className="space-y-2 text-center my-6">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-muted">{description}</p>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
