"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ClassicInput } from "@/components/ui/inputs";
import { ClassicCheckbox } from "@/components/ui/checkbox";
import { SocialAuthButtons } from "@/components/ui/SocialAuthButtons";
import { Link, Button } from "@heroui/react";
import { useToast } from "@/lib/hooks/useToast";
import { AuthService } from "@/lib/services";
import { SignupCredentials, OAuthSignupData } from "@/lib/models";
import { formatAPIError } from "@/lib/utils/apiErrorHandler";
import { StyledButton } from "../ui/button";

export const SignUpForm = ({ onSuccess }) => {
    const t = useTranslations("auth");
    const toast = useToast();
    const [signupProvider, setSignupProvider] = useState("cso");
    const [formData, setFormData] = useState({
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: "",
        newsletter: false,
        termsAccepted: false,
    });

    const handleProviderChange = (provider) => {
        setSignupProvider(provider);
        if (provider !== "cso") {
            setFormData((prev) => ({
                ...prev,
                email: "",
                password: "",
                confirmPassword: "",
            }));
        }
    };

    const handleCSOSignup = async () => {
        // Créer l'objet credentials avec validation
        const credentials = new SignupCredentials({
            pseudo: formData.pseudo,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            newsletter: formData.newsletter,
            termsAccepted: true,
        });

        // Valider les données
        const validation = credentials.validate();
        if (!validation.valid) {
            toast.error(validation.errors[0]);
            return false;
        }

        // Appeler le service d'authentification
        const result = await AuthService.signup(credentials);

        if (!result.success) {
            toast.error({
                title: t("signupFailed"),
                description: formatAPIError(result.error, t("fillAllFields")),
            });
            return false;
        }

        toast.success({
            title: t("accountCreated"),
            description: t("checkEmailVerification"),
        });

        // Réinitialiser le formulaire
        setFormData({
            pseudo: "",
            email: "",
            password: "",
            confirmPassword: "",
            newsletter: false,
            termsAccepted: false,
        });

        // Notifier le parent du succès
        if (onSuccess) {
            onSuccess();
        }

        return true;
    };

    const handleOAuthSignup = () => {
        // Créer l'objet OAuth avec validation
        const oauthData = new OAuthSignupData({
            pseudo: formData.pseudo,
            newsletter: formData.newsletter,
            termsAccepted: formData.termsAccepted,
            provider: signupProvider,
        });

        // Valider les données
        const validation = oauthData.validate();
        if (!validation.valid) {
            toast.error(validation.errors[0]);
            return;
        }

        // Préparer et rediriger vers OAuth
        const oauthUrl = AuthService.prepareOAuthSignup(oauthData);
        if (!oauthUrl) {
            toast.error("Failed to prepare OAuth signup");
            return;
        }

        window.location.href = oauthUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            toast.warning(t("termsAccept", { link: t("termsAndConditions") }));
            return;
        }

        if (signupProvider === "cso") {
            await handleCSOSignup();
        } else {
            handleOAuthSignup();
        }
    };

    return (
        <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
            {/* Social Auth Buttons */}
            <SocialAuthButtons
                mode="signup"
                onProviderChange={handleProviderChange}
            />

            {/* Pseudo (toujours affiché) */}
            <ClassicInput
                isRequired
                label={t("pseudo")}
                placeholder={t("pseudo")}
                type="text"
                variant="faded"
                value={formData.pseudo}
                autoComplete="hidden"
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        pseudo: e.target.value,
                    }))
                }
            />

            {/* Champs CSO uniquement */}
            {signupProvider === "cso" && (
                <>
                    <ClassicInput
                        isRequired
                        label={t("email")}
                        placeholder={t("email")}
                        type="email"
                        variant="faded"
                        value={formData.email}
                        autoComplete="hidden"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                    <ClassicInput
                        isRequired
                        label={t("password")}
                        placeholder={t("password")}
                        type="password"
                        variant="faded"
                        value={formData.password}
                        autoComplete="hidden"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                    <ClassicInput
                        isRequired
                        label={t("confirmPassword")}
                        placeholder={t("confirmPassword")}
                        type="password"
                        variant="faded"
                        value={formData.confirmPassword}
                        autoComplete="hidden"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                            }))
                        }
                    />
                </>
            )}

            {/* Newsletter */}
            <ClassicCheckbox
                isSelected={formData.newsletter}
                onValueChange={(checked) =>
                    setFormData((prev) => ({
                        ...prev,
                        newsletter: checked,
                    }))
                }
            >
                {t("newsletter")}
            </ClassicCheckbox>

            {/* Terms */}
            <ClassicCheckbox
                isRequired
                isSelected={formData.termsAccepted}
                onValueChange={(checked) =>
                    setFormData((prev) => ({
                        ...prev,
                        termsAccepted: checked,
                    }))
                }
            >
                {t("termsAccept", { link: "" }).replace("{link}", "")}
                <Link
                    size="sm"
                    className="z-10 text-orange"
                    href="/terms"
                    onClick={(e) => e.preventDefault()}
                >
                    {t("termsAndConditions")}
                </Link>
            </ClassicCheckbox>

            <div className="flex justify-center">
                {/* <Button
                    type="submit"
                    fullWidth
                    color="warning"
                    className="font-semibold text-white bg-orange"
                >
                    {signupProvider === "cso"
                        ? t("signUp")
                        : t("signUpWith", {
                              provider: signupProvider.toUpperCase(),
                          })}
                </Button> */}
                <StyledButton type="submit" fullWidth color="orange" size="lg">
                    {signupProvider === "cso"
                        ? t("signUp")
                        : t("signUpWith", {
                              provider: signupProvider.toUpperCase(),
                          })}
                </StyledButton>
            </div>
        </form>
    );
};
