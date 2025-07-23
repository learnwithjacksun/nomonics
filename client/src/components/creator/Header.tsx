import { ArrowLeft, Bell, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/creator/dashboard";
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/50 backdrop-blur-sm">
        <nav
          className={`flex items-center h-[70px] w-[90%] mx-auto ${
            isDashboard ? "justify-between" : "justify-between"
          }`}
        >
          <div className={`${isDashboard ? "hidden" : "block"}`}>
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 center rounded-full bg-primary/10 text-secondary"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

         {isDashboard && <div className="text-xl visible md:invisible">
            🔥 
          </div>}

          <div className="flex items-center gap-4">
            <div className="cursor-pointer h-10 w-10 center rounded-full bg-foreground text-gray-500">
              <Bell size={20} />
            </div>
            <ProfileCard />
            <div className="md:hidden block cursor-pointer">
              <Menu onClick={() => setIsMobileMenuOpen(true)} />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            isOpen={isMobileMenuOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
