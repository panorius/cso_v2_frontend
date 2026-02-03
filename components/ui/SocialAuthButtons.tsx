import React, { useState } from "react";
import { Button } from "@heroui/button";
import { StyledButton } from "./button";

interface SocialAuthButtonProps {
    provider: "cso" | "google" | "facebook" | "twitter" | "discord";
    onClick?: () => void;
    isSelected?: boolean;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
    provider,
    onClick,
    isSelected = false,
}) => {
    const configs = {
        cso: {
            bgColor: "var(--color-orange)",
            iconClass: "logo-icon",
            label: "Cso",
        },
        google: {
            bgColor: "var(--color-google)",
            iconClass: "google-brands",
            label: "Google",
        },
        facebook: {
            bgColor: "var(--color-facebook)",
            iconClass: "facebook-f-brands",
            label: "Facebook",
        },
        twitter: {
            bgColor: "var(--color-twitter)",
            iconClass: "x-twitter-brands",
            label: "Twitter/X",
        },
        discord: {
            bgColor: "var(--color-discord)",
            iconClass: "discord-brands",
            label: "Discord",
        },
    };

    const config = configs[provider];

    return (
        <StyledButton
            icon={config.iconClass}
            onClick={onClick}
            bgColor={config.bgColor}
            className=""
            buttonType="squared"
        />
        // <Button
        //     isIconOnly
        //     type="button"
        //     onClick={onClick}
        //     className={`text-white transition-all duration-200 shadow-md ${
        //         isSelected
        //             ? "ring-2 ring-white ring-offset-gray-800"
        //             : "opacity-60 hover:opacity-100"
        //     }`}
        //     style={{
        //         backgroundColor: config.bgColor,
        //         minWidth: "40px",
        //         width: "40px",
        //         height: "40px",
        //     }}
        //     radius="md"
        //     aria-label={`Sign in with ${config.label}`}
        //     disabled={isSelected}
        // >
        //     <i className={config.iconClass} style={{ fontSize: "20px" }}></i>
        // </Button>
    );
};

interface SocialAuthButtonsProps {
    mode?: "signin" | "signup";
    onProviderChange?: (provider: string) => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
    mode = "signin",
    onProviderChange,
}) => {
    const [selectedProvider, setSelectedProvider] = useState<string>("cso");

    const handleSocialLogin = (provider: string) => {
        setSelectedProvider(provider);

        // Notifier le parent du changement de provider
        if (onProviderChange) {
            onProviderChange(provider);
        }

        // En mode signup, on ne redirige pas immédiatement
        // Le parent gérera la redirection après validation du formulaire
        if (mode === "signup") {
            console.log(`Selected ${provider} for signup`);
            return;
        }

        // En mode signin, redirection immédiate pour les providers OAuth
        if (provider === "cso") {
            // Provider par défaut, ne fait rien (formulaire classique)
            console.log("Using CSO authentication");
            return;
        }

        // Appel aux routes OAuth pour les autres providers
        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const oauthRoutes: Record<string, string> = {
            google: `${apiUrl}/auth/google`,
            facebook: `${apiUrl}/auth/facebook`,
            twitter: `${apiUrl}/auth/twitter`,
            discord: `${apiUrl}/auth/discord`,
        };

        const route = oauthRoutes[provider];
        if (route) {
            console.log(
                `Redirecting to ${route} for ${provider} authentication`,
            );
            window.location.href = route;
        }
    };

    return (
        <div className="flex justify-center gap-3 mb-4">
            <SocialAuthButton
                provider="cso"
                onClick={() => handleSocialLogin("cso")}
                isSelected={selectedProvider === "cso"}
            />
            <SocialAuthButton
                provider="google"
                onClick={() => handleSocialLogin("google")}
                isSelected={selectedProvider === "google"}
            />
            <SocialAuthButton
                provider="facebook"
                onClick={() => handleSocialLogin("facebook")}
                isSelected={selectedProvider === "facebook"}
            />
            <SocialAuthButton
                provider="twitter"
                onClick={() => handleSocialLogin("twitter")}
                isSelected={selectedProvider === "twitter"}
            />
            <SocialAuthButton
                provider="discord"
                onClick={() => handleSocialLogin("discord")}
                isSelected={selectedProvider === "discord"}
            />
        </div>
    );
};
