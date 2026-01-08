import Icontext from '../../components/Icontext'
import Sidebar from "../../components/Sidebar"
import LectureDash from "../../components/LectureDash"
import bookCover from "../../assets/bookCover.png"
import {FaBook } from "react-icons/fa";
import { usePage } from "@inertiajs/react"
import { useTranslation } from "react-i18next";
import Layout from "../../components/Layout"


export default function Livre({ livres }){
    const { props } = usePage()
    const { t } = useTranslation();
    const items = livres || props.livres || []
    return(
       <>
       <Layout> 
            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-center">
                     <Sidebar/>
                    <div>    

                        <div className=" text-secondary ">
                            <Icontext icon={FaBook} text={t("books.myDigitalBook")} textClass="font-bold text-[22px]"></Icontext>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
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