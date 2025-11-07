import { router, Link, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const schema = yup.object({
  nom: yup.string().required("Le nom est requis."),
  prenom: yup.string().required("Le prénom est requis."),
  email: yup.string().email("Email invalide.").required("L'email est requis."),
  téléphone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Téléphone invalide. Le numéro doit contenir 10 chiffres.")
    .required("Le numéro de téléphone est requis."),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .required("Le mot de passe est requis."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent être identiques.")
    .required("La confirmation du mot de passe est requise."),
}).required();


export default function Inscription() {
  // ✅ Accès aux erreurs backend (Laravel) via Inertia
  const { errors: backendErrors } = usePage().props;

  // ✅ Gestion du formulaire côté client
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      téléphone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ✅ Envoi des données à Laravel
  const onSubmit = (data) => {
    router.post(
      "/inscription",
      {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.téléphone, // sans accent pour correspondre à Laravel
        password: data.password,
        password_confirmation: data.confirmPassword, // attendu par Laravel
      },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen gap-4">
      {/* Section gauche (visuel) */}
      <div className="md:flex hidden items-center justify-center bg-primary text-white h-[100vh] shadow-[5px_0_10px_rgba(0,0,0,0.2)]">
        <h2 className="text-center text-4xl font-bold leading-tight">
          INSCRIPTION
        </h2>
      </div>

      {/* Section droite (formulaire) */}
      <div className="bg-white px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-textColor">
          Je vous rejoins
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput
            name="nom"
            register={register}
            error={errors.nom || backendErrors?.nom}
            placeholder="Ex: Koffi"
            label="Nom"
          />

          <FormInput
            name="prenom"
            register={register}
            error={errors.prenom || backendErrors?.prenom}
            placeholder="Ex: Charles"
            label="Prénom"
          />

          <FormInput
            name="email"
            register={register}
            type="email"
            error={errors.email || backendErrors?.email}
            placeholder="Email"
            label="Email"
            autoComplete="email"
          />

          <FormInput
            name="téléphone"
            register={register}
            error={errors.téléphone || backendErrors?.telephone}
            placeholder="Ex: 0788691433"
            label="Téléphone"
          />

          <FormInput
            name="password"
            register={register}
            type="password"
            error={errors.password || backendErrors?.password}
            placeholder="Mot de passe"
            label="Mot de passe"
            autoComplete="new-password"
          />

          <FormInput
            name="confirmPassword"
            register={register}
            type="password"
            error={errors.confirmPassword}
            placeholder="Confirmer le mot de passe"
            label="Confirmation du mot de passe"
            autoComplete="new-password"
          />

          {isSubmitSuccessful && (
            <p className="text-green-600 text-sm mb-4">
              Inscription réussie !
            </p>
          )}

          {/* Affiche les erreurs globales backend si besoin */}
          {backendErrors && Object.keys(backendErrors).length > 0 && (
            <div className="bg-red-100 text-red-700 text-sm p-2 rounded mt-2">
              {Object.values(backendErrors).map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              label="S'inscrire"
              color="orange"
              ButtonClassName="w-full text-white"
            >
              {isSubmitting ? "Envoi..." : "S'inscrire"}
            </Button>
          </div>
        </form>

        <p className="text-center mt-2">
          J'ai déjà un compte.{" "}
          <Link href="/login" className="text-primary font-semibold">
            Je me connecte
          </Link>
        </p>
      </div>
    </div>
  );
}
