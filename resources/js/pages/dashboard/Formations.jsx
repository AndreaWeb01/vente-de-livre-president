import Cadre from "../../components/Cadre"
import Icontext from '../../components/Icontext'
import Sidebar from "../../components/Sidebar"
import FormationDashCadre from "../../components/FormationDashCadre"
import trainingImg from "../../assets/trainingImg.png"
import { usePage } from "@inertiajs/react"
import {
  FaUserCircle,
  FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";


export default function Formation({ formations }){
    const { props } = usePage()
    const items = formations || props.formations || []
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
                            {items && items.length > 0 ? (
                                items.map((formation) => (
                                    <Cadre key={formation.id} children={<>
                                        <FormationDashCadre
                                            id={formation.id}
                                            titre={formation.titre}
                                            image={formation.photo ? `/storage/${formation.photo}` : trainingImg}
                                            buttonText="Continuer la formation"
                                        />
                                    </>} />
                                ))
                            ) : (
                                <div className="text-sm text-gray-600">Aucune formation disponible.</div>
                            )}
                        </div>

                    

                        
                    </div>
                     

                </div>
               

            </section>
        </>
    )
}