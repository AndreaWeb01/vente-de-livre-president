import Icontext from '../../components/Icontext'
import Sidebar from "../../components/Sidebar"
import LectureDash from "../../components/LectureDash"
import bookCover from "../../assets/bookCover.png"
import {FaBook } from "react-icons/fa";


export default function Livre(){
    return(
       <>

            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex gap-4 items-start">
                     <Sidebar/>
                    <div>
                       
                        <div className=" text-secondary ">
                            <Icontext icon={FaBook} text="Mon livre en numérique" textClass="font-bold text-[22px]"></Icontext>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            <LectureDash titres="Acheter un terrain en toute sécurité en Côte d’Ivoire" images={bookCover} Auteur="Allou Nobel"></LectureDash>
                            <LectureDash titres="Acheter un terrain en toute sécurité en Côte d’Ivoire" images={bookCover} Auteur="Allou Nobel"></LectureDash>
                            <LectureDash titres="Acheter un terrain en toute sécurité en Côte d’Ivoire" images={bookCover} Auteur="Allou Nobel"></LectureDash>

                        </div>

                    </div>
                     

                </div>
               

            </section>
        </>
    )
}