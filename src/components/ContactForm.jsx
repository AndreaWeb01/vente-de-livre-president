import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import Button from "./Button";



const schema = yup.object({
  sujet: yup.string().required("Le sujet est requis."),
  nom: yup.string().required("Le nom est requis."),
  prenom: yup.string().required("Le prénom est requis."),
  email: yup.string().email("Email invalide.").required("L'email est requis."),
  message: yup.string().required("Le message est requis."),
}).required();

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = 
    useForm({
      resolver: yupResolver(schema),
      defaultValues: { sujet: "", nom: "", prenom: "", email: "", message: "" }
    });

  const onSubmit = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      reset(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-2xl">
        <h2 className="text-white bg-primary mb-4 p-3 rounded-t-2xl text-2xl text-center md:text-2xl font-bold leading-tight" >Contactez-nous</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6">
            <FormInput name="sujet" register={register} error={errors.sujet} placeholder="Sujet" />
            <FormInput  name="nom" register={register} error={errors.nom} placeholder="Nom" />
            <FormInput  name="prenom" register={register} error={errors.prenom} placeholder="Prénom" />
            <FormInput name="email" register={register} type="email" error={errors.email} placeholder="Email" />
            <FormTextarea  name="message" register={register} error={errors.message} placeholder="Votre message..." />

            {isSubmitSuccessful && (
                <p className="text-green-600 text-sm mb-4">Message envoyé avec succès !</p>
            )}

            <div className="mt-4">
                <Button type="submit" disabled={isSubmitting} label="Envoyer" color="orange" ButtonClassName="w-full text-white" >
                {isSubmitting ? "Envoi..." : "Envoyer"}
                </Button>
            </div>
        </form>
    </div>
   
  );
}
