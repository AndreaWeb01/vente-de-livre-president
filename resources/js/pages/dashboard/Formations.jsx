import Cadre from "../../components/Cadre"
import Icontext from '../../components/Icontext'
import Sidebar from "../../components/Sidebar"
import FormationDashCadre from "../../components/FormationDashCadre"
import trainingImg from "../../assets/trainingImg.png"
import WebinarDashCadre from "../../components/WebinarDashCadre"
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


export default function Formation(){
    return(
       <>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div>
                        <div className=" text-secondary ">
                            <Icontext icon={FaGraduationCap} text="Mes Formations en cours" textClass="font-bold text-[22px]"></Icontext>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Continuer la formation"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Continuer la formation"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Continuer la formation"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Continuer la formation"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>

                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Continuer la formation"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Continuer la formation"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                           
                        </div>

                    

                        
                    </div>
                     

                </div>
               

            </section>
        </>
    )
}