import { Info } from "lucide-react";
const Void = () => {
  return (
    <div className="center pb-10 main">
      <div className="flex flex-col items-center gap-6 w-full rounded-3xl md:w-[480px] mx-auto bg-primary/10 p-10 ">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Info size={40} className="text-primary" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold">Sorry boss!</p>
          <p className="text-muted">
            Pardon the void. The page you are looking for does not exist, or the
            developer is lazy to add content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Void;
