import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  linkTo?: string;
  linkText?: string;
}

const Wrapper = ({ children, title, linkTo, linkText }: WrapperProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className=" font-semibold">{title}</p>
        {linkTo && linkText && (
          <Link to={linkTo} className="text-secondary flex items-center gap-2">
            {linkText} <ChevronRight size={20} />
          </Link>
        )}
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Wrapper;
