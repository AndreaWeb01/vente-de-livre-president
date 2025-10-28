import Hero from "../components/Hero"
import photoPresi from "../assets/photoPresi.png"
import BookSection from "../components/BookSection"
import writerBook from "../assets/writerBook.png"
import coverBook from "../assets/coverBook.png"
import TrainingStatSection from "../components/trainingStatSection"
import ContactForm from "../components/ContactForm"
import Layout from "../components/Layout"
import { usePage } from "@inertiajs/react"

export default function Auteur({ auteurs, auteur }){
    const { props } = usePage();
    
    // Si on a un auteur spécifique (page de détail), on l'affiche
    if (auteur) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{auteur.user?.prenom} {auteur.user?.nom}</h1>
                            <p className="text-gray-600 mb-4">Domaine: {auteur.domaine}</p>
                            <p className="text-lg mb-4">{auteur.biographie}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Livres de cet auteur</h2>
                            {auteur.livres && auteur.livres.length > 0 ? (
                                <div className="space-y-4">
                                    {auteur.livres.map((livre) => (
                                        <div key={livre.id} className="border p-4 rounded">
                                            <h3 className="font-semibold">{livre.titre}</h3>
                                            <p className="text-sm text-gray-600">{livre.description?.substring(0, 100)}...</p>
                                            <span className="text-primary font-bold">{livre.prix} FCFA</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Aucun livre disponible pour cet auteur.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Sinon, on affiche la liste des auteurs
    return(
        <>
        <Layout>
            <section className='p-4'>
                <Hero
                    title="Allou Boigny Nobel"
                    subtitle="Ecrivain et Spécialiste du Droit Foncier et Immobilier !"
                    ctaText="Contactez-Moi"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={photoPresi}
                    imageClassName= "absolute right-5 -bottom-0 w-[40%] hidden lg:block z-20"
                    textClassName="text-2xl text-center md:text-5xl lg:text-8xl font-bold leading-tight"
                    subClassName="mb-6 text-center lg:text-left"
                    backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                    divClassName="text-center lg:text-left"
                />
            </section>

            {auteurs.data && auteurs.data.length > 0 && (
            <section className='mt-2 md:mt-2'>
                <div>
                     <BookSection
                        image={writerBook}
                        title="Biographie"
                        className="text-2xl font-bold text-primary"
                        description={auteurs.data[0].biographie}                       
                    />
                    </div>
                </section>
            )}
       
            <section className=' '>
                <div >
                    <h4 className=" text-2xl md:text-4xl font-bold text-primary pt-16 md:pt-20 pb-10 md:pb-10 text-center md:w-[60%] w-[80%] mx-auto ">
                       Il est l’auteur du livre Achetez un terrain en toute sécurité en Côte d’Ivoire
                    </h4>
                </div>    
                <div className="py-5 md:py-5">
                    <BookSection
                        image={coverBook}
                        description="Achetez un terrain en toute sécurité en Côte d’Ivoire » est un ouvrage de référence qui met en lumière les enjeux du foncier, les règles essentielles d’acquisition, les mécanismes de résolution des conflits et les pièges à éviter.
                                     Structuré en 7 chapitres et 155 pages, ce livre présente de manière claire et accessible des documents clés du secteur tels que l’Attestation de Droit d’Usage (ADU), l’état foncier historique, l’Arrêté de Concession Définitive (ACD), le Certificat de Mutation de la Propriété Foncière (CMPF), ainsi que d’autres pièces fondamentales de la chaîne foncière.
                                     Fruit d’un travail collaboratif, il bénéficie de la contribution d’experts du domaine : conservateurs de la propriété foncière, chefs de services de cadastre, cadres du ministère de la Construction, notaires et avocats. L’ouvrage se conclut par un tableau récapitulatif inédit qui rassemble l’ensemble des dispositions légales du foncier ivoirien, en faisant un outil pratique et complet pour tout acquéreur, investisseur ou professionnel du secteur."
                                    
                        buttons={[
                        { text: "Je veux mon livre", color: "bg-secondary", onClick: () => alert("Livre physique choisi !") },
                        { text: "Je veux une formation", color: "bg-primary", onClick: () => alert("Livre numérique choisi !") },
                        ]}
                        imageRight={false}
                    />
                </div>

               
            </section>

            <section className="p-4 py-16 bg-bodyColor mt-22">
                <div className=" flex flex-wrap items-center justify-center gap-6">
                    <div className="w-full font-medium md:w-[45%]">
                        <p>Vous avez une question sur le livre Achetez un terrain en toute sécurité en Côte d’Ivoire ? 
                            Vous souhaitez en savoir plus sur nos formations ou organiser une conférence dans votre institution ?
                            Notre équipe est à votre disposition. Écrivez-nous dès aujourd’hui et faisons ensemble un pas vers une
                            Côte d’Ivoire mieux protégée contre les arnaques foncières.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <ContactForm/>
                    </div>
                </div>
                 
            </section>

           
                        
        </Layout>
        </>
                
    )
}