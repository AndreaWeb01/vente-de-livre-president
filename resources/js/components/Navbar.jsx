import { useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import logo from "../assets/logo-presi.png";
import Button from "./Button";
import ProfilMenu from "./ProfilMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { url, props } = usePage();
  const userName = props?.auth?.user?.name || null;

  const menuLinks = [
    { name: "Livres", path: "/livres" },
    { name: "Auteur", path: "/auteurs" },
    { name: "Formations", path: "/formations" },
    { name: "Webinaire", path: "/webinaires" },
    { name: "Photothèque", path: "/phototheque" },
  ];

  // Vérifie si connecté (localStorage)
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Verrouille le scroll si menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    const previousPage = sessionStorage.getItem("previousPage") || "/";
    router.visit(previousPage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    router.visit("/"); // Retour accueil
  };

  const handleMonCompteClick = () => {
    sessionStorage.setItem("previousPage", url);
    router.visit("/public/dashboard");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/">
          <img src={logo} alt="logo" className="h-10 md:h-15" />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex lg:space-x-12 space-x-4">
          {menuLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`text-[18px] font-semibold transition-colors ${
                  url === link.path
                    ? "text-primary"
                    : "text-textColor hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Burger */}
        <div className="flex items-center gap-4">
          {!isLoggedIn || !userName ? (
            <Button
              label="Mon compte"
              color="red"
              ButtonClassName="text-white"
              onClick={handleMonCompteClick}
            />
          ) : (
            <ProfilMenu userName={userName} onLogout={handleLogout} />
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
          <Link
            key={link.name}
            href={link.path}
            onClick={() => setIsOpen(false)}
            className={`transition-colors ${
              url === link.path
                ? "text-primary"
                : "text-textColor hover:text-primary"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
