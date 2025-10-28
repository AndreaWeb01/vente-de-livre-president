import Hero from "../components/Hero"
import PaiePhysique from "../components/PaiePhysique"
import PhotoSection from '../components/PhotoSection'
import Layout from "../components/Layout"
export default function Phototheque(){
    return(
       <>
       <Layout>
            <section className='p-4'>
                <Hero
                    title="Galerie d’évenements"
                    textClassName="text-3xl md:text-7xl font-bold leading-tight text-center"
                    subtitle="Découvrez en image tout nos évenements de dédicaces, formation et bien d’autres"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    subClassName="text-center text-2xl md:text-3xl"
                    divClassName="lg:w-[100%]"
                    backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                />
            </section>   
            <section className=' mt-10 py-10 md:py-10 md:mt-10'>
                <div>
                    <PhotoSection />
                </div>
            </section>
        </Layout>
        </>
    )
}