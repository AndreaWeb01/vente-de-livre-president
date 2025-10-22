import Hero from "../components/Hero"
import OpenBookCover from "../assets/OpenBookCover.png"
import LearnBookSection from "../components/LearnBookSection"
import BookSection from "../components/BookSection"
import numericBook from "../assets/numericBook.png"
import physicBook from "../assets/physicBook.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
export default function Livres(){
    return(
        <>
            <section className='p-4'>
                <Hero
                    title="Découvrez les secrets juridiques et administratifs pour éviter les conflits et devenir propriétaire en toute sécurité"
                    // subtitle="Les secrets enfin dévoilés pour être propriétaire !"
                    ctaText="Je veux un livre"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={OpenBookCover}
                    imageClassName= "absolute right-0 -bottom-10 w-[45%] hidden lg:block z-20"
                    textClassName="text-2xl md:text-4xl font-bold leading-tight"
                    backgroundClass="h-[20rem] lg:h-[30rem]"
                />
            </section>

            <section className='mt-2 md:mt-2'>
                <div><LearnBookSection/></div>
            </section>
        
            <section className='bg-bodyColor mt-6 md:mt-10'>
                <div >
                    <h4 className=" text-2xl md:text-4xl font-bold text-primary pt-16 md:pt-20 pb-16 md:pb-20 text-center md:w-[60%] w-[80%] mx-auto ">
                        Des formations qui vous aideront à atteindre vos objectifs
                    </h4>
                    <p className="text-textColor  px-6">Ce livre est un guide qui facilite l’achat des terrains en Côte d’Ivoire. Il explique les règles qui permettent de comprendre le secteur du foncier ivoirien et donne des astuces aux lecteurs pour éviter les pièges des escrocs. Avec des illustrations pratiques, 
                        cet ouvrage est un recueil indispensable pour les nouveaux acheteurs et les investisseurs expérimentés.</p>
                    </div>
                <div className="py-10 md:py-10">
                    <BookSection
                        image={numericBook}
                        title="Version numérique (ebook)"
                        className="text-2xl font-bold text-primary"
                        subtitle="✨ Toujours à portée de main"
                        description="Que vous soyez en voyage, au bureau ou à l’étranger, accédez à votre guide foncier en un clic. 
                                    smartphone. Pratique, moderne et instantané : votre sécurité foncière vous suit partout."
                        price="10 000 FCFA"
                                    
                        buttons={[
                        { text: "Je veux mon livre", color: "bg-secondary", onClick: () => alert("Livre physique choisi !") },
                        { text: "Je veux une formation", color: "bg-primary", onClick: () => alert("Livre numérique choisi !") },
                        ]}
                        imageRight={false}
                    />
                </div>

                <div className="py-10 md:py-10">
                    <BookSection
                        image={physicBook}
                        title="Version physique (livre papier)"
                        className="text-2xl font-bold text-primary"
                        subtitle="📖 Un ouvrage de prestige, à conserver dans votre bibliothèque"
                        description="La version imprimée se distingue par sa qualité exceptionnelle : couverture rembordée élégante, 
                        papier bouffant légèrement ivoire qui ménage vos yeux, et une finition qui reflète le sérieux du contenu. 
                        Plus qu’un simple livre, c’est une référence durable à laquelle vous pourrez revenir à tout moment."
                        price="15 000 FCFA"
                                    
                        buttons={[
                        { text: "Je veux mon livre", color: "bg-secondary", onClick: () => alert("Livre physique choisi !") },
                        { text: "Je veux une formation", color: "bg-primary", onClick: () => alert("Livre numérique choisi !") },
                        ]}
                        
                    />
                </div>
            </section>

            <section>
                <TestimonialCarousel title="Ce que disent nos lecteurs"/>
            </section>
                        
        </>
       
                
    )
}