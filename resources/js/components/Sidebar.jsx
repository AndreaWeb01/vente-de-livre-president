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
      <ul>
        <MenuItem
          icon={<MdDashboard />}
          label="Dashboard"
          to="/dashboard"
          active={url === "/dashboard"}
        />
        <MenuItem icon={<FaClipboardList />} label="Commandes" to="/commandes" active={url === "/commandes"}/>
        <MenuItem icon={<FaBook />} label="Livre" to="/livreDash" active={url === "/livreDash"}/>
        <MenuItem icon={<FaGraduationCap />} label="Formation" to="/formationDash" active={url === "/formationDash"} />
        <MenuItem icon={<FaChalkboard />} label="Webinaire" to="/webinaireDash" active={url === "/webinaireDash"}/>
        <MenuItem icon={<FaUser />} label="Profil" to="/profil" active={url === "/profil"} />
        <MenuItem icon={<FaSignOutAlt />} label="Déconnexion" to="/" active={url === "/"} />
      </ul>
    </aside>
  );
}
