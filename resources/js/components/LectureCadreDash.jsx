import { FaBook } from "react-icons/fa"
import Icontext from "./Icontext"
import Button from "./Button"
import Cadre from "./Cadre"
export default function LectureCadreDash({id,images, titres}){
    return(
        <Cadre>
          <div className="px-6 py-6">
            <div className="flex justify-between">
                <Icontext icon={FaBook} text="Lecture de mon livre" iconClass="text-secondary" textClass="text-[18px] md:text-[24px] font-bold text-secondary ms-2"></Icontext>
                {id ? (
                <Button 
                label="Poursuivre la lecture" color="orange" ButtonClassName="text-white" to={`/read-book/${id}`} ></Button>
                ):null}
            </div>
            <div className="flex gap-3 items-center mt-6">
                <div className="w-[100px]">
                    <img src={images} alt={titres} className="w-full object-cover " />
                </div>
                <div>
                    <h2 className="text-textColor text-[16px] md:text-[22px] font-bold">{titres}</h2>
                </div>
            </div>
          </div>
        </Cadre>
    )
}