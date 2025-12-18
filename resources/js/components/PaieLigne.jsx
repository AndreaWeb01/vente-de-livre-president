import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Ziggy } from "../ziggy";
import Button from "./Button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const MOBILE_METHODS = [
  { value: "orange_ci", label: "Orange Money" },
  { value: "mtn_ci", label: "MTN Mobile Money" },
  { value: "wave_ci", label: "Wave" },
  { value: "moov_ci", label: "Moov Money" },
];

const schema = yup
  .object({
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
    mode_paiement: yup.string().oneOf(["mobile_money", "carte_credit", "espece"]).required(),
    moneroo_method: yup
      .string()
      .nullable()
      .when("mode_paiement", {
        is: "mobile_money",
        then: (schema) =>
          schema
            .required("Choisissez un opérateur Mobile Money")
            .oneOf(MOBILE_METHODS.map((m) => m.value)),
        otherwise: (schema) => schema.nullable(),
      }),
    notes: yup.string().nullable(),
  })
  .required();

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
      moneroo_method: MOBILE_METHODS[0]?.value || "orange_ci",
      notes: "",
    },
  });

  const modePaiement = watch("mode_paiement");
  const currentMethod = watch("moneroo_method");

  useEffect(() => {
    if (modePaiement !== "mobile_money") {
      setValue("moneroo_method", null, { shouldValidate: true });
    } else if (!currentMethod) {
      setValue("moneroo_method", MOBILE_METHODS[0]?.value || "orange_ci", {
        shouldValidate: true,
      });
    }
  }, [modePaiement, currentMethod, setValue]);

  const onSubmit = (data) => {
    // Envoyer uniquement des chiffres (aucun E.164)
    const payload = { ...data, telephone: (data.telephone || '').replace(/\D/g, '') };

    console.log("Payload envoyé :", payload);

    // Soumettre le formulaire au contrôleur
    let postUrl = "/public/commande-livres-physique";
    try {
      postUrl = route("public.commande.physique.store", [], false, Ziggy);
    } catch (_) {}
    router.post(postUrl, payload, { preserveScroll: true });
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
          { value: "carte_credit", label: "Carte" },
          { value: "espece", label: "Espèces" },
        ]}
      />
      {watch("mode_paiement") === "mobile_money" && (
        <div>
          <p className="block text-sm font-medium mb-2">Sélectionnez l’opérateur Mobile Money</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOBILE_METHODS.map((option) => {
              const checked = currentMethod === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:border-secondary ${
                    checked ? "border-secondary bg-secondary/10" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register("moneroo_method")}
                    className="cursor-pointer"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
          {errors.moneroo_method && (
            <p className="text-red-600 text-xs mt-1">{errors.moneroo_method.message}</p>
          )}
        </div>
      )}
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
