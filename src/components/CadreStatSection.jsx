import { FaBoxOpen, FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard, } from "react-icons/fa"

import CadreStat from "./CadreStat"

export default function CadreStatSection(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <CadreStat nombre={24} Icon={FaBoxOpen} Text="Commandes"></CadreStat>
            <CadreStat nombre={24} Icon={FaBook} Text="Livres achetés"></CadreStat>
            <CadreStat nombre={24} Icon={FaGraduationCap} Text="Formations"></CadreStat>
            <CadreStat nombre={24} Icon={FaChalkboard} Text="Webinaires"></CadreStat>
        </div>
    )
    
}