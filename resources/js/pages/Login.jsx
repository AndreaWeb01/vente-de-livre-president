import { router, Link } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Layout from "../components/Layout";



const schema = yup.object({
  sujet: yup.string().required("Le sujet est requis."),
  nom: yup.string().required("Le numero ou l'email sont requis."),
  // prenom: yup.string().required("Le prénom est requis."),
  password: yup.string().matches(/^[0-7]{8}$/, "mot de passe doit contenir 8 caractères.").required("Le mot de passe est requis."),
  // message: yup.string().required("Le message est requis."),
}).required();

export default function Login() {

  const { register, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = 
      useForm({
        resolver: yupResolver(schema),
        defaultValues: { nom: "", password: ""}
      });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Simule une connexion réussie
    localStorage.setItem("isLoggedIn", "true");

    // 🔄 Récupère la page avant login
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
    router.visit(redirectPath);
    window.location.reload(); // pour forcer le Navbar à se mettre à jour
  };

  return (
    <Layout>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen gap-4">
      <div className="md:flex items-center justify-center bg-primary text-white h-[100vh] shadow-[5px_0_10px_rgba(0,0,0,0.2)] hidden " >
        <h2 className="text-center text-4xl font-bold leading-tight">CONNEXION</h2>
      </div>
      <div>
        <div className="bg-white ">
              <h2 className="text-2xl font-semibold mb-4 text-textColor p-6">Bienvenue</h2>
              <form onSubmit={handleSubmit} noValidate className="p-6">
                  <FormInput  name="nom" register={register} error={errors.nom} placeholder="Email ou Numéro de téléphone" label="Email ou Numéro de téléphone"/>
                  <FormInput name="password" register={register} type="password" error={errors.password} placeholder="Mot de passe" label="Mot de passe" />
                  
      
                  {isSubmitSuccessful && (
                      <p className="text-green-600 text-sm mb-4">Message envoyé avec succès !</p>
                  )}
      
                  <div className="mt-4">
                      <Button type="submit" disabled={isSubmitting} label="Connexion" color="orange" ButtonClassName="w-full text-white">
                      {isSubmitting ? "Envoi..." : "Envoyer"}
                      </Button>
                  </div>
                  
              </form>
              <p className="text-center mt-1">j'ai oublié mon mot de passe. <Link to="/password" className="text-primary font-semibold">Renitialiser</Link> </p>
              <div className="mt-10 p-6">
                  <Button  label="S'inscrire" color="green"  to="/inscription" ButtonClassName="w-full block text-center text-white" >
                  
                  </Button>
              </div>
        </div>
      </div>
      
    </div>
    </Layout>
  );
}
