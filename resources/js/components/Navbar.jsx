import { useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import logo from "../assets/logo-presi.png";
import Button from "./Button";
import ProfilMenu from "./ProfilMenu";
import { useTranslation } from "react-i18next";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, i18n } = useTranslation();

  const { url, props } = usePage();
  const userName = props?.auth?.user?.name || null;

  const menuLinks = [
    { name: t("common.books"), path: "/livres" },
    { name: t("common.authors"), path: "/auteurs" },
    { name: t("common.trainings"), path: "/formations" },
    { name: t("common.webinar"), path: "/webinaires" },
    { name: t("common.phototheque"), path: "/phototheque" },
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
          {/* Sélecteur de langue */}
          <select
            className="border rounded px-2 py-1 text-lg"
            value={i18n.language?.substring(0,2) || "fr"}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            aria-label="Language"
          >
            <option value="fr" aria-label="Français" title="Français">
              🇫🇷 Français
            </option>
            <option value="en" aria-label="English" title="English">
              🇬🇧 English
            </option>
            <option value="es" aria-label="Español" title="Español">
              🇪🇸 Español
            </option>
          </select>

          {!isLoggedIn || !userName ? (
            <Button
              label={t("common.account")}
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
            {isOpen ? t("common.close") : t("common.menu")}
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
