import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  return (
    <aside className="w-64 bg-bodyColor  p-4  hidden lg:block">
      <ul>
        <MenuItem
          icon={<MdDashboard />}
          label="Dashboard"
          to="/dashboard"
          active={location.pathname === "/"}
        />
        <MenuItem icon={<FaClipboardList />} label="Commandes" to="/commandes" active={location.pathname === "/commandes"}/>
        <MenuItem icon={<FaBook />} label="Livre" to="/livreDash" active={location.pathname === "/livreDash"}/>
        <MenuItem icon={<FaGraduationCap />} label="Formation" to="/formationDash"  active={location.pathname === "/formationDash"} />
        <MenuItem icon={<FaChalkboard />} label="Webinaire" to="/webinaireDash"  active={location.pathname === "/webinaireDash"}/>
        <MenuItem icon={<FaUser />} label="Profil" to="/profil"  active={location.pathname === "/profil"} />
        <MenuItem icon={<FaSignOutAlt />} label="Déconnexion" to="/"  active={location.pathname === "/"} />
      </ul>
    </aside>
  );
}
