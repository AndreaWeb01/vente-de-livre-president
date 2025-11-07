import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { router } from "@inertiajs/react";
import Button from "./Button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const schema = yup.object({
  nom: yup.string().required("Le nom est requis."),
  prenom: yup.string().required("Le prénom est requis."),
  telephone: yup
    .string()
    .required("Le téléphone est requis")
    .matches(/^\d{8,15}$/, "Téléphone invalide. (8 à 15 chiffres)"),
  email: yup.string().email("Email invalide").required("L'email est requis."),
  adresse: yup.string().nullable(),
  ville: yup.string().nullable(),
  quartier: yup.string().nullable(),
  mode_paiement: yup.string().oneOf(["mobile_money", "card", "cash"]).required(),
  notes: yup.string().nullable(),
}).required();

export default function PaieLigne({ user }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: user?.nom || "",
      prenom: user?.prenom || "",
      telephone: (user?.telephone || "").replace(/\D/g, ""),
      email: user?.email || "",
      pays: user?.pays || "CI",
      dialCode: "225",
      adresse: user?.adresse || "",
      ville: user?.ville || "",
      quartier: user?.quartier || "",
      mode_paiement: "mobile_money",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    // Envoyer uniquement des chiffres (aucun E.164)
    const payload = { ...data, telephone: (data.telephone || '').replace(/\D/g, '') };

    console.log("Payload envoyé :", payload);

    // Soumettre le formulaire au contrôleur
    router.post("/public/commande", payload, { preserveScroll: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput name="nom" register={register} error={errors.nom} label="Nom" />
      <FormInput name="prenom" register={register} error={errors.prenom} label="Prénom" />
      <FormInput name="email" register={register} error={errors.email} label="Email" />

      <div>
        <label className="block text-sm font-medium mb-1">Téléphone</label>
        <PhoneInput
          country={watch("pays").toLowerCase() || "ci"}
          value={watch("telephone") || ''}
          onChange={(val, country) => {
            const digits = val.replace(/\D/g, "");
            setValue("telephone", digits, { shouldValidate: true });
            setValue("pays", country.countryCode.toUpperCase());
          }}
          inputProps={{ name: "telephone" }}
          specialLabel=""
          enableAreaCodes
        />
        {errors.telephone && (
          <p className="text-red-600 text-xs mt-1">{errors.telephone.message}</p>
        )}
      </div>

      <FormSelect
        name="mode_paiement"
        label="Moyen de paiement"
        register={register}
        error={errors.mode_paiement}
        options={[
          { value: "mobile_money", label: "Mobile Money" },
          { value: "card", label: "Carte" },
          { value: "cash", label: "Espèces" },
        ]}
      />

      <FormInput name="adresse" register={register} error={errors.adresse} label="Adresse" />
      <FormInput name="ville" register={register} error={errors.ville} label="Ville" />
      <FormInput name="quartier" register={register} error={errors.quartier} label="Quartier" />
      <FormInput
        name="pays"
        label="Pays"
        register={register}
        error={errors.pays}
      />
      <FormInput name="notes" register={register} error={errors.notes} label="Notes (optionnel)" />

      <div>
        <Button type="submit" disabled={isSubmitting} label="Valider ma commande" color="bg-primary"/>
      </div>
    </form>
  );
}
