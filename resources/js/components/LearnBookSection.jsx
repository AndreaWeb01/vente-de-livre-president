import { FaGavel, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import LearnBook from "./LearnBook";
import { useTranslation } from "react-i18next";
export default function LearnBookSection(){
    const { t } = useTranslation();
    return(

    <>
        <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-10 md:mb-20 text-center md:w-[60%] w-[80%] mx-auto ">
            {t("bookLearn.title")}        
        </h2>
        <div className="lg:flex  gap-12 justify-center items-center">
            <LearnBook Icon={FaGavel} title={t("bookLearn.items.0.title")} description={t("bookLearn.items.0.description")}/>
            <LearnBook Icon={FaFileAlt} title={t("bookLearn.items.1.title")} description={t("bookLearn.items.1.description")}/>
            <LearnBook Icon={FaShieldAlt} title={t("bookLearn.items.2.title")} description={t("bookLearn.items.2.description")}/>
        </div>
        
    </>
       
    )
}