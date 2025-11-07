import Hero from "../../components/Hero"
import Cadre from "../../components/Cadre"
import Icontext from '../../components/Icontext'
import ProductCard from "../../components/ProductCard"
import Sidebar from "../../components/Sidebar"
import TableCommande from "../../components/TableCommande"
import Layout from "../../components/Layout"
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


export default function Commande(){
    const { props } = usePage()
    const commandes = props?.commandes || []
    return(
       <>
       <Layout>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1">
                        <TableCommande commandes={commandes}></TableCommande>
                    </div>
                </div>
               

            </section>
        </Layout>
        </>
    )
}