"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = searchParams.get("token");
        const refresh = searchParams.get("refresh");
        const errorParam = searchParams.get("error");

        if (errorParam) {
            setError(errorParam);
            setTimeout(() => {
                router.push("/login?error=" + errorParam);
            }, 3000);
            return;
        }

        if (token && refresh) {
            // Vérifier si on vient d'un signup avec des données additionnelles
            const signupDataStr = sessionStorage.getItem("signup_data");

            if (signupDataStr) {
                // Données de signup présentes, mettre à jour l'utilisateur
                const signupData = JSON.parse(signupDataStr);

                // TODO: Appeler l'API pour mettre à jour le pseudo, newsletter, etc.
                console.log("Completing signup with:", signupData);

                // Nettoyer le sessionStorage
                sessionStorage.removeItem("signup_data");
            }

            // Stocker les tokens dans localStorage
            localStorage.setItem("accessToken", token);
            localStorage.setItem("refreshToken", refresh);

            // Optionnellement, stocker dans des cookies
            document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Strict`;
            document.cookie = `refreshToken=${refresh}; path=/; max-age=604800; SameSite=Strict`;

            // Rediriger vers le dashboard
            router.push("/dashboard");
        } else {
            setError("No tokens received");
            setTimeout(() => {
                router.push("/login?error=no_tokens");
            }, 3000);
        }
    }, [searchParams, router]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-purple-cso-bg">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Authentication Error
                    </h1>
                    <p className="text-gray-700">Error: {error}</p>
                    <p className="text-gray-500 mt-2">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-cso-bg">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Authenticating...
                </h1>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-cso"></div>
                </div>
                <p className="text-gray-600 mt-4 text-center">
                    Please wait while we complete your authentication.
                </p>
            </div>
        </div>
    );
}
