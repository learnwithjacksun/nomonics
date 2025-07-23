import { AxiosError } from "axios";
import { toast } from "sonner";

const onError = (error: Error | AxiosError) => {
  console.error(error);
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message || "An error occurred");
    throw error;
  } else {
    toast.error(error.message || "An error occurred");
    throw error;
  }
};

export default onError;
