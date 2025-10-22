import Hero from "../components/Hero"
import PaiePhysique from "../components/PaiePhysique"
import PhotoSection from '../components/PhotoSection'
import ProductCard from "../components/ProductCard"
import Sidebar from "../components/Sidebar"
import CadreStatSection from "../components/CadreStatSection"
import FormationDashCadre from "../components/FormationDashCadre"
import trainingImg from "../assets/trainingImg.png"
import WebinarDashCadre from "../components/WebinarDashCadre"
import LectureCadreDash from "../components/LectureCadreDash"
import bookCover from "../assets/bookCover.png"
import TableCommande from "../components/TableCommande"

export default function Phototheque(){
    return(
       <>
            <section className='p-4'>
                <Hero
                    title="Galerie d’évenements"
                    textClassName="text-3xl md:text-7xl font-bold leading-tight text-center"
                    subtitle="Découvrez en image tout nos évenements de dédicaces, formation et bien d’autres"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    subClassName="text-center text-2xl md:text-3xl"
                    divClassName="lg:w-[100%]"
                    backgroundClass="h-[20rem] lg:h-[30rem]"
                />

            </section>
                
            <section className=' mt-10 py-10 md:py-10 md:mt-10'>
                <div>
                    <PhotoSection />
                </div>
            </section>

            <section className='p-4 mt-10 py-10 md:py-10 md:mt-10'>
                <div className="flex flex-wrap gap-4">
                    <div className="w-[100%] md:w-[60%]">
                        <PaiePhysique />
                    </div>
                    <div className="w-[100%] md:w-[38%]">
                        <ProductCard type="version numérique"/>
                    </div>
                </div>
            </section>

            <section className=' mt-10 py-10 md:py-10 md:mt-10'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div>
                        <CadreStatSection></CadreStatSection>
                        <div className="flex gap-2 mt-5">
                            <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg}></FormationDashCadre>
                            <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg}></FormationDashCadre>
                        </div>

                        <div className="mt-6 mb-6">
                            <WebinarDashCadre objet="A venir" titre="Acquisition d’un terrain en toute sécurité"
                            date="Jeudi 05/10/2025 14H30" nombre={132}
                            ></WebinarDashCadre>
                        </div>

                        <LectureCadreDash titres="Acheter un terrain en toute sécurité en Côte d’Ivoire" images={bookCover}></LectureCadreDash>
                        
                    </div>
                     

                </div>
               

            </section>

            <section>
                <TableCommande></TableCommande>
            </section>
        </>
    )
}