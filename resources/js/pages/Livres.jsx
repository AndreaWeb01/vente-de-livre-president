import Hero from "../components/Hero"
import OpenBookCover from "../assets/OpenBookCover.png"
import LearnBookSection from "../components/LearnBookSection"
import BookSection from "../components/BookSection"
import numericBook from "../assets/numericBook.png"
import physicBook from "../assets/physicBook.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import Layout from "../components/Layout"
import { usePage, router } from "@inertiajs/react"
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy';



export default function Livres({ livres, livre }) {
    const { props } = usePage();
    const { livresPhysiques, livresNumeriques } = props;

    // Si on a un livre spécifique (page de détail), on l'affiche
    if (livre) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{livre.titre}</h1>
                    <p className="text-gray-600 mb-4">Par {livre.auteur?.user?.prenom} {livre.auteur?.user?.nom}</p>
                    <p className="text-lg">{livre.description}</p>
                    <div className="mt-6">
                        <span className="text-2xl font-bold text-primary">{livre.prix} FCFA</span>
                    </div>
                </div>
            </Layout>
        );
    }
    // Sinon, on affiche la liste des livres
    return (
        <>
            <Layout>
                <section className='p-4'>
                    <Hero
                        title="Découvrez les secrets juridiques et administratifs pour éviter les conflits et devenir propriétaire en toute sécurité"
                        // subtitle="Les secrets enfin dévoilés pour être propriétaire !"
                        ctaText="Je veux un livre"
                        gradient="from-[#2E7D32] to-[#4AA441]"
                        image={OpenBookCover}
                        imageClassName="absolute right-0 -bottom-10 w-[45%] hidden lg:block z-20"
                        textClassName="text-2xl md:text-4xl font-bold leading-tight"
                        backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                    />
                </section>

                <section className='mt-2 md:mt-2 py-24 px-4'>
                    <LearnBookSection />
                </section>

        
            <section className='bg-bodyColor mt-6 md:mt-10'>
                <div >
                    <h4 className=" text-2xl md:text-4xl font-bold text-primary pt-16 md:pt-20 pb-16 md:pb-20 text-center md:w-[60%] w-[80%] mx-auto ">
                        Des formations qui vous aideront à atteindre vos objectifs
                    </h4>
                    <p className="text-textColor  px-6">Ce livre est un guide qui facilite l’achat des terrains en Côte d’Ivoire. Il explique les règles qui permettent de comprendre le secteur du foncier ivoirien et donne des astuces aux lecteurs pour éviter les pièges des escrocs. Avec des illustrations pratiques, 
                        cet ouvrage est un recueil indispensable pour les nouveaux acheteurs et les investisseurs expérimentés.</p>
                    </div>
                    {livresNumeriques?.length > 0 && (
                    
                <div className="py-10 md:py-10">
                     {livresNumeriques.map((livre) => (

                    <BookSection
                        image={livre.photo ? `/storage/${livre.photo}` : numericBook}
                        title="Version numérique (ebook)"
                        className="text-2xl font-bold text-primary"
                        subtitle="✨ Toujours à portée de main"
                        description={livre.description}
                        price={livre.prix + " FCFA"}                       
                        buttons={[
                            {
                              text: "Je veux un livre",
                              to: route('public.panier.add-livre', livre.id, false, Ziggy),
                              color: "bg-primary",
                              method: "post"
                            },
                            {
                              text: "Je veux une formation",
                              to: route('formations.show', livre.id, false, Ziggy),
                              color: "bg-secondary",
                             
                            }
                        ]}
                        imageRight={false}
                        livre={livre}
                    />
                    ))}
                </div>
                )}

               {livresPhysiques?.length > 0 && (
                <div className="py-10 md:py-10">
                    {livresPhysiques.map((livre) => (
                    <BookSection
                        image={livre.photo ? `/storage/${livre.photo}` : numericBook}
                        title="Version physique (livre papier)"
                        className="text-2xl font-bold text-primary"
                        subtitle="📖 Un  de prestige, à conserver dans votre bibliothèque"
                        description={livre.description}
                        price={livre.prix + " FCFA"}
                                    
                        buttons={[
                        { text: "Je veux mon livre", color: "bg-secondary", onClick: () => alert("Livre physique choisi !") },
                        { text: "Je veux une formation", color: "bg-primary", onClick: () => alert("Livre numérique choisi !") },
                        ]}
                        
                    />
                    ))}
                </div>
               
                )}
            </section>
                <section>
                    <TestimonialCarousel title="Ce que disent nos lecteurs" />
                </section>
            </Layout>
        </>


    )
}