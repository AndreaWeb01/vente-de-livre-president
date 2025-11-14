import TrainingCard from "./TrainingCard";
import formationCover from "../assets/formationCover.jpg";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

/**
 * @param {object} [props]
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {Array} [props.formations]
 */
export default function TrainingFullSection({
  title,
  subtitle,
  formations: formationsProp,
} = {}) {
    const { props } = usePage();
    const { formations: formationsFromPage = [] } = props;
    const { t } = useTranslation();
    const formations = formationsProp ?? formationsFromPage ?? [];
    const trainings = formations.map((formation) => ({
      id: formation.id,
      image: formation.photo ? `/storage/${formation.photo}` : formationCover,
      title: formation.titre,
      description: formation.description,
      date: formation.date,
      type: formation.type,
      formateur: formation.formateur,
      prix: formation.prix
    }));
 
  return (
    <section className="py-24 px-4">
    <div className="text-center md:w-[60%] w-[80%] mx-auto mb-16 md:mb-24">
      <h2 className="text-2xl md:text-4xl font-bold text-primary">
        {title ?? t("trainings.discover")}
      </h2>
      {subtitle && <p className="mt-4 text-textColor">{subtitle}</p>}
    </div>

    <div className="lg:flex md:gap-4 gap-4 md:items-center">
      <div className="flex flex-wrap lg:justify-between gap-4 lg:gap-3 w-[100%]">
        {trainings.map((item) => (
          <TrainingCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            date={item.date}
            type={item.type}
            formateur={item.formateur}
            prix={item.prix}
          />
        ))}
      </div>
    </div>
  </section>
  )
}