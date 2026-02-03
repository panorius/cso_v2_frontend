"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { RunningCharacterLoader } from "@/components/ui/RunningCharacterLoader";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    loadingMessage?: string;
}

/**
 * Composant pour protéger les routes nécessitant une authentification
 * Vérifie que l'utilisateur est connecté et que son token est valide
 */
export function ProtectedRoute({
    children,
    redirectTo = "/",
    loadingMessage = "Vérification de l'authentification...",
}: ProtectedRouteProps) {
    const router = useRouter();
    const { isAuthenticated, isLoading, error } = useAuthContext();

    useEffect(() => {
        // Si la vérification est terminée et l'utilisateur n'est pas authentifié
        if (!isLoading && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    // Afficher un loader pendant la vérification
    if (isLoading) {
        return <RunningCharacterLoader message={loadingMessage} />;
    }

    // Si il y a une erreur ou pas authentifié, ne rien afficher
    // (la redirection est en cours)
    if (error || !isAuthenticated) {
        return <RunningCharacterLoader message="Redirection..." />;
    }

    // L'utilisateur est authentifié, afficher le contenu
    return <>{children}</>;
}
