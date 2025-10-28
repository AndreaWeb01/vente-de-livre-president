import Hero from "../components/Hero"
import coverFormation from "../assets/coverFormation.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import TrainingStatSection from "../components/trainingStatSection"
import TrainingFullSection from "../components/TrainingFullSection"
import Layout from "../components/Layout"
import { usePage, router } from "@inertiajs/react"

export default function Formations({ formations, formation }){
    const { props } = usePage();
    
    // Si on a une formation spécifique (page de détail), on l'affiche
    if (formation) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{formation.titre}</h1>
                    <p className="text-gray-600 mb-4">Type: {formation.type}</p>
                    <p className="text-lg mb-4">{formation.description}</p>
                    <div className="mt-6">
                        <span className="text-2xl font-bold text-primary">{formation.prix} FCFA</span>
                    </div>
                    {formation.url_video && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">Vidéo de présentation</h3>
                            <video controls className="w-full max-w-md">
                                <source src={formation.url_video} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture vidéo.
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
                    title="Nos formations"
                    subtitle="Formez-vous pour sécuriser vos projets fonciers
                             Nos formations spécialisées vous offrent des connaissances pratiques et juridiques 
                             indispensables pour comprendre le secteur foncier et immobilier en Côte d’Ivoire. 
                             Que vous soyez particulier, investisseur ou professionnel, développez les bons réflexes, 
                             maîtrisez les documents clés et évitez les pièges grâce à un savoir accessible et immédiatement applicable."
                    ctaText="Découvrez nos formations"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={coverFormation}
                    imageClassName= "absolute right-4  w-[40%] hidden lg:block z-20"
                    textClassName="text-2xl md:text-5xl font-bold leading-tight"
                    subClassName="mb-6 lg:w-[90%] text-[16px]  "
                    backgroundClass="h-[25rem] lg:h-[30rem] xl:h-[50rem]"
                />
            </section>

            {/* Section des formations dynamiques */}
            {formations && formations.data && formations.data.length > 0 && (
                <section className='py-12 px-4'>
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">Nos Formations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {formations.data.map((formation) => (
                                <div key={formation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    {formation.image && (
                                        <img src={formation.image} alt={formation.titre} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{formation.titre}</h3>
                                        <p className="text-gray-600 mb-2">Type: {formation.type}</p>
                                        <p className="text-sm text-gray-500 mb-3">{formation.description?.substring(0, 100)}...</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-primary">{formation.prix} FCFA</span>
                                            <a href={`/formations/${formation.id}`} className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                                                Voir détails
                                            </a>
                                        </div>
                                        {/* Bouton Acheter */}
                                        <button
                                            onClick={() => router.post(`/public/panier/formations/${formation.id}`, { quantite: 1 })}
                                            className="w-full bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded mt-2">
                                            Acheter
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        {formations.links && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex space-x-2">
                                    {formations.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 rounded ${
                                                link.active 
                                                    ? 'bg-primary text-white' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <section className='mt-20 md:mt-20 p-4'>
                <TrainingStatSection 
                title="Nous offrons des formations de qualité" 
                description={<>
                    Le secteur foncier et immobilier en Côte d’Ivoire est un univers complexe, marqué par des 
                    réformes constantes, des procédures précises et des documents aux implications juridiques majeures. 
                    Pour éviter les erreurs coûteuses et sécuriser vos projets, nous mettons à votre disposition des 
                    formations spécialisées, conçues par des experts du droit foncier et de l’immobilier. <br /> <br /> 
                    Nos modules abordent de façon pratique toutes les thématiques essentielles : processus d’acquisition, 
                    analyse et vérification des documents légaux (ACD, ADU, état foncier, certificats, etc.), gestion des litiges, 
                    stratégies de prévention des arnaques, et bonnes pratiques pour réussir vos transactions. <br /> <br /> 
                    Ces formations, interactives et adaptées à chaque public (particuliers, entreprises, professionnels du secteur), 
                    offrent une vision claire et opérationnelle du foncier ivoirien. Notre objectif : faire de vous des acteurs avertis, 
                    capables de prendre des décisions sûres et éclairées.
                
                </>}
                />
                  
            </section>
            {formations && formations.data && formations.data.length > 0 && (
            <section className="py-24 px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-24 text-center md:w-[60%] w-[80%] mx-auto">
                Découvrez nos formations
                </h2>
            <div className="lg:flex md:gap-4 gap-4 md:items-center">
            <div className="flex flex-wrap lg:justify-between gap-4 lg:gap-3 w-[100%]">
            {formations.data.map((formation) => (
                <div key={formation.id} className="bg-bodyColor rounded-md w-100% md:w-75 p-4">
                    <img src={formation.photo ? `/storage/${formation.photo}` : formationCover} alt={formation.titre} className="w-[100%] rounded-[8px]" />
                    <h3 className="font-semibold mb-2 mt-5 text-[18px]">{formation.titre}</h3>
                    <p className="text-[16px] mb-5">{formation.description}</p>
                    <Button label="Voir la formation" color="orange" href={`/formations/${formation.id}`} ButtonClassName="text-white" />
                    <button
                                            onClick={() => router.post(`/public/panier/formations/${formation.id}`, { quantite: 1 })}
                                            className="w-full bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded mt-2">
                                            Acheter
                                        </button>   
                </div>
            ))}
            </div>
            </div>
            </section>
            )}

            <section>
                <TestimonialCarousel  title={
                    <>
                    Ils ont participé à nos formations <br /> 
                    écoutez ce qu’ils disent
                    </>
                }/>
            </section>
                        
        </Layout>
        </>
       
                
    )
}