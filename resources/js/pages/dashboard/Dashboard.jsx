import Hero from "../../components/Hero"
import Cadre from "../../components/Cadre"
import Icontext from '../../components/Icontext'
import ProductCard from "../../components/ProductCard"
import Sidebar from "../../components/Sidebar"
import CadreStatSection from "../../components/CadreStatSection"
import FormationDashCadre from "../../components/FormationDashCadre"
import trainingImg from "../../assets/trainingImg.png"
import WebinarDashCadre from "../../components/WebinarDashCadre"
import LectureDash from "../../components/LectureDash"
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
import Layout from "../../components/Layout"
import { useTranslation } from "react-i18next";

export default function Dashboard({ user, stats, dernieres_commandes, derniers_achats, formations, livres, webinaires }) {
    const pageProps = usePage().props || {}
    const { t } = useTranslation();
    const currentUser = user || pageProps.user
    const currentStats = stats || pageProps.stats
    const currentLivres = livres || pageProps.livres
    const currentFormations = formations || pageProps.formations
    const currentWebnaire = webinaires || pageProps.webinaires
    const items = livres || props.livres || []
    const itemsf = formations || props.formations || []

    return (
        <>
            <Layout>
                <section className='p-4 mt-5  md:mt-5'>
                    <div className="flex gap-4 items-start">
                        <Sidebar />
                        <div className="flex-1 w-full">
                            <Hero
                                title={`${t("dashboard.hello")}, ${currentUser?.prenom ?? currentUser?.name ?? ''}`}
                                textClassName="text-3xl md:text-4xl font-bold leading-tight"
                                subtitle={t("dashboard.welcome")}
                                gradient="from-[#2E7D32] to-[#4AA441]"
                                image={happy}
                                imageClassName="absolute right-0 -bottom-0 w-[35%] "
                                backgroundClass="h-[10rem] lg:h-[18rem]"
                            />
                            <div className="mt-10">
                                <CadreStatSection stats={currentStats} />
                            </div>
                            <h2 className=" my-6 text-[24px] font-bold">{t("dashboard.activities")}</h2>
                            <div className="grid grid-cols-1  lg:grid-cols-2  w-full gap-2 mt-5">
                                <Cadre children={<>
                                    <div className="m-6 text-center text-secondary flex justify-center">
                                        <Icontext icon={FaGraduationCap} text={t("dashboard.myOngoingTrainings")} textClass="font-bold text-[18px]"></Icontext>
                                    </div>
                                   
                                        <div className="flex flex-col gap-2 m-5">
                                            {itemsf && itemsf.length > 0 ? (
                                                itemsf.map((formation) => (
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
                              
                                </>}>

                                </Cadre>
                                <Cadre children={<>
                                    <div className="m-6 text-center text-secondary flex justify-center">
                                        <Icontext icon={FaChalkboard} text={t("dashboard.nextWebinars")} textClass="font-bold text-[18px]"></Icontext>
                                    </div>
                                    {currentWebnaire.map((webinaires) => (
                                        <div className="flex flex-col gap-2 m-5">
                                            <WebinarDashCadre
                                                objet={t("dashboard.upcoming")}
                                                titre={webinaires.titre}
                                                date={webinaires.date}
                                                nombre={webinaires.stock} divClass=" bg-bodyColor"
                                                labelButton={t("dashboard.join")}
                                                colorBtn="green" ButtonClassName="text-white"
                                            > </WebinarDashCadre>
                                        </div>
                                    ))}
                                </>}>
                                </Cadre>

                            </div>

                            <div className="mt-4">
                                {items && items.length > 0 ? (
                                    items
                                        .filter((livre) => !!livre?.id)
                                        .map((livre, index) => (
                                            <LectureDash
                                                key={`${livre.id}-${index}`}
                                                id={livre.id}
                                                titres={livre.titre}
                                                images={livre.photo ? `/storage/${livre.photo}` : bookCover}
                                                Auteur={`${livre?.auteur?.user?.prenom ?? ''} ${livre?.auteur?.user?.nom ?? ''}`.trim()}

                                            />
                                        ))
                                ) : (
                                    <div className="text-sm text-gray-600">{t("books.noneAvailable")}</div>
                                )}
                            </div>


                        </div>
                    </div>
                </section>
            </Layout>
        </>

    )
}