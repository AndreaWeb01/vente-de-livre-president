import Cadre from "./Cadre"
import {Link} from "@inertiajs/react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import Button from "./Button"

const schema = yup.object({
 
  nom: yup.string().required("Le nom est requis."),
  prenom: yup.string().required("Le prénom est requis."),
  téléphone: yup.string().matches(/^[0-9]{10}$/, "Téléphone invalide. Le numéro doit contenir 10 chiffres.").required("Le numéro de téléphone est requis."),
  email: yup.string().email("Email invalide.").required("L'email est requis."),
}).required();


export default function PaieLigne(){
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = 
        useForm({
          resolver: yupResolver(schema),
          defaultValues: {  nom: "", prenom: "", téléphone: "", email: "" }
        });
    
      const onSubmit = async (data) => {
        try {
          await new Promise((res) => setTimeout(res, 1000));
          reset(); 
        } catch (err) {
          console.error(err);
        }
      };
    return(
        <>
            <Cadre children={<>
                <div className="p-4">
                    <div className="flex flex-wrap justify-between mb-10">
                        <h2 className="text-secondary text-[18px] font-semibold md:text-2xl">Détails de facturations</h2>
                        {/* <p>Je me <Link to="phototheque" className="text-primary font-semibold">connecte</Link> pour suivre ma commande.</p> */}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput  name="nom" register={register} error={errors.nom} placeholder="Nom" label="Nom" />
                            <FormInput  name="prenom" register={register} error={errors.prenom} placeholder="Prénom" label="Prénom" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput name="téléphone" register={register} type="tel" error={errors.téléphone} placeholder="Téléphone" label = "Téléphone" />
                            <FormInput name="email" label="Email" register={register} type="email" error={errors.email} placeholder="Email" />                        </div>
                    
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput  name="ville" register={register} error={errors.nom} placeholder="Ville ou Commune de livraison" label="Ville ou Commune de livraison" />
                            <FormInput  name="quartier" register={register} error={errors.prenom} placeholder="Quartier" label="Quartier" />
                        </div> */}
                        {isSubmitSuccessful && (
                            <p className="text-green-600 text-sm mb-4">Message envoyé avec succès !</p>
                        )}
            
                    
                    </form>
                    
                </div>
                


                </>}/>

        
        
            <div className="mt-10">
                <Cadre children={
                    <>
                        
                        <div className="">
                            <h2 className="text-secondary text-[18px] font-semibold md:text-2xl p-4">Votre commande</h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                            <FormSelect
                                name="moyen de paiement"
                                label="Moyen de paiement"
                                register={register}
                                error={errors.pays}
                                options={[
                                { value: "ligne", label: "Paiement en ligne" },
                                
                                ]}
                            />
                            <div className="mt-4 w-[30%]">
                                <Button type="submit" disabled={isSubmitting} label="Valider ma commande" color="orange" ButtonClassName="w-full text-white">
                                {isSubmitting ? "Envoi..." : "Envoyer"}
                                </Button>
                            </div>
                        </form>
                    </>
                }
                />
            </div>
            
           
            
        </>
    )
}