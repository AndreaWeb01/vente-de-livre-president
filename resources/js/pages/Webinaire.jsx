import Hero from "../components/Hero"
import webinarCover from "../assets/webinarCover.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import webinarIllustration from "../assets/webinarIllustration.jpg"
import WebinarFullSection from "../components/webinarFullSection"
import WebinarCard from "../components/WebinarCard"
import webinar from "../assets/webinar.jpg"
import WebinaireSection from "../components/WebinaireSection"
import Icontext from "../components/Icontext"
import { FaThumbtack } from "react-icons/fa"
import Layout from "../components/Layout"
import { usePage } from "@inertiajs/react"
import { useTranslation } from "react-i18next";
export default function Webinaire(){
    const page = usePage();
    const webinars = page.props.webinars || [];
    console.log(webinars);
    const { t } = useTranslation();
 
   if(webinars.length === 0) {
    return <div>{t("webinar.noneAvailable")}</div>;
   }

    
    return(
        <>
        <Layout>
            <section className='p-4'>
                <Hero
                    title={<>
                    {t("webinar.heroTitleLine1")} <br /> {t("webinar.heroTitleLine2")}
                    </>}
                    subtitle={t("webinar.heroSubtitle")}
                    ctaText={t("webinar.heroCTA")}
                    gradient="from-[#2E7D32] to-[#4AA441]"
                    image={webinarCover}
                    imageClassName= "absolute right-6  w-[35%] hidden lg:block z-20"
                    textClassName="text-2xl md:text-6xl font-bold leading-tight"
                    subClassName="mb-6 lg:w-[90%] text-[16px]  "
                    backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                />
            </section>

            <section className='mt-20 md:mt-20 p-4'>
                <WebinaireSection
                title={t("webinar.participateIs")} 
                children={<>
                    <Icontext icon={FaThumbtack} text={t("webinar.bullet1")} />
                    <Icontext icon={FaThumbtack} text={t("webinar.bullet2")} />
                    <Icontext icon={FaThumbtack} text={t("webinar.bullet3")} />
                </>}
                image={webinarIllustration}
                />
               
            </section>
 

        <section className="py-24 px-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-primary mb-16 md:mb-24 text-center md:w-[60%] w-[80%] mx-auto ">
            {t("webinar.nextTitle")}
        </h2>

        <div className="lg:flex  md:gap-4 gap-4 md:items-center ">
            <div className="flex flex-wrap lg:justify-between gap-4 lg:gap-3 w-[100%]">
                {webinars.length > 0 ? (
                    webinars.map((item) => (
                        <WebinarCard key={item.id} {...item} />
                    ))
                ) : (
                    <div className="w-full text-center py-10">
                        <h3 className="text-xl text-gray-600 mb-4">{t("webinar.emptyTitle")}</h3>
                        <p className="text-gray-500">{t("webinar.emptyDesc")}</p>
                    </div>
                )}
            </div>
        </div>
    </section>
        

            <section>
                <TestimonialCarousel  title={
                    <>
                   {t("webinar.testimonialsLine1")} <br /> {t("webinar.testimonialsLine2")}
                    </>
                }/>
            </section>
                        
        </Layout>
        </>
       
                
    )
}