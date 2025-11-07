import Hero from "../components/Hero";
import coverFormation from "../assets/coverFormation.png";
import Button from "../components/Button";
import TrainingDetail from "../components/TrainingDetail";
import AccordionList from "../components/AccordionList";
import Layout from "../components/Layout";

export default function FormationDetail({ formation, id }) {
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
                title="Nos formations"
                subtitle="Formez-vous pour sécuriser vos projets fonciers
                            Nos formations spécialisées vous offrent des connaissances pratiques et juridiques 
                            indispensables pour comprendre le secteur foncier et immobilier en Côte d'Ivoire. 
                            Que vous soyez particulier, investisseur ou professionnel, développez les bons réflexes, 
                            maîtrisez les documents clés et évitez les pièges grâce à un savoir accessible et immédiatement applicable."
                ctaText="Découvrez nos formations"
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
              <p>Chargement de la formation...</p>
            )}
        </section>

        <section className="mt-20 md:mt-20 p-4">
          <AccordionList title="Trois (3) grandes raisons pour lesquelles tout le monde participe à notre formation" />
          <div className="flex justify-center mt-10">
              <Button label="Je m'inscris maintenant" color="orange" />
          </div>
        </section>
    </Layout>
  );
}
