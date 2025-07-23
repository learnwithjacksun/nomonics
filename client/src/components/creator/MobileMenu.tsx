import { navLinksCreator } from "@/constants/data";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ButtonWithLoader } from "../ui";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const MobileMenu = ({ onClose, isOpen }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className="fixed inset-0 z-80 md:hidden block">
      <motion.div
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       exit={{opacity: 0}}
       transition={{duration: 0.2}}
       className="absolute inset-0 bg-black/50" onClick={onClose} />

       
      <motion.div
      initial={{x: "-100%"}}
      animate={{x: 0}}
      exit={{x: "-100%"}}
      transition={{duration: 0.2}}
      className="absolute inset-y-0 h-full w-[70%] bg-background flex flex-col">
        <div className="h-[70px] w-full bg-secondary flex items-center justify-end px-4">
          <button className="h-11 w-11 center bg-primary/10 text-white rounded-full" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <ul className="space-y-4 w-[90%] mx-auto mt-10">
          {navLinksCreator.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center gap-2 bg-foreground text-secondary font-semibold rounded-md p-4"
                    : "text-muted flex items-center gap-2 p-4 hover:bg-foreground rounded-md"
                }
              >
                <link.icon size={18} />
                <span className="text-sm">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <ButtonWithLoader
          initialText="Logout"
          loadingText="Logging out..."
          onClick={() => {}}
          className="mt-auto bg-red-500 text-white h-11"
        />
      </motion.div>
    </div>
  );
};

export default MobileMenu;
