import { FaUser } from "react-icons/fa"
import Icontext from "./Icontext"
import Button from "./Button"
export default function WebinarDashCadre({objet, nombre, date, titre, divClass, labelButton, colorBtn, ButtonClassName}){
    return(
        <div className={`flex gap-3 px-6 py-4 items-start ${divClass}`}>
            <h2 className="border border-secondary rounded-3xl px-2 whitespace-nowrap">{objet}</h2>
            <div>
                <h2 className="font-bold text-[16px]  md:text-[20px] mb-2">{date}</h2>
                <h2 className="text-[18px] mb-2">{titre}</h2>
                <div className="flex gap-1">
                    <Icontext icon={FaUser} text={nombre} iconClass="text-primary"></Icontext>
                    <p>Participants inscrits</p>
                </div>
                
            </div>
            <Button label={labelButton} color={colorBtn} ButtonClassName={ButtonClassName}></Button>
        </div>
    )
}