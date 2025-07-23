import { DashboardLayout } from "@/layouts";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UploadType = () => {
  const navigate = useNavigate();

  const handleNewComic = (value: string) => {
    navigate(`/creator/upload?type=${value}`);
  };
  return (
    <DashboardLayout>
      <div className="h-full w-full md:w-[400px] mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-secondary">
            Choose Upload Type
          </h2>
          <p className="text-muted">
            Select the type of comic you want to upload
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div
            onClick={() => handleNewComic("new")}
            className="flex items-center cursor-pointer justify-between border border-line p-4 rounded-md"
          >
            <div>
              <p className="text-md font-semibold">New Comic</p>
              <p className="text-muted">Start a new comic series</p>
            </div>

            <ChevronRight size={20} />
          </div>
          <div
            onClick={() => handleNewComic("existing")}
            className="flex items-center cursor-pointer justify-between border border-line p-4 rounded-md"
          >
            <div>
              <p className="text-md font-semibold">Existing Comic</p>
              <p className="text-muted">Continue an existing comic series</p>
            </div>

            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadType;
