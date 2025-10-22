import { trainings } from "../data/Trainings";
import { useParams } from "react-router-dom";
import TrainingCard from "../components/TrainingCard";
import Button from "./Button";
export default function TrainingDetail(){
    const { id } = useParams();
    const formation = trainings.find(item => item.id === parseInt(id));

    if (!formation) {
        return <p>Formation introuvable</p>;
    }
    return(
        <>
          <div className="flex  lg:justify-between gap-4 lg:gap-3 items-center">
            <div className="w-full lg:w-[30%]">
                 <TrainingCard
                    image={formation.image}
                    title={formation.title}
                    description={formation.description}
                    showButton={false}
                />
            </div>
            <div className=" w-full lg:w-[70%]">
                 <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-12  ">
                    Plan des formations
                </h2>
                <p className="text-textColor font-medium text-[16px] md:text-[18px]">
                    <span className="text-primary font-semibold">01 </span>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ed do eiusm ed do eiusm ed do  
                </p><br />
                <p className="text-textColor font-medium text-[16px] md:text-[18px]">
                    <span className="text-primary font-semibold">02  </span>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ed do eiusm ed do eiusm ed do  
                </p><br />
                <p className="text-textColor font-medium text-[16px] md:text-[18px]">
                    <span className="text-primary font-semibold">03  </span>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ed do eiusm ed do eiusm ed do  
                </p><br />
                <p className="text-textColor font-medium text-[16px] md:text-[18px]">
                    <span className="text-primary font-semibold">04  </span>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ed do eiusm ed do eiusm ed do  
                </p><br />
                <p className="text-textColor font-medium text-[16px] md:text-[18px]">
                    <span className="text-primary font-semibold">05  </span>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ed do eiusm ed do eiusm ed do  
                </p><br />
                <p className="text-textColor font-medium text-[16px] md:text-[18px]">
                    <span className="text-primary font-semibold">06  </span>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ed do eiusm ed do eiusm ed do  
                </p>
                <div className="flex flex-wrap gap-6 mt-10">
                    <div>
                        <Button label="J'y participe" color="orange" to="/Paiement-ligne" ButtonClassName="text-white" />
                    </div>
                    <div>
                        <Button label="Je veux un livre" color="green" to="/livres" ButtonClassName="text-white"/>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}