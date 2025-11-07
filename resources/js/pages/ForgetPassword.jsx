import { Link, useForm, usePage } from "@inertiajs/react";

import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function ForgetPassword() {
  const { status } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/forgot-password", {
      onSuccess: () => {
        reset("email");
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen gap-4">
      <div className="md:flex hidden items-center justify-center bg-primary text-white h-[100vh] shadow-[5px_0_10px_rgba(0,0,0,0.2)]" >
        <h2 className="text-center text-4xl font-bold leading-tight">MOT DE PASSE OUBLIE</h2>
      </div>
      <div>
        <div className="bg-white ">
              <h2 className="text-2xl font-semibold mb-0 text-textColor p-8 py-2">Je rénitialise mon mot de passe</h2>
              {status && (
                <p className="text-green-600 text-sm px-8 pt-4">{status}</p>
              )}
              <form onSubmit={handleSubmit} noValidate className="p-8">
                  <FormInput
                    name="email"
                    type="email"
                    error={errors.email}
                    placeholder="Email"
                    label="Email"
                    value={data.email}
                    onChange={(event) => setData("email", event.target.value)}
                    autoComplete="email"
                  />
                  <div className="mt-8">
                      <Button
                type="submit"
                disabled={processing}
                label={processing ? "Envoi..." : "Envoyer"}
                color="orange"
                ButtonClassName="w-full text-white"
              />
                  </div>
                  
              </form>
              <p className="text-center mt-4">Je me souviens de mon mot de passe. <Link href="/login" className="text-primary font-semibold">Je me connecte</Link> </p>
              
        </div>
      </div>
      
    </div>
  );
}
