import { useLocation, useParams } from 'react-router-dom';
import Cadre from "../../components/Cadre";
import Sidebar from "../../components/Sidebar";
import DetailCommande from "../../components/DetailCommande";
import {
  FaUserCircle,
  FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DetailCommandes(){
    const location = useLocation();
    const { commande } = location.state || {}; // Récupère l'objet commande de l'état du routeur
    
    // Fallback si l'état n'est pas disponible (ex: accès direct via l'URL)
    const { commandeId } = useParams();
    // Ici, vous devriez faire un appel API pour récupérer la commande si elle n'est pas dans l'état
    // const commande = useFetch(`api/commandes/${commandeId}`); 

    if (!commande) {
        return (
            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1">
                        <Cadre>
                            <p>Détails de la commande non disponibles.</p>
                        </Cadre>
                    </div>
                </div>
            </section>
        );
    }

    return(
       <>
            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1">
                        <DetailCommande commande={commande}></DetailCommande>
                    </div>
                </div>
            </section>
        </>
    )
}
