import { ExistingUpload, NewUpload } from "@/components/creator";
import { DashboardLayout } from "@/layouts";
import { useSearchParams } from "react-router-dom";

const Create = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <DashboardLayout
      title={`${
        type === "new" ? "Uploading New Comic" : "Uploading to Existing Comic"
      }`}
    >
      {type === "new" && <NewUpload />}
      {type === "existing" && <ExistingUpload />}
    </DashboardLayout>
  );
};

export default Create;
