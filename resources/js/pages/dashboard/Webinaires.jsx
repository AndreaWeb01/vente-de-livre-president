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


export default function Webinaires(){
    return(
       <>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div>
                        <div className=" text-secondary ">
                            <Icontext icon={ FaChalkboard} text="Mes webinaires à venir" textClass="font-bold text-[22px]"></Icontext>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                            <Cadre children={<>
                                <WebinarDashCadre objet="Live" titre="Acquisition d’un terrain en toute sécurité"
                                            date="Jeudi 05/10/2025 14H30" nombre={132} labelButton="Rejoindre" colorBtn="green" ButtonClassName="text-white"
                                            ></WebinarDashCadre>                                
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <WebinarDashCadre objet="A venir" titre="Acquisition d’un terrain en toute sécurité"
                                    date="Jeudi 12/10/2025 14H30" nombre={132} labelButton="s'inscrire" colorBtn="white" ButtonClassName="text-textColor"
                                                                            ></WebinarDashCadre> 
                                </>}>
                                
                            </Cadre>
                            
                        </div>
                        <div className=" text-secondary my-5">
                            <Icontext icon={ FaChalkboard} text="Replays des webinaires" textClass="font-bold text-[22px]"></Icontext>
                        </div>
                    
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Suivre le replay"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Suivre le replay"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Suivre le replay"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Suivre le replay"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>

                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Suivre le replay"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                            <Cadre children={<>
                                <FormationDashCadre titre="Acquisition d’un bien immobilier en toute sécurité" image={trainingImg} buttonText="Suivre le replay"></FormationDashCadre> 
                                </>}>
                                
                            </Cadre>
                           
                        </div>
                        
                    </div>
                     

                </div>
               

            </section>
        </>
    )
}