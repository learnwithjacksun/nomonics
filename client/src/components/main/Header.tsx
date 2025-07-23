import { navLinks, navLinksCreator } from "@/constants/data";
import { useMenuStore } from "@/store";
import {
  ChevronDown,
  ChevronRight,
  Coins,
  Menu,
  Plus,
  Sparkle,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { AnimatePresence } from "framer-motion";
import { ButtonWithLoader } from "../ui";
import { useState } from "react";
import { useAuth } from "@/hooks";

const Header = () => {
  const { user } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const menuLinks = user?.role === "creator" ? navLinksCreator : navLinks;
  return (
    <>
      <header className="bg-secondary/90 backdrop-blur-sm sticky top-0 z-50">
        <nav className="main grid md:grid-cols-3 grid-cols-2 md:h-[95px] h-[70px] items-center">
          <a href="/">
            <img src="/logo.svg" alt="logo" width={150} height={150} />
          </a>
          <ul className="hidden md:flex items-center justify-center gap-4">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white text-nowrap border-b-2 border-primary transition-all duration-300"
                      : "text-white text-nowrap border-b-2 border-transparent hover:border-primary transition-all duration-300"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-4 relative">
            <UserControl
              isMenuOpen={isMenuOpen}
              toggleDropDown={toggleDropDown}
            />
            {isDropDownOpen && <DropDown toggleDropDown={toggleDropDown} />}

            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="text-white" />
              ) : (
                <Menu className="text-white" />
              )}
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>{isMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
};

export default Header;

const UserControl = ({
  isMenuOpen,
  toggleDropDown,
}: {
  isMenuOpen: boolean;
  toggleDropDown: () => void;
}) => {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleDropDown}
        >
          <div className="center h-12 w-12 bg-primary rounded-full text-black/80 font-bold text-lg">
            {user.name.charAt(0)}
          </div>
          <ChevronDown className="text-white hidden md:block" />
        </div>
      )}

      {!user && (
        <div className="flex items-center gap-2">
          <Link
            to="/auth/login"
            className="px-4 py-2 text-white hidden md:block"
          >
            Login
          </Link>
          {!isMenuOpen && (
            <Link
              to="/auth/type"
              className="btn-primary btn h-10 rounded-lg px-4 text-nowrap"
            >
              Sign Up <ChevronRight size={18} />
            </Link>
          )}
        </div>
      )}
    </>
  );
};

const DropDown = ({ toggleDropDown }: { toggleDropDown: () => void }) => {
  const { user, logout, isLoading } = useAuth();
  return (
    <div
      className={`absolute top-full right-0 w-48 bg-white rounded-lg p-2 space-y-4 z-50`}
    >
      <div className="bg-foreground rounded-lg p-2 space-y-1">
        <p className="text-sm font-medium">{user?.name}</p>
        <p className="text-xs text-muted flex items-center gap-1 capitalize">
          <Sparkle size={16} className="text-primary" /> {user?.role}
        </p>
      </div>
      <ul className="">
        <li onClick={toggleDropDown} className="hover:bg-foreground rounded-lg">
          <Link to="/profile" className="text-sm flex items-center gap-2 p-2">
            {" "}
            <UserRound size={16} /> Profile
          </Link>
        </li>
        {user?.role === "creator" && (
          <li
            onClick={toggleDropDown}
            className="hover:bg-foreground rounded-lg"
          >
            <Link to="/creator/create" className="text-sm flex items-center gap-2 p-2">
              {" "}
              <Plus size={16} /> Create
            </Link>
          </li>
        )}
        {user?.role === "reader" && (
          <li
            onClick={toggleDropDown}
            className="hover:bg-foreground rounded-lg"
          >
            <Link to="/token" className="text-sm flex items-center gap-2 p-2">
              {" "}
              <Coins size={16} /> Purchase Token
            </Link>
          </li>
        )}
      </ul>
      <ButtonWithLoader
        initialText="Logout"
        loadingText="Logging out..."
        className="w-full bg-red-500 h-11 rounded-lg text-white"
        onClick={logout}
        loading={isLoading}
      />
    </div>
  );
};
