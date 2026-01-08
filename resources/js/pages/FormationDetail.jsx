import Hero from "../components/Hero";
import coverFormation from "../assets/coverFormation.png";
import Button from "../components/Button";
import TrainingDetail from "../components/TrainingDetail";
import AccordionList from "../components/AccordionList";
import Layout from "../components/Layout";
import { useTranslation } from "react-i18next";

export default function FormationDetail({ formation, id }) {
  const { t } = useTranslation();
  const normalizedFormation = formation
    ? {
        id: formation.id,
        image: formation.photo ? `/storage/${formation.photo}` : coverFormation,
        title: formation.titre,
        description: formation.description,
      }
    : null;

  return (
    <Layout>
        <section className='p-4'>
            <Hero
                title={t("trainings.heroTitle")}
                subtitle={t("trainings.heroSubtitle")}
                ctaText={t("trainings.heroCTA")}
                gradient="from-[#2E7D32] to-[#4AA441]"
                image={coverFormation}
                imageClassName= "absolute right-4  w-[40%] hidden lg:block z-20"
                textClassName="text-2xl md:text-5xl font-bold leading-tight"
                subClassName="mb-6 lg:w-[90%] text-[16px]  "
                backgroundClass="h-[25rem]  lg:h-[30rem] xl:h-[50rem]"
            />
        </section>

        <section className="mt-20 md:mt-20 p-4">
            {normalizedFormation ? (
              <TrainingDetail formation={normalizedFormation} id={id} />
            ) : (
              <p>{t("trainings.loading")}</p>
            )}
        </section>

        <section className="mt-20 md:mt-20 p-4">
          <AccordionList title={t("trainings.reasonsTitle")} />
          <div className="flex justify-center mt-10">
              <Button label="Je m'inscris maintenant" color="orange" />
          </div>
        </section>
    </Layout>
  );
}
