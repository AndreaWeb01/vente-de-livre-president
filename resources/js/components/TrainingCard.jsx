import Button from "./Button";

export default function TrainingCard({
  id,
  image,
  title,
  description,
  showButton = true, 
  buttonLabel = "Voir la formation", 
}) {
  return (
    <div className="bg-bodyColor rounded-md w-100% md:w-75 p-4">
      <img
        src={image}
        alt={title}
        className="w-[100%] rounded-[8px]"
      />
      <h3 className="font-semibold mb-2 mt-5 text-[18px]">{title}</h3>
      <p className="text-[16px] mb-5">{description}</p>

      {/* on affiche le bouton seulement si showButton est true */}
      {showButton && (
        <Button
          to={`/formations/${id}`}
          label={buttonLabel}
          color="orange"
          ButtonClassName="text-white"
        />
      )}
    </div>
  );
}
