import { FaBook } from "react-icons/fa"
import Icontext from "./Icontext"
import Button from "./Button"
import Cadre from "./Cadre"
export default function LectureDash({images, titres, Auteur}){
    return(
        <Cadre>
          <div className="px-6 py-6 flex md:gap-33 justify-between items-center">
            <div className="flex gap-3 items-center mt-6">
                <div className="w-[100px]">
                    <img src={images} alt={titres} className="w-full object-cover " />
                </div>
                <div>
                    <h2 className="text-textColor text-[16px] md:text-[22px] font-bold">{titres}</h2>
                    <h2 className="text-textColor">Auteur: <span className="text-primary">{Auteur}</span></h2>
                </div>
            </div>
            <div className="">
                <Button label="Poursuivre la lecture" color="orange" ButtonClassName="text-white"></Button>
            </div>
          </div>
        </Cadre>
    )
}