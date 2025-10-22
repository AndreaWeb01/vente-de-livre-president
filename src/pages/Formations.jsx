import Hero from "../components/Hero"
import coverFormation from "../assets/coverFormation.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import TrainingStatSection from "../components/trainingStatSection"
import TrainingFullSection from "../components/TrainingFullSection"
export default function Formations(){
    return(
        <>
            <section className='p-4'>
                <Hero
                    title="Nos formations"
                    subtitle="Formez-vous pour sécuriser vos projets fonciers
                             Nos formations spécialisées vous offrent des connaissances pratiques et juridiques 
                             indispensables pour comprendre le secteur foncier et immobilier en Côte d’Ivoire. 
                             Que vous soyez particulier, investisseur ou professionnel, développez les bons réflexes, 
                             maîtrisez les documents clés et évitez les pièges grâce à un savoir accessible et immédiatement applicable."
                    ctaText="Découvrez nos formations"
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={coverFormation}
                    imageClassName= "absolute right-4  w-[40%] hidden lg:block z-20"
                    textClassName="text-2xl md:text-5xl font-bold leading-tight"
                    subClassName="mb-6 lg:w-[90%] text-[16px]  "
                    backgroundClass="h-[25rem] lg:h-[30rem]"
                />
            </section>

            <section className='mt-20 md:mt-20 p-4'>
                <TrainingStatSection 
                title="Nous offrons des formations de qualité" 
                description={<>
                    Le secteur foncier et immobilier en Côte d’Ivoire est un univers complexe, marqué par des 
                    réformes constantes, des procédures précises et des documents aux implications juridiques majeures. 
                    Pour éviter les erreurs coûteuses et sécuriser vos projets, nous mettons à votre disposition des 
                    formations spécialisées, conçues par des experts du droit foncier et de l’immobilier. <br /> <br /> 
                    Nos modules abordent de façon pratique toutes les thématiques essentielles : processus d’acquisition, 
                    analyse et vérification des documents légaux (ACD, ADU, état foncier, certificats, etc.), gestion des litiges, 
                    stratégies de prévention des arnaques, et bonnes pratiques pour réussir vos transactions. <br /> <br /> 
                    Ces formations, interactives et adaptées à chaque public (particuliers, entreprises, professionnels du secteur), 
                    offrent une vision claire et opérationnelle du foncier ivoirien. Notre objectif : faire de vous des acteurs avertis, 
                    capables de prendre des décisions sûres et éclairées.
                
                </>}
                />
               
            </section>
        
            <section className='mt-6 md:mt-10'>
              <TrainingFullSection/>
            </section>

            <section>
                <TestimonialCarousel  title={
                    <>
                    Ils ont participé à nos formations <br /> 
                    écoutez ce qu’ils disent
                    </>
                }/>
            </section>
                        
        </>
       
                
    )
}