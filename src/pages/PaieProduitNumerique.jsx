import PaieLigne from "../components/PaieLigne"
import ProductCard from "../components/ProductCard"


export default function PaieProduitNumerique(){
    return(
       <>
            
            <section className='p-4 mt-5  md:mt-5'>
                <div className="flex flex-wrap gap-4">
                    <div className="w-[100%] md:w-[60%]">
                        <PaieLigne />
                    </div>
                    <div className="w-[100%] md:w-[38%]"> 
                        <ProductCard type="version numérique"/>
                    </div>
                </div>
            </section>

        
        </>
    )
}