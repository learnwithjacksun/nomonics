import api from "@/config/api";
import onError from "@/helpers/axiosError";
import type { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const useAuth = () => {
  const { user, token, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckAuth, setIsCheckAuth] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (
    data: RegisterSchema,
    sendEmail: boolean,
    role: "reader" | "creator"
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        sendPromotionalEmails: sendEmail,
        role,
      };
      const response = await api.post("/auth/register", payload);
      if (response.data.success) {
        toast.success(response.data.message, {
          description: "Please check your email for verification",
        });

        navigate(`/auth/verify?email=${data.email}`);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/verify-user", {otp: code });
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setToken(response.data.token);
        if (response.data.user.role === "creator") {
          navigate("/creator/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/resend-verification-email", { email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        toast.success(response.data.message);
        if (response.data.user.role === "creator") {
          navigate("/creator/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/logout");
      if (response.data.success) {
        setUser(null);
        setToken(null);
        toast.success(response.data.message);
        navigate("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = useCallback(async () => {
    setIsCheckAuth(true);
    try {
      const response = await api.get("/auth/check");
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
      } else {
        setUser(null);
        setToken(null);
        toast.error(response.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      console.error(error);
    } finally {
      setIsCheckAuth(false);
    }
  }, [setUser, setToken, navigate]);

  return {
    user,
    token,
    setUser,
    setToken,
    registerUser,
    verifyEmail,
    isLoading,
    isCheckAuth,
    getUser,
    loginUser,
    logout,
    resendVerificationEmail,
  };
};

export default useAuth;
