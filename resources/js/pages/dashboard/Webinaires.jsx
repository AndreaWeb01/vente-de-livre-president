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
import { usePage } from "@inertiajs/react"



export default function Webinaires(){
    const { props } = usePage()
    const { webinaires = [] } = props
    
    // Fonction pour formater la date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        return `${jours[date.getDay()]} ${date.getDate()}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} 14H30`;
    };
    
    // Séparer les webinaires à venir et les replays
    const maintenant = new Date();
    const webinairesAVenir = webinaires.filter(web => {
        if (!web.date) return false;
        const dateWebinaire = new Date(web.date);
        return dateWebinaire >= maintenant && !web.url_video;
    });
    
    const replays = webinaires.filter(web => web.url_video);
    
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
                            {webinairesAVenir.length > 0 ? (
                                webinairesAVenir.map((webinaire, index) => {
                                    const dateWebinaire = new Date(webinaire.date);
                                    const estEnCours = dateWebinaire <= maintenant && dateWebinaire >= new Date(maintenant.getTime() - 2 * 60 * 60 * 1000); // 2 heures de marge
                                    
                                    return (
                                        <Cadre key={webinaire.id || index} children={<>
                                            <WebinarDashCadre 
                                                objet={estEnCours ? "Live" : "A venir"}
                                                titre={webinaire.titre}
                                                date={formatDate(webinaire.date)}
                                                nombre={webinaire.achats_count || webinaire.achats?.length || 0}
                                                labelButton={estEnCours ? "Rejoindre" : "s'inscrire"}
                                                colorBtn={estEnCours ? "green" : "white"}
                                                ButtonClassName={estEnCours ? "text-white" : "text-textColor"}
                                            />
                                        </>} />
                                    );
                                })
                            ) : (
                                <div className="col-span-2 text-center py-8 text-gray-500">
                                    Aucun webinaire à venir
                                </div>
                            )}
                        </div>
                        <div className=" text-secondary my-5">
                            <Icontext icon={ FaChalkboard} text="Replays des webinaires" textClass="font-bold text-[22px]"></Icontext>
                        </div>
                       
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                            {replays.length > 0 ? (
                                replays.map((webinaire, index) => (
                                    <Cadre key={webinaire.id || index} children={<>
                                        <FormationDashCadre 
                                            id={webinaire.id}
                                            titre={webinaire.titre}
                                            image={webinaire.photo ? `/storage/${webinaire.photo}` : webinaire.image || trainingImg}
                                            buttonText="Suivre le replay"
                                        />
                                    </>} />
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-8 text-gray-500">
                                    Aucun replay disponible pour le moment
                                </div>
                            )}
                        </div>
                        
                    </div>
                     

                </div>
               

            </section>
        </>
    )
}