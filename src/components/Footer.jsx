import logo from '../assets/logo-presi.png'
import SocialIcons from './SocialIcons'
import { FaAmazon, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa";
import NewsletterForm from './NewsletterForm'
function Footer(){
    return(
        <footer className='bg-primary p-4'>
           <div className='flex flex-col lg:flex-row lg:gap-34 gap-10 justify-center pb-12'>
                <div className='w-full lg:w-1/3 '>
                    <img src={logo} alt="logo-livre-achetez-un-terrain" />
                    <p className='md:text-[18px] text-white font-semibold py-5'>
                        Investir dans la terre, c’est investir dans l’avenir. 
                        Avec notre livre et nos services, nous vous donnons les 
                        clés pour bâtir un patrimoine solide, protégé et conforme 
                        aux lois en vigueur. Votre sécurité foncière commence ici.
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
                    <p className='md:text-2xl text-white font-semibold'>Liens utile</p>
                    <ul className="py-4 md:py-9 space-y-3">
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">Livres</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">Auteur</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">Formations</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">Webinaire</a></li>
                        <li><a href="#" className="text-white md:text-[18px] font-semibold">Photothèque</a></li>
                    </ul>
                </div>
                <div className='w-full lg:w-1/3'>
                    <p className='md:text-2xl text-white font-semibold mb-10'>
                        Rejoignez notre newsletter pour ne rater aucune nouvelle !
                    </p>
                    <NewsletterForm />
                    <div className='flex text-white font-semibold align-center gap-1 mt-10' >
                        
                        <FaWhatsapp className="text-white text-2xl" />
                         <p className='text-white'>+225 07 02 71 72 73 (Whatsapp)</p>
                    </div>
                </div>
           </div>
           <div>
            <p className='text-white  md:text-[18px] font-semibold pt-8 pb-4 text-center border-t-1'>Touts droits réservés. Firme Attou & Co © 2025</p>
           </div>
        </footer>
    )
}

export default Footer