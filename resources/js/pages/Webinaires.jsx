import Hero from "../components/Hero"
import coverFormation from "../assets/coverFormation.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import TrainingStatSection from "../components/trainingStatSection"
import TrainingFullSection from "../components/TrainingFullSection"
import Layout from "../components/Layout"
import { usePage } from "@inertiajs/react"

export default function Webinaires({ webinaires, webinaire }){
    const { props } = usePage();
    
    // Si on a un webinaire spécifique (page de détail), on l'affiche
    if (webinaire) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{webinaire.titre}</h1>
                    <p className="text-gray-600 mb-4">Type: {webinaire.type}</p>
                    <p className="text-lg mb-4">{webinaire.description}</p>
                    <div className="mt-6">
                        <span className="text-2xl font-bold text-primary">{webinaire.prix} FCFA</span>
                    </div>
                    {webinaire.url_video && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">Vidéo de présentation</h3>
                            <video controls className="w-full max-w-md">
                                <source src={webinaire.url_video} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture vidéo.
                            </video>
                        </div>
                    )}
                    {webinaire.url_zoom && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">Lien Zoom</h3>
                            <a href={webinaire.url_zoom} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800 underline">
                                Rejoindre le webinaire
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
                    title="Nos Webinaires"
                    subtitle="Participez à nos webinaires interactifs
                             Découvrez nos webinaires en direct sur les technologies émergentes, 
                             les tendances du marché et les compétences professionnelles essentielles. 
                             Interagissez avec nos experts, posez vos questions et développez vos connaissances 
                             dans un environnement d'apprentissage collaboratif et dynamique."
                    ctaText="Découvrez nos webinaires"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={coverFormation}
                />
            </section>
            <TrainingStatSection />
            <TrainingFullSection 
                title="Webinaires Disponibles"
                subtitle="Rejoignez nos experts pour des sessions d'apprentissage interactives"
                formations={webinaires?.data || []}
                showFilters={true}
                filters={props?.filters || {}}
            />
            <TestimonialCarousel />
        </Layout>
        </>
    )
}

