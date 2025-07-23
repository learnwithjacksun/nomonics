import { navLinks, navLinksCreator } from "@/constants/data";
import { useMenuStore } from "@/store";
import { Link, NavLink } from "react-router-dom";
import { ButtonWithLoader } from "../ui";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks";

const MobileMenu = () => {
  const { user } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const menuLinks = user?.role === "creator" ? navLinksCreator : navLinks;
  return (
    <motion.div
    initial={{ opacity: 0, y: "-100%" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: "-100%" }}
    // transition={{ duration: 0.3 }}
    className="fixed md:hidden min-h-[calc(100dvh-70px)] w-full top-[70px] left-0 bg-secondary/90 backdrop-blur-sm z-50 flex flex-col justify-between">
      <ul className="main w-full mt-4 space-y-2">
        {menuLinks.map((link) => (
          <li key={link.href} className=" block">
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                isActive
                  ? "text-primary block px-4 bg-primary/10 py-4"
                  : " block px-4 hover:bg-primary/10 p-4 transition-all duration-300 hover:text-primary text-white"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="main w-full mb-6">
        {!user && (
          <div className="flex items-center flex-col gap-2 w-full">
            <Link
              to="/auth/type"
              className="btn-primary w-full btn h-10 rounded-lg px-4 text-nowrap"
            >
              Create Account
            </Link>
            <Link
              to="/auth/login"
              className="bg-white w-full btn h-10 rounded-lg px-4 text-nowrap"
            >
              Sign In
            </Link>
          </div>
        )}

        {user && (
          <div>
            <div>
              <ButtonWithLoader
                initialText="Logout"
                loadingText="Logging out..."
                className="w-full bg-red-500 h-11 rounded-lg text-white"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
