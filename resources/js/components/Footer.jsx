import logo from '../assets/logo-presi.png'
import SocialIcons from './SocialIcons'
import { FaAmazon, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa";
import NewsletterForm from './NewsletterForm'
import { useTranslation } from "react-i18next";
function Footer(){
    const { t } = useTranslation();
    return(
        <footer className='bg-primary p-4'>
           <div className='flex flex-col lg:flex-row lg:gap-34 gap-10 justify-center pb-12'>
                <div className='w-full lg:w-1/3 '>
                    <img src={logo} alt="logo-livre-achetez-un-terrain" />
                    <p className='md:text-[18px] text-white font-semibold py-5'>
                        {t("footer.intro")}
                    </p>
                    <div className="flex gap-3 mt-3">
                        <SocialIcons icon={FaAmazon} link="https://www.amazon.com" color="bg-secondary" />
                        <SocialIcons icon={FaFacebook} link="https://www.facebook.com" color="bg-secondary" />
                        <SocialIcons icon={FaTwitter} link="https://www.twitter.com" color="bg-secondary" />
                        <SocialIcons icon={FaLinkedin} link="https://www.linkedin.com" color="bg-secondary" />
                        <SocialIcons icon={FaTiktok} link="https://www.tiktok.com" color="bg-secondary" />
                    </div>
                </div>
                <div className='w-full lg:w-1/6'>
                    <p className='md:text-2xl text-white font-semibold'>{t("footer.usefulLinks")}</p>
                    <ul className="py-4 md:py-9 space-y-3">
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">{t("common.books")}</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">{t("common.authors")}</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">{t("common.trainings")}</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">{t("common.webinar")}</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">{t("common.phototheque")}</a></li>
                    </ul>
                </div>
                <div className='w-full lg:w-1/3'>
                    <p className='md:text-2xl text-white font-semibold mb-10'>
                        {t("footer.newsletterTitle")}
                    </p>
                    <NewsletterForm />
                    <div className='flex text-white font-semibold align-center gap-1 mt-10' >
                        
                        <FaWhatsapp className="text-white text-2xl" />
                         <p className='text-white'>+225 07 02 71 72 73 (Whatsapp)</p>
                    </div>
                </div>
           </div>
           <div>
            <p className='text-white  md:text-[18px] font-semibold pt-8 pb-4 text-center border-t-1'>{t("footer.copyright")}</p>
           </div>
        </footer>
    )
}

export default Footer