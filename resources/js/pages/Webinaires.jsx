import Hero from "../components/Hero"
import coverFormation from "../assets/coverFormation.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import TrainingStatSection from "../components/trainingStatSection"
import TrainingFullSection from "../components/TrainingFullSection"
import Layout from "../components/Layout"
import { usePage } from "@inertiajs/react"
import { useTranslation } from "react-i18next";

export default function Webinaires({ webinaires, webinaire }){
    const { props } = usePage();
    const { t } = useTranslation();
    
    // Si on a un webinaire spécifique (page de détail), on l'affiche
    if (webinaire) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{webinaire.titre}</h1>
                    <p className="text-gray-600 mb-4">{t("webinars.type", { type: webinaire.type })}</p>
                    <p className="text-lg mb-4">{webinaire.description}</p>
                    <div className="mt-6">
                        <span className="text-2xl font-bold text-primary">{t("webinars.price", { price: webinaire.prix })}</span>
                    </div>
                    {webinaire.url_video && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">{t("webinars.previewVideo")}</h3>
                            <video controls className="w-full max-w-md">
                                <source src={webinaire.url_video} type="video/mp4" />
                                {t("webinars.videoUnsupported")}
                            </video>
                        </div>
                    )}
                    {webinaire.url_zoom && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">{t("webinars.zoomLink")}</h3>
                            <a href={webinaire.url_zoom} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800 underline">
                                {t("webinars.joinZoom")}
                            </a>
                        </div>
                    )}
                </div>
            </Layout>
        );
    }

    // Sinon, on affiche la liste des webinaires
    return(
        <>
        <Layout>
            <section className='p-4'>
                <Hero
                    title={t("webinars.heroTitle")}
                    subtitle={t("webinars.heroSubtitle")}
                    ctaText={t("webinars.heroCTA")}
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={coverFormation}
                />
            </section>
            <TrainingStatSection title={t("webinars.statTitle")} description={t("webinars.statDescription")} />
            <TrainingFullSection 
                title={t("webinars.availableTitle")}
                subtitle={t("webinars.availableSubtitle")}
                formations={webinaires?.data || []}
                showFilters={true}
                filters={props?.filters || {}}
            />
            <TestimonialCarousel />
        </Layout>
        </>
    )
}

