import { useState, useRef, useEffect } from "react";
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
import MenuItem from "./MenuItem";

export default function ProfilMenu({ onLogout, userName }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Ferme le menu quand on clique à l’extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Bouton profil */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
      >
        <FaUserCircle className="text-green-600 text-2xl" />
        <span className="font-semibold text-gray-800">{userName}</span>
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
          <ul className="flex flex-col">
            <MenuItem icon={<MdDashboard />} label="Tableau de bord" to="/dashboard" />
            <MenuItem icon={<FaClipboardList />} label="Commandes" to="/commandes" />
            <MenuItem icon={<FaBook />} label="Livre" to="/livreDash" />
            <MenuItem icon={<FaGraduationCap />} label="Formation" to="/formationDash" />
            <MenuItem icon={<FaChalkboard />} label="Webinaire" to="/webinaireDash" />
            <MenuItem icon={<FaUser />} label="Profil" to="/profil" />

            <hr className="my-2" />

            {/* ✅ Bouton Déconnexion */}
            <li>
              <button
                onClick={onLogout} // <-- C’est ici la clé
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
