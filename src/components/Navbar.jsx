import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-presi.png";
import Button from "./Button";
import ProfilMenu from "./ProfilMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuLinks = [
    { name: "Livres", path: "/livres" },
    { name: "Auteur", path: "/auteur" },
    { name: "Formations", path: "/formations" },
    { name: "Webinaire", path: "/webinaire" },
    { name: "Photothèque", path: "/phototheque" },
  ];

  // Vérifie si connecté (persistance avec localStorage)
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // ✅ Sauvegarde l'état

    const previousPage = sessionStorage.getItem("previousPage") || "/";
    navigate(previousPage);
};

const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem("isLoggedIn"); // ✅ Supprime la persistance
  navigate("/"); // Retour à l’accueil
};


  const handleMonCompteClick = () => {
    // On sauvegarde la page actuelle avant d’aller à /login
    sessionStorage.setItem("previousPage", location.pathname);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex justify-between items-center fixed w-full top-0 z-50 p-4 bg-white">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="logo" className="h-10 md:h-15" />
        </NavLink>

        {/* Menu desktop */}
        <ul className="hidden md:flex lg:space-x-12 space-x-4">
          {menuLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[18px] font-semibold transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-textColor hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + Burger */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Button
              label="Mon compte"
              color="green"
              ButtonClassName="text-white"
              onClick={handleMonCompteClick}
            />
          ) : (
            <ProfilMenu userName="Yabo" onLogout={handleLogout} />
          )}

          {/* Burger menu mobile */}
          <button
            className="md:hidden block focus:outline-none text-2xl bg-primary text-white px-3 py-1.5 rounded-[5px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center space-y-8 text-xl font-semibold transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {menuLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-textColor hover:text-primary"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
