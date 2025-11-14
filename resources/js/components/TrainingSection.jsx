import TrainingCard from "./TrainingCard";
import formationCover from "../assets/formationCover.jpg";
import formationCover2 from "../assets/formationCover2.jpg";
import formationCover3 from "../assets/formationCover3.jpg";
import Button from "./Button";
import { useTranslation } from "react-i18next";

export default function TrainingSection() {
  const { t } = useTranslation();
  const trainings = [
    {
      id:1,
      image: formationCover,
      title: t("trainingsSection.items.0.title"),
      description: t("trainingsSection.items.0.description"),
      date: "2025-09-20"
    },
    {
     
      id:2,
      image: formationCover2,
      title: t("trainingsSection.items.1.title"),
      description: t("trainingsSection.items.1.description"),
      date: "2025-09-25"
    },
    {
      id:3,
      image: formationCover3,
      title: t("trainingsSection.items.2.title"),
      description: t("trainingsSection.items.2.description"),
      date: "2025-09-28"
    },
     {
      id:4,
      image: formationCover3,
      title: t("trainingsSection.items.3.title"),
      description: t("trainingsSection.items.3.description"),
      date: "2025-10-08"
    }
  ];

  // Trier par date décroissante (plus récente en premier)
  const recentTrainings = trainings
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2); // garder seulement 2

  return (
    <section className="py-24 px-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-12 text-center md:w-[60%] w-[80%] mx-auto ">
            {t("trainingsSection.title")}
        </h2>

        <div className="lg:flex  md:gap-4 gap-5 md:items-center md:py-4 md:px-6">
            <div className="w-[100%] lg:w-[40%]">
                <p className="mb-6">{t("trainingsSection.description")}</p>
                <Button label={t("trainingsSection.cta")} color="green" href="#" ButtonClassName="text-white"/>
            </div>
            
            <div className="flex flex-wrap lg:justify-center gap-4 lg:gap-7 mt-20 lg:w-[60%] w-[100%]">
                {recentTrainings.map((item) => (
                    <TrainingCard 
                    key={item.id}
                    id={item.id}
                    image={item.image} 
                    title={item.title} 
                    description={item.description} 
                    />
                ))}
            </div>
        </div>
    </section>
  )
}
