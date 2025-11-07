import { router, Link } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../components/FormInput";
import Button from "../components/Button";

const schema = yup.object({
  email: yup.string().email("Email invalide.").required("L'email est requis."),
}).required();

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit = (data) => {
    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    router.post("/forgot-password", { ...data, _token: csrf });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen gap-4">
      <div className="md:flex hidden items-center justify-center bg-primary text-white h-[100vh] shadow-[5px_0_10px_rgba(0,0,0,0.2)]" >
        <h2 className="text-center text-4xl font-bold leading-tight">MOT DE PASSE OUBLIÉ</h2>
      </div>
      <div>
        <div className="bg-white ">
          <h2 className="text-2xl font-semibold mb-0 text-textColor p-8 py-2">Je réinitialise mon mot de passe</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
            <FormInput 
              name="email" 
              register={register} 
              type="email" 
              error={errors.email} 
              placeholder="Email" 
              label="Email" 
            />
            
            <div className="mt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
                color="orange"
                ButtonClassName="w-full text-white"
              />
            </div>
          </form>
          <p className="text-center mt-4">
            Je me souviens de mon mot de passe. 
            <Link href="/login" className="text-primary font-semibold">Je me connecte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}