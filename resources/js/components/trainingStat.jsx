// TrainingStat.jsx
import trainingImg from "../assets/trainingImg.png";
import { useTranslation } from "react-i18next";

export default function TrainingStat() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full flex justify-end">
      <img
        src={trainingImg}
        alt={t("trainings.statImageAlt")}
        className=" h-[250px] mt-6 sm:h-[200px] md:h-[250px] lg:h-[300px] w-auto object-cover rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
      />

      <div className="absolute left-20 -bottom-10 bg-bodyColor px-4 py-3 rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
        <p className="text-xl text-center sm:text-2xl md:text-3xl font-bold text-textColor">
          +35
        </p>
        <p className="text-sm text-center sm:text-base md:text-lg font-medium text-textColor">
          {t("trainings.statPeople")}
        </p>
      </div>
    </div>
  );
}
