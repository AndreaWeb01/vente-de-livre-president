import Hero from "../../components/Hero"
import Cadre from "../../components/Cadre"
import Icontext from '../../components/Icontext'
import ProductCard from "../../components/ProductCard"
import Sidebar from "../../components/Sidebar"
import TableCommande from "../../components/TableCommande"
import {
  FaUserCircle,
  FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";


export default function Commande(){
    return(
       <>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div className="flex-1">
                        <TableCommande></TableCommande>
                    </div>
                </div>
               

            </section>
        </>
    )
}