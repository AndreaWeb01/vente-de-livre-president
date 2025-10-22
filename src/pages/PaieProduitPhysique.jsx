import PaiePhysique from "../components/PaiePhysique"
import ProductCard from "../components/ProductCard"


export default function PaieProduitPhysique(){
    return(
       <>
            
            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex flex-wrap gap-4">
                    <div className="w-[100%] md:w-[60%]">
                        <PaiePhysique />
                    </div>
                    <div className="w-[100%] md:w-[38%]">
                        <ProductCard type="version physique" livraison="Coût de la livraison :" prix={2000}/>
                    </div>
                </div>
            </section>

        
        </>
    )
}