import Hero from "../../components/Hero"
import Cadre from "../../components/Cadre"
import Icontext from '../../components/Icontext'
import ProductCard from "../../components/ProductCard"
import Sidebar from "../../components/Sidebar"
import CadreStatSection from "../../components/CadreStatSection"
import FormationDashCadre from "../../components/FormationDashCadre"
import trainingImg from "../../assets/trainingImg.png"
import WebinarDashCadre from "../../components/WebinarDashCadre"
import LectureCadreDash from "../../components/LectureCadreDash"
import happy from "../../assets/happy.png"
import bookCover from "../../assets/bookCover.png"
import {
  FaUserCircle,
  FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";


import { usePage } from "@inertiajs/react"
import Layout from "../../components/Layout"

export default function Dashboard({ user, stats, dernieres_commandes, derniers_achats,formations,livres }){
    const pageProps = usePage().props || {}
    const currentUser = user || pageProps.user
    const currentStats = stats || pageProps.stats
    const currentLivres=livres || pageProps.livres
    const currentFormations=formations || pageProps.formations

    return( 
       <>
       <Layout>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1 w-full">
                        <Hero
                           title={`Salut, ${currentUser?.prenom ?? currentUser?.name ?? ''}`}
                            textClassName="text-3xl md:text-4xl font-bold leading-tight"
                            subtitle="Bienvenue sur ton tableau de bord !"
                            gradient="from-[#2E7D32] to-[#4AA441]"
                            image={happy}
                            imageClassName= "absolute right-0 -bottom-0 w-[35%] "
                            backgroundClass="h-[10rem] lg:h-[18rem]"
                        />
                        <div className="mt-10">
                            <CadreStatSection stats={currentStats} />
                        </div>
                        <h2 className=" my-6 text-[24px] font-bold">Activités en cours</h2>
                        <div className="grid grid-cols-1  lg:grid-cols-2  w-full gap-2 mt-5">
                            <Cadre children={<>
                                    <div className="m-6 text-center text-secondary flex justify-center">
                                        <Icontext icon={FaGraduationCap} text="Mes Formations en cours" textClass="font-bold text-[18px]"></Icontext>
                                    </div>
                                     {currentFormations.map((formation) => (
                                    <div className="flex flex-col gap-2 m-5">
                                       
                                        <FormationDashCadre 
                                        key={formation.id} 
                                        image={formation.photo ? `/storage/${formation.photo}` : coverFormation}
                                        titre={formation.titre} 
                                        divClass=" bg-bodyColor" 
                                        buttonText="Continuer la formation" />
                                   
                                    </div>
                                      ))} 
                                </>}>
                                
                            </Cadre>
                           <Cadre children={<>
                                    <div className="m-6 text-center text-secondary flex justify-center">
                                        <Icontext icon={FaChalkboard} text="Prochains webinaires" textClass="font-bold text-[18px]"></Icontext>
                                    </div>
                                    <div className="flex flex-col gap-2 m-5">
                                            <WebinarDashCadre objet="A venir" titre="Acquisition d’un terrain en toute sécurité"
                                            date="Jeudi 05/10/2025 14H30" nombre={132} divClass=" bg-bodyColor" labelButton="Rejoindre" colorBtn="green" ButtonClassName="text-white" 
                                            ></WebinarDashCadre>
                                            <WebinarDashCadre objet="A venir" titre="Acquisition d’un terrain en toute sécurité"
                                                date="Jeudi 05/10/2025 14H30" nombre={132} divClass=" bg-bodyColor" labelButton="Rejoindre" colorBtn="green" ButtonClassName="text-white" 
                                                ></WebinarDashCadre>
                                    </div>
                                    
                                </>}>
                                
                            </Cadre>
                           
                        </div>
                        {currentLivres.map((livre) => (
                      <div className="mt-4">

                        <LectureCadreDash titres={livre.titre} images={livre.photo ? `/storage/${livre.photo}` : bookCover}></LectureCadreDash>
  
                    </div>
                     
                        ))}
                </div>
                </div>
                </section>
            </Layout>
        </>
            
    )
}