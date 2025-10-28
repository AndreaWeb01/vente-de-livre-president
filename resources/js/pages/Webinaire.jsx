import Hero from "../components/Hero"
import webinarCover from "../assets/webinarCover.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import webinarIllustration from "../assets/webinarIllustration.jpg"
import WebinarFullSection from "../components/webinarFullSection"
import WebinaireSection from "../components/WebinaireSection"
import Icontext from "../components/Icontext"
import { FaThumbtack } from "react-icons/fa"
import Layout from "../components/Layout"
export default function Webinaire(){
    return(
        <>
        <Layout>
            <section className='p-4'>
                <Hero
                    title={<>
                    Participer à nos <br /> webinaires exclusifs
                    </>}
                    subtitle="Rejoignez nos sessions interactives et enrichissez vos connaissances"
                    ctaText="S’inscrire au prochain webinaire"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={webinarCover}
                    imageClassName= "absolute right-6  w-[35%] hidden lg:block z-20"
                    textClassName="text-2xl md:text-6xl font-bold leading-tight"
                    subClassName="mb-6 lg:w-[90%] text-[16px]  "
                    backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                />
            </section>

            <section className='mt-20 md:mt-20 p-4'>
                <WebinaireSection
                title="Participer à un webinaire c’est" 
                children={<>
                    <Icontext icon={FaThumbtack} text="Apprentissage en direct" />
                    <Icontext icon={FaThumbtack} text="Interaction avec les formateurs " />
                    <Icontext icon={FaThumbtack} text="Replay disponible" />
                </>}
                image={webinarIllustration}
                />
               
            </section>
        
            <section className='mt-6 md:mt-10'>
              <WebinarFullSection/>
            </section>

            <section>
                <TestimonialCarousel  title={
                    <>
                   Ils ont participé à nos webinaires <br /> écoutez ce qu’ils disent
                    </>
                }/>
            </section>
                        
        </Layout>
        </>
       
                
    )
}