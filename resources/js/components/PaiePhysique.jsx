import Cadre from "./Cadre"
import { Link, router } from "@inertiajs/react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { route } from "ziggy-js";
import { Ziggy } from "../ziggy";
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import Button from "./Button"

const schema = yup.object({
  nom: yup.string().required("Le nom est requis."),
  prenom: yup.string().required("Le prénom est requis."),
  email: yup.string().email("Email invalide").required("L'email est requis."),
  telephone: yup.string().matches(/^[0-9]{8,15}$/, "Téléphone invalide. 8 à 15 chiffres.").required("Le numéro de téléphone est requis."),
  ville: yup.string().required("La ville ou la commune est requise."),
  quartier: yup.string().required("Le quartier est requis."),
  mode_paiement: yup.string().oneOf(["espece", "mobile_money", "carte_credit"]).required("Le moyen de paiement est requis."),
}).required();


export default function PaiePhysique(){
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = 
        useForm({
          resolver: yupResolver(schema),
          defaultValues: { ville: "", nom: "", prenom: "", email: "", telephone: "", quartier: "", mode_paiement: "cash" }
        });
    
      const onSubmit = async (data) => {
        const payload = {
          ...data,
          telephone: (data.telephone || '').replace(/\D/g, ''),
          moneroo_method: data.mode_paiement === "mobile_money" ? "orange_ci" : null,
        };
        let postUrl = "/public/commande-livres-physique";
        try {
          postUrl = route("public.commande.physique.store", [], false, Ziggy);
        } catch (_) {}
        router.post(postUrl, payload, { preserveScroll: true });
      };
    return(
        <>
            <Cadre children={<>
                <div className="p-4">
                    <div className="flex flex-wrap justify-between mb-10">
                        <h2 className="text-secondary text-[18px] font-semibold md:text-2xl">Détails de facturations</h2>
                        <p>Je me <Link to="phototheque" className="text-primary font-semibold">connecte</Link> pour suivre ma commande.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput  name="nom" register={register} error={errors.nom} placeholder="Nom" label="Nom" />
                            <FormInput  name="prenom" register={register} error={errors.prenom} placeholder="Prénom" label="Prénom" />
                        </div>
                        <FormInput name="email" register={register} type="email" error={errors.email} placeholder="Email" label = "Email" />
                        <FormInput name="telephone" register={register} type="tel" error={errors.telephone} placeholder="Téléphone" label = "Téléphone" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput  name="ville" register={register} error={errors.ville} placeholder="Ville ou Commune de livraison" label="Ville ou Commune de livraison" />
                            <FormInput  name="quartier" register={register} error={errors.quartier} placeholder="Quartier" label="Quartier" />
                        </div>
                        {isSubmitSuccessful && (
                            <p className="text-green-600 text-sm mb-4">Message envoyé avec succès !</p>
                        )}
            
                    
                    </form>
                    
                </div>
                </>}/>
            <div className="mt-14">
                <Cadre children={
                    <>
                        
                        <div className="">
                            <h2 className="text-secondary text-[18px] font-semibold md:text-2xl p-4">Votre commande</h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                            <FormSelect
                                name="mode_paiement"
                                label="Moyen de paiement"
                                register={register}
                                error={errors.mode_paiement}
                                options={[
                                { value: "espece", label: "Paiement à la livraison (Espèces)" },
                                { value: "mobile_money", label: "Paiement en ligne (Mobile Money)" },
                                { value: "carte_credit", label: "Carte bancaire" },
                                
                                ]}
                            />
                            <div className="mt-4 w-[30%]">
                                <Button type="submit" disabled={isSubmitting} label="Valider ma commande" color="orange" ButtonClassName="w-full text-white">
                                {isSubmitting ? "Envoi..." : "Valider ma commande"}
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
