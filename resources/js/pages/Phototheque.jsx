import Hero from "../components/Hero"
import Layout from "../components/Layout"
import Galerie from "../components/Galerie"
import { usePage } from "@inertiajs/react"

export default function Phototheque({ phototheques: propPhototheques }){
    const page = usePage();
    // Récupérer les phototheques depuis les props ou depuis usePage comme fallback
    const phototheques = propPhototheques || page.props.phototheques || [];
    
    // Debug pour vérifier les données reçues
    console.log('Phototheques reçues (props):', propPhototheques);
    console.log('Phototheques reçues (page.props):', page.props.phototheques);
    console.log('Phototheques finales:', phototheques);
    console.log('Type de phototheques:', typeof phototheques);
    console.log('Est un tableau?', Array.isArray(phototheques));
    
    // Transformer les données de la base de données au format attendu par Galerie
    const photos = Array.isArray(phototheques) ? phototheques.map((photo) => {
        if (!photo || !photo.id) {
            console.warn('Photo invalide:', photo);
            return null;
        }
        return {
            id: photo.id,
            src: `/images/phototheque/${photo.photo}`,
            titre: photo.titre || '',
            date: photo.date || '',
            alt: photo.titre || photo.description || 'Photo de la photothèque',
            description: photo.description || ''
        };
    }).filter(photo => photo !== null) : [];
    
    console.log('Photos transformées:', photos);
    console.log('Nombre de photos:', photos.length);
    
    return(
        <>
            <Layout>
                <section className='p-4'>
                    <Hero
                        title="Galerie d'évenements"
                        textClassName="text-3xl md:text-7xl font-bold leading-tight text-center"
                        subtitle="Découvrez en image tout nos évenements de dédicaces, formation et bien d'autres"
                        gradient="from-[#2E7D32] to-[#4AA441]"
                        subClassName="text-center text-2xl md:text-3xl"
                        divClassName="lg:w-[100%]"
                        backgroundClass="h-[20rem] lg:h-[30rem] xl:h-[50rem]"
                    />
                </section>   
                <section className='mt-10 py-10 md:py-10 md:mt-10 px-4'>
                    {photos.length > 0 ? (
                        <>
                            <Galerie photos={photos} />
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Aucune photo disponible pour le moment.</p>
                            <p className="text-gray-400 text-sm mt-2">Nombre de phototheques reçues: {phototheques.length}</p>
                        </div>
                    )}
                </section>
            </Layout>
        </>
    )
}