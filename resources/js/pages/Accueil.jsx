import Hero from "../components/Hero.jsx"
import bookCover from "../assets/bookCover.png"
import heroImage from "../assets/heroImage.png"
import openBook from "../assets/openBook.png"
import BookSection from '../components/BookSection.jsx'
import TrainingSection from '../components/TrainingSection.jsx'
import webinar from '../assets/webinar.jpg'
import Button from "../components/Button.jsx"
import Layout from "../components/Layout.jsx"
import Livres from "./Livres.jsx"
import Formations from "./Formations.jsx"
import Auteur from "./Auteur.jsx"
import FormationDetail from "./FormationDetail.jsx"
import Webinaire from "./Webinaire.jsx"
import Phototheque from "./Phototheque.jsx"
import PanierProduitPhysique from "./PanierProduitPhysique.jsx"
import PanierProduitNumerique from "./PanierProduitNumerique.jsx"
import { Outlet } from "react-router-dom"


export default function Accueil(){
    return(
       <>
       <Layout>
    
            <section className='p-4'>
                <Hero
                    title="Achetez un terrain en toute sécurité en Côte d'Ivoire"
                    textClassName="text-3xl md:text-6xl font-bold leading-tight"
                    subtitle="Les secrets enfin dévoilés pour être propriétaire !"
                    backgroundImage={heroImage}
                    gradient="from-black/20 to-black/20"
                    image={bookCover}
                    imageClassName= "absolute right-0 -bottom-55 xl:-bottom-70 w-[50%] hidden lg:block z-20"
                    backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                />
            </section>
                
            <section className='bg-bodyColor mt-24 py-10 md:py-20 md:mt-30'>
                <div>
                    <BookSection
                    image={openBook}
                    title="Achetez un terrain en toute sécurité en Côte d'Ivoire"
                    className="text-2xl font-bold  bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
                    description="Ce livre est un guide qui facilite l'achat des terrains en Côte d'Ivoire. 
                    Il explique les règles qui permettent de comprendre le secteur du foncier ivoirien 
                    et donne des astuces aux lecteurs pour éviter les pièges des escrocs."
                    buttons={[
                            { text: "Je veux mon livre physique", color: "bg-secondary", to: "/public/panier" },
                            { text: "Je veux mon livre numérique", color: "bg-primary", to: "/public/panier" },
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
            </Layout>
        </>
    )
}