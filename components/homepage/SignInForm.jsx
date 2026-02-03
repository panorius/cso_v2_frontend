"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ClassicInput } from "@/components/ui/inputs";
import { SocialAuthButtons } from "@/components/ui/SocialAuthButtons";
import { Link, Button } from "@heroui/react";
import { useToast } from "@/lib/hooks/useToast";
import { AuthService } from "@/lib/services";
import { LoginCredentials } from "@/lib/models";
import { formatAPIError } from "@/lib/utils/apiErrorHandler";
import { StyledButton } from "../ui/button";

export const SignInForm = () => {
    const t = useTranslations("auth");
    const tCommon = useTranslations("common");
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: "",
        pseudo: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier qu'au moins un identifiant est fourni
        if (!formData.email && !formData.pseudo) {
            toast.error(t("emailOrUsername") + " " + tCommon("error"));
            return;
        }

        // Créer l'objet credentials avec validation
        const credentials = new LoginCredentials({
            email: formData.email,
            pseudo: formData.pseudo,
            password: formData.password,
        });

        // Valider les données
        const validation = credentials.validate();
        if (!validation.valid) {
            toast.error(validation.errors[0]);
            return;
        }
        console.log("Credentials:", credentials);
        // Appeler le service d'authentification
        const result = await AuthService.login(credentials);

        if (!result.success) {
            toast.error({
                title: t("loginFailed"),
                description: formatAPIError(
                    result.error,
                    t("invalidCredentials"),
                ),
            });
            return;
        }

        toast.success({
            title: t("loginSuccess"),
            description: t("loginSuccessDescription"),
        });

        // Rediriger vers le dashboard
        window.location.href = "/dashboard";
    };

    return (
        <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
            {/* Social Auth Buttons */}
            <SocialAuthButtons mode="signin" />

            <div className="flex items-center justify-center gap-2">
                <ClassicInput
                    label={t("email")}
                    placeholder={t("email")}
                    type="email"
                    variant="faded"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                            pseudo: e.target.value ? "" : prev.pseudo,
                        }))
                    }
                />
                <span className="px-1 text-sm text-default-500">
                    {tCommon("or")}
                </span>
                <ClassicInput
                    label={t("pseudo")}
                    placeholder={t("pseudo")}
                    type="text"
                    variant="faded"
                    autoComplete="username"
                    value={formData.pseudo}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            pseudo: e.target.value,
                            email: e.target.value ? "" : prev.email,
                        }))
                    }
                />
            </div>
            <ClassicInput
                isRequired
                label={t("password")}
                placeholder={t("password")}
                type="password"
                variant="faded"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                    }))
                }
            />
            <div className="flex justify-center gap-2">
                <StyledButton
                    type="submit"
                    fullWidth
                    bgColor={"#FFAF3A"}
                    className="font-semibold text-white"
                >
                    {t("connect")}
                </StyledButton>
            </div>
        </form>
    );
};
