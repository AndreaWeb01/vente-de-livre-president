import { FaBoxOpen, FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard, } from "react-icons/fa"

import CadreStat from "./CadreStat"

export default function CadreStatSection({ stats }){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <CadreStat nombre={stats?.commandes_count ?? 0} Icon={FaBoxOpen} Text="Commandes" />
            <CadreStat nombre={stats?.livre_count ?? 0} Icon={FaBook} Text="Livres" />
            <CadreStat nombre={stats?.formation_count ?? 0} Icon={FaGraduationCap} Text="Formations" />
            <CadreStat nombre={stats?.webinaires_count ?? 0} Icon={FaChalkboard} Text="Webinaires" />
        </div>
    )
    
}