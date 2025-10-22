import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../components/FormInput";
import Button from "../components/Button";



const schema = yup.object({
  téléphone: yup.string().matches(/^[0-9]{10}$/, "Téléphone invalide. Le numéro doit contenir 10 chiffres.").required("Le numéro de téléphone est requis."),
  nom: yup.string().required("Le numero ou l'email sont requis."),
  prenom: yup.string().required("Le prénom est requis."),
  email: yup.string().email("Email invalide.").required("L'email est requis."),
  password: yup.string().matches(/^[0-7]{8}$/, "mot de passe doit contenir 8 caractères.").required("Le mot de passe est requis."),
  confirmPassword: yup.string().matches(/^[0-7]{8}$/, "les mots de passe doivent être identique.").required("La confirmation du mot de passe est requise."),
  // message: yup.string().required("Le message est requis."),
}).required();

export default function Inscription() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = 
      useForm({
        resolver: yupResolver(schema),
        defaultValues: {nom: "", prenom: "", email: "", téléphone: "", password: "", confirmPassword:"", }
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
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen gap-4">
      <div className="md:flex hidden items-center justify-center bg-primary text-white h-[100vh] shadow-[5px_0_10px_rgba(0,0,0,0.2)]" >
        <h2 className="text-center text-4xl font-bold leading-tight">INSCRIPTION</h2>
      </div>
      <div>
        <div className="bg-white ">
              <h2 className="text-2xl font-semibold mb-0 text-textColor px-6 py-2">Je vous rejoins</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6">
                  <FormInput  name="nom" register={register} error={errors.nom} placeholder="Ex: Koffi" label="Nom"/>
                  <FormInput  name="prenom" register={register} error={errors.prenom} placeholder="Ex: Charles" label="Prenom"/>
                  <FormInput name="email" register={register} type="email" error={errors.email} placeholder="Email" label="Email" />
                  <FormInput  name="téléphone" register={register} error={errors.téléphone} placeholder="Ex: 0788691433" label="Téléphone"/>
                  <FormInput name="password" register={register} type="password" error={errors.password} placeholder="Mot de passe" label="Mot de passe" />
                  <FormInput name="confirmPassword" register={register} type="password" error={errors.confirmPassword} placeholder="Confirmation du mot de passe" label="Confirmation du Mot de passe" />
                  
      
                  {isSubmitSuccessful && (
                      <p className="text-green-600 text-sm mb-4">Message envoyé avec succès !</p>
                  )}
      
                  <div className="mt-4">
                      <Button type="submit" disabled={isSubmitting} label="S'inscrire" color="orange" ButtonClassName="w-full text-white">
                      {isSubmitting ? "Envoi..." : "Envoyer"}
                      </Button>
                  </div>
                  
              </form>
              <p className="text-center mt-1">j'ai dejà un compte. <Link to="/Login" className="text-primary font-semibold">Je me connecte</Link> </p>
              
        </div>
      </div>
      
    </div>
  );
}
