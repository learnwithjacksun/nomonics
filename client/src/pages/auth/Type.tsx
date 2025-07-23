import { ButtonWithLoader } from "@/components/ui";
import { accountTypes } from "@/constants/data";
import { AuthLayout } from "@/layouts";
import { Circle, CircleCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Type = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      setLoading(true);
      setTimeout(() => {
        navigate("/auth/register", { state: { type: selectedType } });
      }, 1000);
    }
  };



  return (
    <AuthLayout title="Account Type" description="Choose your account type to continue">
      <div className="space-y-4">
        {accountTypes.map((type) => (
          <div
            key={type.label}
            className={`flex cursor-pointer items-center justify-between gap-6 border border-line rounded-2xl p-4 ${
              selectedType === type.label ? "bg-foreground ring-primary/30 border-secondary ring-4" : ""
            }`}
            onClick={() => handleSelectType(type.label)}
          >
            <div className="space-y-1">
              <h2 className="text-md font-medium capitalize">{type.label}</h2>
              <p className="text-xs md:text-sm text-muted">
                {type.description}
              </p>
            </div>

            {selectedType === type.label ? (
              <CircleCheck size={18} className="flex-shrink-0 text-secondary" />
            ) : (
              <Circle size={18} className="flex-shrink-0 text-muted" />
            )}
          </div>
        ))}

        <ButtonWithLoader
          type="button"
          disabled={!selectedType}
          className="w-full btn-primary h-11 rounded-full"
          initialText="Continue"
          loadingText="Loading..."
          onClick={handleContinue}
          loading={loading}
        />
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-secondary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Type;
