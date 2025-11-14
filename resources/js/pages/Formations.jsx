import Hero from "../components/Hero"
import coverFormation from "../assets/coverFormation.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import TrainingStatSection from "../components/trainingStatSection"
import TrainingFullSection from "../components/TrainingFullSection"
import Layout from "../components/Layout"
import { usePage, router } from "@inertiajs/react"
import Button from "../components/Button"
import { useTranslation } from "react-i18next";

export default function Formations({ formations, formation }){
    console.log("Formations reçues:", formations);

    const { props } = usePage();
    const { t } = useTranslation();
    
    // Si on a une formation spécifique (page de détail), on l'affiche
    if (formation) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{formation.titre}</h1>
                    <p className="text-gray-600 mb-4">{t("trainings.type")}: {formation.type}</p>
                    <p className="text-lg mb-4">{formation.description}</p>
                    <div className="mt-6">
                        <span className="text-2xl font-bold text-primary">{formation.prix} FCFA</span>
                    </div>
                    {formation.url_video && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">{t("trainings.previewVideo")}</h3>
                            <video controls className="w-full max-w-md">
                                <source src={formation.url_video} type="video/mp4" />
                                {t("trainings.videoUnsupported")}
                            </video>
                        </div>
                    )}
                </div>
            </Layout>
        );
    }

    // Sinon, on affiche la liste des formations
    return(
        <>
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
                    backgroundClass="h-[25rem] lg:h-[30rem] xl:h-[50rem]"
                />
            </section>

           

            <section className='mt-20 md:mt-20 p-4'>
                <TrainingStatSection 
                title={t("trainings.statTitle")} 
                description={<>{t("trainings.statDescription")}</>}
                />
                  
            </section>
            {formations && formations.data && formations.data.length > 0 && (
            <section className="py-24 px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-24 text-center md:w-[60%] w-[80%] mx-auto">
                {t("trainings.discover")}
                </h2>
            <div className="lg:flex md:gap-4 gap-4 md:items-center">
            <div className="flex flex-wrap lg:justify-between gap-4 lg:gap-3 w-[100%]">
            {formations.data.map((formation) => (
                <div key={formation.id} className="bg-bodyColor rounded-md w-100% md:w-75 p-4">
                    <img src={formation.photo ? `/storage/${formation.photo}` : formationCover} alt={formation.titre} className="w-[100%] rounded-[8px]" />
                    <h3 className="font-semibold mb-2 mt-5 text-[18px]">{formation.titre}</h3>
                    <p className="text-[16px] mb-5">{formation.description}</p>
                
                    <Button
                       to={`/formations/${formation.id}`}
                       label={t("trainings.view")}
                       color="secondary"
                       ButtonClassName="text-white w-full bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded mt-2"
                    />   
                </div>
            ))}
            </div>
            </div>
            </section>
            )}

            <section>
                <TestimonialCarousel  title={
                    <>
                    {t("trainings.testimonialsLine1")} <br /> 
                    {t("trainings.testimonialsLine2")}
                    </>
                }/>
            </section>
                        
        </Layout>
        </>
       
                
    )
}