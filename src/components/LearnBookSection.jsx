import { FaGavel, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import LearnBook from "./LearnBook";
export default function LearnBookSection(){
    return(

    <section className="container py-24 px-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-10 md:mb-20 text-center md:w-[60%] w-[80%] mx-auto ">
            Ce que vous allez apprendre du livre        
        </h2>
        <div className="lg:flex  gap-12 ">
            <LearnBook Icon={FaGavel} title="Comprendre les bases juridiques" description="Découvrez les documents essentiels du foncier ivoirien (ACD, ADU, certificat de mutation, etc.) expliqués de manière claire et accessible. Vous saurez enfin distinguer les régimes de propriété et éviter les pièges liés à l’ignorance des règles légales."/>
            <LearnBook Icon={FaFileAlt} title="Maîtriser les démarches administratives" description="Apprenez pas à pas les procédures nécessaires pour sécuriser l’achat de votre terrain. Du lotissement approuvé à la mutation foncière, le livre détaille les étapes à suivre et les services compétents à consulter."/>
            <LearnBook Icon={FaShieldAlt} title="Déjouer les arnaques foncières" description="Grâce à des cas pratiques et des conseils concrets, vous saurez identifier les faux documents, reconnaître les pratiques douteuses et protéger vos économies contre les escroqueries les plus courantes."/>
        </div>
        
    </section>
       
    )
}