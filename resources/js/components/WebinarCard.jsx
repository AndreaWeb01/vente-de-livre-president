import Button from "./Button";
import Profil from "./Profil"
import photoPresi from "../assets/photoPresi.png"

export default function WebinarCard({
  id,
  image,
  title,
  date,
  showButton = true, 
  buttonLabel = "Je m'inscris", 
}) {
  return (
    <div className="bg-bodyColor rounded-md w-100% md:w-75 p-4">
      <img
        src={image}
        alt={title}
        className="w-[100%] rounded-[8px]"
      />
      <h3 className="font-semibold mb-2 mt-5 text-[18px]">{title}</h3>
      <p className="text-[16px] mb-5">{date}</p>

      <Profil image={photoPresi} name="Mr Allou Boigny Nobel"/>
      {showButton && (
        <Button
        //   to={`/formations/${id}`}
          label={buttonLabel}
          color="orange"
          ButtonClassName="text-white"
        />
      )}
    </div>
  );
}
