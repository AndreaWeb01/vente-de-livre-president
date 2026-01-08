import Hero from "../components/Hero.jsx"
import bookCover from "../assets/bookCover.png"
import heroImage from "../assets/heroImage.png"
import openBook from "../assets/openBook.png"
import BookSection from '../components/BookSection.jsx'
import TrainingSection from '../components/TrainingSection.jsx'
import webinar from '../assets/webinar.jpg'
import Layout from "../components/Layout.jsx"
import { useTranslation } from "react-i18next";


export default function Accueil(){
    const { t } = useTranslation();
    return(
       <>
       <Layout>
    
            <section className='p-4'>
                <Hero
                    title={t("home.heroTitle")}
                    textClassName="text-3xl md:text-6xl font-bold leading-tight"
                    subtitle={t("home.heroSubtitle")}
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
                    title={t("home.bookSectionTitle")}
                    className="text-2xl font-bold  bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
                    description={t("home.bookSectionDescription")}
                    buttons={[
                            { text: t("home.bookSectionPhysical"), color: "bg-secondary", to: "/livres" },
                            { text: t("home.bookSectionDigital"), color: "bg-primary", to: "/livres" },
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
                    title={t("home.webinarTitle")}
                    className="text-black font-semibold md:text-4xl text-2xl"
                    description={t("home.webinarDescription")}
                    buttons={[
                    { text: t("home.webinarCTA"), color: "bg-secondary", onClick: () => alert("Livre physique choisi !") }
                    ]}
                    imageRight={false}
                />
            </section>
            </Layout>
        </>
    )
}