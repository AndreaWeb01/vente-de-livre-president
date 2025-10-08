import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Je vous rejoins"
            description=""
        >
            <Head title="Inscription" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            {/* Nom */}
                            <div className="grid gap-2">
                                <Label htmlFor="nom" className="text-black font-serif">Nom</Label>
                                <Input
                                    id="nom"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="family-name"
                                    name="nom"
                                    placeholder="Adewale"
                                    className="border-gray-300 rounded-none"
                                />
                                <InputError
                                    message={errors.nom}
                                    className="mt-2"
                                />
                            </div>

                            {/* Prénom */}
                            <div className="grid gap-2">
                                <Label htmlFor="prenom" className="text-black font-serif">Prenom</Label>
                                <Input
                                    id="prenom"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="given-name"
                                    name="prenom"
                                    placeholder="Chara"
                                    className="border-gray-300 rounded-none"
                                />
                                <InputError
                                    message={errors.prenom}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-black font-serif">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    placeholder=""
                                    className="border-gray-300 rounded-none"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Téléphone */}
                            <div className="grid gap-2">
                                <Label htmlFor="telephone" className="text-black font-serif">Téléphone</Label>
                                <Input
                                    id="telephone"
                                    type="text"
                                    required
                                    tabIndex={4}
                                    autoComplete="tel"
                                    name="telephone"
                                    placeholder="+225 0702020202"
                                    className="border-gray-300 rounded-none"
                                />
                                <InputError message={errors.telephone} />
                            </div>

                            {/* Mot de passe */}
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-black font-serif">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder=""
                                    className="border-gray-300 rounded-none"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirmation mot de passe */}
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-black font-serif">
                                    Confirmer mot de passe
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder=""
                                    className="border-gray-300 rounded-none"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-serif font-bold rounded-none"
                                tabIndex={7}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                S'inscrire
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            J'ai déjà un compte.{' '}
                            <TextLink href={login()} tabIndex={8} className="text-green-600 hover:text-green-700">
                                Je me connecte
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
