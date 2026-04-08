import { usePage } from "@inertiajs/react";
import Button from "./Button";
import Profil from "./Profil"
import photoPresi from "../assets/photoPresi.png"
import defaultWebinarImage from "../assets/webinar.jpg"

export default function WebinarCard({
  id,
  photo,
  titre,
  date,
  showButton = true, 
  buttonLabel = "Je m'inscris", 
}) {
  const { auth } = usePage().props;
  const isAuth = auth && auth.user !== null;
  const targetRoute = isAuth 
    ? `/public/panier/formations/${id}` 
    : `/login`; // Les formations/webinaires demandent un compte
  const method = isAuth ? "post" : "get";

  return (
    <div className="bg-bodyColor rounded-md w-100% md:w-75 p-4">
      <img
        src={photo ? `/storage/${photo}` : defaultWebinarImage}
        alt={titre}
        className="w-[100%] rounded-[8px]"
      />
      <h3 className="font-semibold mb-2 mt-5 text-[18px]">{titre}</h3>
      <p className="text-[16px] mb-5">{date}</p>

      <Profil image={photoPresi} name="Mr Allou Boigny Nobel"/>
      {showButton && (
        <Button
          to={targetRoute}
          label={buttonLabel}
          methode={method}
          color="orange"
          ButtonClassName="text-white"
        />
      )}
    </div>
  );
}
