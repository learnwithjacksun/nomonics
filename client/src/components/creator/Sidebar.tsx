import { navLinksCreator } from "@/constants/data"
import { NavLink } from "react-router-dom"
import { ButtonWithLoader } from "../ui"

const Sidebar = () => {
  return (
    <div className="border-r border-line h-full flex flex-col">
      <div className="h-[70px] w-full bg-secondary">
        <div className="h-full w-full flex items-center">
          <img src="/logo.svg" alt="logo" width={150} height={150} />
        </div>
      </div>

      <ul className="space-y-4 w-[90%] mx-auto mt-10">
        {navLinksCreator.map((link, index) => (
          <li key={index}>
            <NavLink to={link.href} className={({isActive}) => isActive ? " flex items-center gap-2 bg-foreground text-secondary font-semibold rounded-md p-4" : "text-muted flex items-center gap-2 p-4 hover:bg-foreground rounded-md"}>
              <link.icon size={18} />
              <span className="text-sm">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ButtonWithLoader initialText="Logout" loadingText="Logging out..." onClick={() => {}} className="mt-auto bg-red-500 text-white h-11" />
    </div>
  )
}

export default Sidebar