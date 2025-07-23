import { ButtonWithLoader, InputWithIcon } from "@/components/ui";
import { AuthLayout } from "@/layouts";
import { Lock, LockOpen, MailIcon, User } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schemas/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks";

const Register = () => {
  const { type } = useLocation().state as { type: string };
  const { registerUser, isLoading } = useAuth();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [agreeToAge, setAgreeToAge] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (!agreeToAge) {
      toast.error("Please agree to the age terms");
      return;
    }

    registerUser(data, agreeToMarketing, type === "reader" ? "reader" : "creator");
  };

  if (!type) {
    return <Navigate to="/auth/type" />;
  }

  return (
    <AuthLayout
      title="Create Account"
      description={`You are registering as a ${
        type.charAt(0).toUpperCase() + type.slice(1)
      }`}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputWithIcon
          icon={<User size={20} />}
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputWithIcon
          icon={<MailIcon size={20} />}
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          {...register("email")}
          error={errors.email?.message}
        />
        <div className="space-y-1">
          <InputWithIcon
            icon={<LockOpen size={20} />}
            type="password"
            label="Password"
            placeholder="Minimum 8 characters"
            {...register("password")}
            error={errors.password?.message}
          />
          <p className="text-xs text-muted">
            At least 8 characters; lower and uppercase letters, numbers and
            symbols
          </p>
        </div>
        <InputWithIcon
          icon={<Lock size={20} />}
          type="password"
          label="Confirm Password"
          placeholder="Minimum 8 characters"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <div className="space-y-4">
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              id="terms"
              className="accent-secondary mt-1"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label htmlFor="terms" className="text-xs md:text-sm text-muted">
              I agree to Nomomics{" "}
              <Link
                to="/terms-of-service"
                className="text-secondary font-semibold"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-secondary font-semibold"
              >
                Privacy Policy
              </Link>{" "}
              by creating my account
            </label>
          </div>
          <div className="flex gap-2 items-start">
            <input
              type="checkbox"
              id="marketing"
              className="accent-secondary mt-1"
              checked={agreeToMarketing}
              onChange={() => setAgreeToMarketing(!agreeToMarketing)}
            />
            <label
              htmlFor="marketing"
              className="text-xs md:text-sm text-muted"
            >
              Send me special offers, learning tips, and personalized
              recommendations
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="age"
              className="accent-secondary"
              checked={agreeToAge}
              onChange={() => setAgreeToAge(!agreeToAge)}
            />
            <label htmlFor="age" className="text-xs md:text-sm text-muted">
              You are above 18 years old?
            </label>
          </div>
        </div>
        <ButtonWithLoader
          type="submit"
          className="w-full btn-primary h-11 rounded-full"
          initialText="Create Account"
          loadingText="Creating account..."
          loading={isLoading}
        />

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-secondary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
