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


export default function Dashboard(){
    return(
       <>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1 w-full">
                         <Hero
                            title="Salut, Tabita"
                            textClassName="text-3xl md:text-4xl font-bold leading-tight"
                            subtitle="Bienvenue sur ton tableau de bord !"
                            gradient="from-[#2E7D32] to-[#4AA441]"
                            image={happy}
                            imageClassName= "absolute right-0 -bottom-0 w-[35%] "
                            backgroundClass="h-[10rem] lg:h-[18rem]"
                        />
                        <div class="mt-10">
                            <CadreStatSection></CadreStatSection>
                        </div>
                        <h2 className=" my-6 text-[24px] font-bold">Activités en cours</h2>
                        <div className="grid grid-cols-1  lg:grid-cols-2  w-full gap-2 mt-5">
                            <Cadre children={<>
                                    <div className="m-6 text-center text-secondary flex justify-center">
                                        <Icontext icon={FaGraduationCap} text="Mes Formations en cours" textClass="font-bold text-[18px]"></Icontext>
                                    </div>
                                    <div className="flex flex-col gap-2 m-5">
                                            <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} divClass=" bg-bodyColor" buttonText="Continuer la formation" ></FormationDashCadre>
                                            <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} divClass=" bg-bodyColor" buttonText="Continuer la formation" ></FormationDashCadre>
                                    </div>
                                    
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

                      <div className="mt-4">
                        <LectureCadreDash titres="Acheter un terrain en toute sécurité en Côte d’Ivoire" images={bookCover}></LectureCadreDash>

                      </div>

                        
                    </div>
                     

                </div>
               

            </section>
        </>
    )
}