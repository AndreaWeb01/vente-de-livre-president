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
import Layout from "../../components/Layout";

export default function DetailCommandes({ commande, commandeId }) {
    // Si la commande n'est pas passée en props, utiliser commandeId pour la récupérer
    // Dans un vrai projet, vous feriez un appel API ici
    // const { data: commande } = useFetch(`/api/commandes/${commandeId}`);
    
    if (!commande) {
        return (
           

            <section className='p-4 mt-5 md:mt-5'>
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
       <> <Layout>
            <section className='p-4 mt-5 md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1">
                        <DetailCommande commande={commande}></DetailCommande>
                    </div>
                </div>
            </section>
            </Layout>
        </>
    )
}
