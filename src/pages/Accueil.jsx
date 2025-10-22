import Hero from "../components/Hero"
import bookCover from "../assets/bookCover.png"
import heroImage from "../assets/heroImage.png"
import openBook from "../assets/openBook.png"
import BookSection from '../components/BookSection'
import TrainingSection from '../components/TrainingSection'
import webinar from '../assets/webinar.jpg'

export default function Accueil(){
    return(
       <>
            <section className='p-4'>
                <Hero
                    title="Achetez un terrain en toute sécurité en Côte d’Ivoire"
                    textClassName="text-3xl md:text-6xl font-bold leading-tight"
                    subtitle="Les secrets enfin dévoilés pour être propriétaire !"
                    backgroundImage={heroImage}
                    gradient="from-black/20 to-black/20"
                    image={bookCover}
                    imageClassName= "absolute right-0 -bottom-55 w-[50%] hidden lg:block z-20"
                    backgroundClass="h-[20rem] lg:h-[30rem]"
                />

            </section>
                
            <section className='bg-bodyColor mt-24 py-10 md:py-20 md:mt-30'>
                <div>
                    <BookSection
                    image={openBook}
                    title="Achetez un terrain en toute sécurité en Côte d’Ivoire"
                    className="text-2xl font-bold  bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
                    description="Ce livre est un guide qui facilite l’achat des terrains en Côte d’Ivoire. 
                    Il explique les règles qui permettent de comprendre le secteur du foncier ivoirien 
                    et donne des astuces aux lecteurs pour éviter les pièges des escrocs."
                    buttons={[
                    { text: "Je veux mon livre physique", color: "bg-secondary", onClick: () => alert("Livre physique choisi !") },
                    { text: "Je veux mon livre numérique", color: "bg-primary", onClick: () => alert("Livre numérique choisi !") },
                    ]}
                    imageRight={false}
                />
                </div>
            </section>

            <section className='p-4 flex justify-center'>
                    <TrainingSection/>
            </section>
                
            <section className='bg-bodyColor py-10 pt-26 md:py-24' style={{clipPath: "polygon(0 5%, 100% 23%, 100% 100%, 0% 100%)"}}>
                <BookSection
                    image={webinar}
                    title="Rejoignez notre prochain webinaire"
                    className="text-black font-semibold md:text-4xl text-2xl"
                    description="Ce jeudi à 13H."
                    buttons={[
                    { text: "Rejoignez notre prochain webinaire", color: "bg-secondary", onClick: () => alert("Livre physique choisi !") }
                    ]}
                    imageRight={false}
                />
            </section>
        </>
    )
}