import { ButtonWithLoader } from "@/components/ui";
import { useAuth } from "@/hooks";
import AuthLayout from "@/layouts/AuthLayout";
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyEmail, isLoading } = useAuth();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; 

    const newCode = [...code];
    newCode[index] = value.slice(-1); 
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    const newCode = paste.split("");
    setCode((prev) => prev.map((_, i) => newCode[i] ?? ""));

    const lastIndex = Math.min(paste.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = code.join("");
    console.log("Verification Code:", joinedCode);
    verifyEmail(joinedCode);
  };

  return (
    <AuthLayout
      title="Verification Code"
      description={`Enter the 4-digit code sent to ${email} to continue`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center items-center gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="p-2 text-2xl h-10 w-10 font-bold text-center rounded-md border border-line focus:border-primary focus:ring-2 focus:ring-primary/30"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <ButtonWithLoader
          type="submit"
          className="w-full btn-primary h-11 rounded-full"
          initialText="Verify"
          loadingText="Verifying..."
          loading={isLoading}
        />

        <div className="text-center">
          <p className="text-sm text-muted">
            Didn't get the OTP?{" "}
            <span className="text-secondary font-semibold">Resend</span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Verify;
