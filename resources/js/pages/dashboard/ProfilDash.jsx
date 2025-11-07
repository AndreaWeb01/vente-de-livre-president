import Sidebar from "../../components/Sidebar"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../../components/FormInput"
import Button from "../../components/Button"
import { router, usePage } from "@inertiajs/react";

const schema = yup.object({
  nom: yup.string().required("Le nom est requis."),
  prenom: yup.string().required("Le prénom est requis."),
  email: yup.string().email("Email invalide").required("L'email est requis."),
  telephone: yup.string().nullable(),
  adresse: yup.string().nullable(),
  ville: yup.string().nullable(),
  quartier: yup.string().nullable(),
}).required();

export default function ProfilDash() {
  const { props } = usePage();
  const currentUser = props?.auth?.user || {};
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = 
    useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        nom: currentUser.nom || "",
        prenom: currentUser.prenom || "",
        email: currentUser.email || "",
        telephone: currentUser.telephone || "",
        adresse: currentUser.adresse || "",
        ville: currentUser.ville || "",
        quartier: currentUser.quartier || "",
      }
    });

  const onSubmit = async (data) => {
    router.patch('/settings/profile', data, { preserveScroll: true });
  };

  return (
    <section className='p-4 mt-5 md:mt-5'>
      <div className="flex gap-4 items-start">
        <Sidebar />
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput name="nom" register={register} error={errors.nom} placeholder="Nom" label="Nom" />
              <FormInput name="prenom" register={register} error={errors.prenom} placeholder="Prénom" label="Prénom" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="email" register={register} type="email" error={errors.email} placeholder="Email" label="Email"/>
                <FormInput name="telephone" register={register} type="tel" error={errors.telephone} placeholder="Téléphone" label="Téléphone" /> 
            </div>
            <div className="mt-5 mb-5">
                <h2 className="text-secondary text-[18px] font-semibold md:text-2xl">
                Changement de mot de passe
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="password" register={register} type="password" error={errors.password} placeholder="Mot de passe" label="Mot de passe" />
                <FormInput name="confirmPassword" register={register} type="password" error={errors.confirmPassword} placeholder="Confirmation du mot de passe" label="Confirmation du Mot de passe" />
                                  
            </div>
            <div className="mt-5 mb-5">
                <h2 className="text-secondary text-[18px] font-semibold md:text-2xl">
                Adresse de livraison
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="ville" register={register} error={errors.ville} placeholder="Ville ou Commune de livraison" label="Ville ou Commune de livraison" />
                <FormInput name="quartier" register={register} error={errors.quartier} placeholder="Quartier" label="Quartier" />
            </div>
            <FormInput name="adresse" register={register} error={errors.adresse} placeholder="Adresse" label="Adresse" /> 

            {isSubmitSuccessful && (
              <p className="text-green-600 text-sm mb-4">Message envoyé avec succès !</p>
            )}

            <Button type="submit" label={isSubmitting ? "Envoi..." : "Enregistrer les modifications"} color="orange" ButtonClassName="text-white" />
          </form>
        </div>
      </div>
    </section>
  );
}
