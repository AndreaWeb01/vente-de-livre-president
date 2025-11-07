import { usePage } from "@inertiajs/react";
import MenuItem from "./MenuItem";
import {
  FaUserCircle,
  FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function Sidebar() {
  const { url } = usePage();

  return (
    <aside className="w-64 bg-bodyColor p-4 hidden lg:block">
      <ul className="rounded-lg space-y-2">
        <MenuItem 
          
          icon={<MdDashboard />}
          label="Dashboard"
          to="/public/dashboard"
          active={url === "public/dashboard"}

        />
        <MenuItem 
        icon={<FaClipboardList />}
        label="Commandes" 
        to="/public/commandes" 
        active={url === "/public/commandes"}/>

        <MenuItem 
        icon={<FaBook />} 
        label="Mes livres" 
        to="/mes-livres" 
        active={url === "/mes-livres"}/>
        <MenuItem icon={<FaGraduationCap />} label="Mes formations" to="/mes-formations" active={url === "/mes-formations"} />
        <MenuItem icon={<FaChalkboard />} label="Mes webinaires" to="/mes-webinaire" active={url === "/mes-webinaire"}/>
        <MenuItem icon={<FaUser />} label="Profil" to="/settings/profile" active={url === "/settings/profile"} />
        <MenuItem icon={<FaSignOutAlt />} label="Déconnexion" to="/" active={url === "/"} />
      </ul>
    </aside>
  );
}
