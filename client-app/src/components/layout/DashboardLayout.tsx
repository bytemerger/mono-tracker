import SideBar from "./SideBar";
import menuImage from "../../assets/menuIcon.png";
import { useContext, useState } from "react";


interface props {
  children: React.ReactNode;
}
function DashboardLayout({ children }: props) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div className="flex relative">
      <SideBar menuState={menuOpen} setMenuState={setMenuOpen} />
      <div
        className={`bg-white mt-2 pt-11 md:px-16 px-4 relative w-full`}
      >
        <div
          className="absolute md:hidden top-12 right-3 cursor-pointer"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <img src={menuImage} />
        </div>
        {children}
      </div>
    </div>
  );
}
export default DashboardLayout;
