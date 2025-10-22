import Hero from "../components/Hero"
import photoPresi from "../assets/photoPresi.png"
import BookSection from "../components/BookSection"
import writerBook from "../assets/writerBook.png"
import coverBook from "../assets/coverBook.png"
import TrainingStatSection from "../components/trainingStatSection"
import ContactForm from "../components/ContactForm"
export default function Auteur(){
    return(
        <>
            <section className='p-4'>
                <Hero
                    title="Allou Boigny Nobel"
                    subtitle="Ecrivain et Spécialiste du Droit Foncier et Immobilier !"
                    ctaText="Contactez-Moi"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={photoPresi}
                    imageClassName= "absolute right-5 -bottom-0 w-[40%] hidden lg:block z-20"
                    textClassName="text-2xl text-center md:text-8xl font-bold leading-tight"
                    subClassName="mb-6"
                    backgroundClass="h-[20rem] lg:h-[30rem]"
                />
            </section>

            <section className='mt-2 md:mt-2'>
                <div>
                     <BookSection
                        image={writerBook}
                        title="Biographie"
                        className="text-2xl font-bold text-primary"
                        description="Allou Boigny Nobel est magistrat et expert reconnu du droit foncier et immobilier en Côte d’Ivoire.
                        Après un parcours académique brillant, il est admis à seulement 23 ans, en qualité de major au concours national d’entrée à l’Institut National de Formation Judiciaire (INFJ). Pendant trois années, il y reçoit une formation d’excellence, qui le propulse à des fonctions de haute responsabilité : substitut du procureur, juge dans plusieurs juridictions, puis directeur des affaires juridiques et de la coopération internationale au ministère en charge de la promotion des PME.
 
                            Fort de cette expérience, il a également siégé au sein du comité d’agrément des aménageurs fonciers du ministère de la Construction, du Logement et de l’Urbanisme, contribuant ainsi directement aux décisions clés qui encadrent l’aménagement du territoire. Cette position privilégiée lui a permis d’acquérir une connaissance rare et pratique des rouages fonciers, au croisement du droit, de l’administration et des réalités de terrain.
                             
                            Aujourd’hui, en plus de son rôle de magistrat, il met son expertise au service du grand public à travers cet ouvrage de référence. « Achetez un terrain en toute sécurité en Côte d’Ivoire » se veut un guide accessible, mais solidement ancré dans la technicité juridique, offrant aux citoyens, investisseurs et professionnels une boussole fiable pour naviguer dans les complexités du foncier ivoirien."
                                                
                    />
                </div>
            </section>
        
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

           
                        
        </>
       
                
    )
}