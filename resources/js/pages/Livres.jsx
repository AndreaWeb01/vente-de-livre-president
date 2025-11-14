import Hero from "../components/Hero"
import OpenBookCover from "../assets/OpenBookCover.png"
import LearnBookSection from "../components/LearnBookSection"
import BookSection from "../components/BookSection"
import numericBook from "../assets/numericBook.png"
import physicBook from "../assets/physicBook.png"
import TestimonialCarousel from "../components/TestimonialCarousel"
import Layout from "../components/Layout"
import { usePage, router } from "@inertiajs/react"
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy';
import { useTranslation } from "react-i18next";



export default function Livres({ livres, livre }) {
    const { props } = usePage();
    const { livresPhysiques, livresNumeriques } = props;
    const { t } = useTranslation();

    // Si on a un livre spécifique (page de détail), on l'affiche
    if (livre) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">{livre.titre}</h1>
                    <p className="text-gray-600 mb-4">{t("books.byAuthor", { firstName: livre.auteur?.user?.prenom, lastName: livre.auteur?.user?.nom })}</p>
                    <p className="text-lg">{livre.description}</p>
                    <div className="mt-6">
                        <span className="text-2xl font-bold text-primary">{t("books.price", { price: livre.prix })}</span>
                    </div>
                </div>
            </Layout>
        );
    }
    // Sinon, on affiche la liste des livres
    return (
        <>
            <Layout>
                <section className='p-4'>
                    <Hero
                        title={t("booksPage.heroTitle")}
                        ctaText={t("booksPage.heroCTA")}
                        gradient="from-[#2E7D32] to-[#4AA441]"
                        image={OpenBookCover}
                        imageClassName="absolute right-0 -bottom-10 w-[45%] hidden lg:block z-20"
                        textClassName="text-2xl md:text-4xl font-bold leading-tight"
                        backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                    />
                </section>

                <section className='mt-2 md:mt-2 py-24 px-4'>
                    <LearnBookSection />
                </section>

        
            <section className='bg-bodyColor mt-6 md:mt-10'>
                <div >
                    <h4 className=" text-2xl md:text-4xl font-bold text-primary pt-16 md:pt-20 pb-16 md:pb-20 text-center md:w-[60%] w-[80%] mx-auto ">
                        {t("booksPage.trainingTitle")}
                    </h4>
                    <p className="text-textColor  px-6">{t("booksPage.trainingDescription")}</p>
                    </div>
                    {livresNumeriques?.length > 0 && (
                    
                <div className="py-10 md:py-10">
                     {livresNumeriques.map((livre) => (

                    <BookSection
                        image={livre.photo ? `/storage/${livre.photo}` : numericBook}
                        title={t("booksPage.digitalTitle")}
                        className="text-2xl font-bold text-primary"
                        subtitle={t("booksPage.digitalSubtitle")}
                        description={livre.description}
                        price={livre.prix + " FCFA"}                       
                        buttons={[
                            {
                              text: t("booksPage.wantBook"),
                              to: route('public.panier.add-livre', livre.id, false, Ziggy),
                              color: "bg-secondary",
                              method: "post"
                            },
                            {
                              text: t("booksPage.wantTraining"),
                              to:'/formations',
                              color: "bg-primary",
                            }
                        ]}
                        imageRight={false}
                        livre={livre}
                    />
                    ))}
                </div>
                )}

               {livresPhysiques?.length > 0 && (
                <div className="py-10 md:py-10">
                    {livresPhysiques.map((livre) => (
                    <BookSection
                        image={livre.photo ? `/storage/${livre.photo}` : numericBook}
                        title={t("booksPage.physicalTitle")}
                        className="text-2xl font-bold text-primary"
                        subtitle={t("booksPage.physicalSubtitle")}
                        description={livre.description}
                        price={livre.prix + " FCFA"}
                                    
                        buttons={[
                            {
                                text: t("booksPage.wantBook"),
                                to: route('public.panier.add-livre', livre.id, false, Ziggy),
                                color: "bg-secondary",
                                method: "post"
                              },
                        {
                            text: t("booksPage.wantTraining"),
                            to:'/formations',
                            color: "bg-primary",
                          },
                        ]}
                        
                    />
                    ))}
                </div>
               
                )}
            </section>
                <section>
                    <TestimonialCarousel title={t("booksPage.testimonialsTitle")} />
                </section>
            </Layout>
        </>


    )
}