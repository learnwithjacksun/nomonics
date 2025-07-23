import { useAuth } from "@/hooks";
import { ChevronDown, Plus, User } from "lucide-react";
import { ButtonWithLoader } from "../ui";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ProfileCard = () => {
  const { user } = useAuth();
  const { name } = user || {};
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer">
        <p className="hidden md:block">{name}</p>
        <div className="h-10 w-10 center font-semibold rounded-full text-white overflow-hidden">
        <img
                src={ user?.avatar || `https://api.dicebear.com/9.x/initials/svg?backgroundColor=4b2e00&seed=${user?.name}&fontSize=40`}
                alt=""
                className="w-full h-full object-cover"
              />
        </div>
        <ChevronDown size={20} className="hidden md:block" />
      </div>

      <AnimatePresence>
      {isOpen && <Dropdown />}
      </AnimatePresence>
    </div>
  );
};

export default ProfileCard;

const Dropdown = () => {
  const { logout, isLoading, user } = useAuth();

  return (
    <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    className="absolute top-full md:right-0 -right-6 min-w-[200px] bg-white text-main p-2 rounded-md shadow-md border border-line overflow-hidden z-50">
      <div className="p-4 rounded-md bg-foreground">
        <h3 className="text-sm font-semibold">{user?.name}</h3>
        <p className="text-sm text-muted">{user?.email}</p>
      </div>

      <ul>
        <li>
          <Link to="/creator/profile" className="w-full flex items-center gap-2 p-3 rounded-md hover:bg-foreground text-sm">
            <User size={20} />
            <span>User Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/creator/upload/type" className="w-full flex items-center gap-2 p-3 rounded-md hover:bg-foreground text-sm">
            <Plus size={20} />
            <span>Upload Comic</span>
          </Link>
        </li>
      </ul>

      <ButtonWithLoader
        initialText="Logout"
        loadingText="Logging out..."
        className="w-full h-10 font-semibold bg-red-500 mt-4 rounded-sm text-sm text-white"
        onClick={logout}
        loading={isLoading}
      />
    </motion.div>
  );
};
