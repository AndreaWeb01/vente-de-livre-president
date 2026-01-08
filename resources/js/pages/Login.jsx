import { useForm, router } from "@inertiajs/react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    router.post("/public/login", { ...data, _token: csrf });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-screen gap-4">
      <div className="md:flex items-center justify-center bg-primary text-white h-[100vh] shadow-[5px_0_10px_rgba(0,0,0,0.2)] hidden">
        <h2 className="text-center text-4xl font-bold leading-tight">
          {t("auth.loginTitle")}
        </h2>
      </div>

      <div>
        <div className="bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-textColor p-6">
            {t("auth.welcomeBack")}
          </h2>

          <form onSubmit={handleSubmit} className="p-6">
            <FormInput
              name="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              error={errors.email}
              placeholder={t("auth.emailPlaceholder")}
              label={t("auth.emailLabel")}
            />

            <FormInput
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              error={errors.password}
              placeholder={t("auth.passwordPlaceholder")}
              label={t("auth.passwordLabel")}
            />

            <div className="mt-4">
              <Button
                type="submit"
                disabled={processing}
                label={processing ? t("auth.loggingIn") : t("auth.loginCTA")}
                color="orange"
                ButtonClassName="w-full text-white"
              />
            </div>
          </form>

          <p className="text-center mt-1">
            {t("auth.forgotPrompt")}{" "}
            <a href="admin/forgot-password" className="text-primary font-semibold">
              {t("auth.resetLink")}
            </a>
          </p>

          <div className="mt-10 p-6">
            <Button
              label={t("auth.registerCTA")}
              color="green"
              to="/inscription"
              ButtonClassName="w-full block text-center text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
