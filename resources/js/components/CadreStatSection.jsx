import { FaBoxOpen, FaBook,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboard, } from "react-icons/fa"

import CadreStat from "./CadreStat"
import { useTranslation } from "react-i18next";

export default function CadreStatSection({ stats,webinairescom }){
    const { t } = useTranslation();
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <CadreStat nombre={stats?.commandes_count ?? 0} Icon={FaBoxOpen} Text={t("stats.orders")} />
            <CadreStat nombre={stats?.livre_count ?? 0} Icon={FaBook} Text={t("common.books")} />
            <CadreStat nombre={stats?.formation_count ?? 0} Icon={FaGraduationCap} Text={t("common.trainings")} />
            <CadreStat nombre={stats?.webinairescomp} Icon={FaChalkboard} Text={t("dashboard.webinars")} />
        </div>
    )
    
}