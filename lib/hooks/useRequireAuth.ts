"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/AuthContext";

/**
 * Hook simplifié pour les composants qui nécessitent une authentification
 * Utilise le contexte AuthContext pour éviter les appels API redondants
 *
 * @param redirectTo - URL vers laquelle rediriger si non authentifié (par défaut: "/")
 * @returns L'objet user et les méthodes du contexte d'authentification
 */
export function useRequireAuth(redirectTo: string = "/") {
    const router = useRouter();
    const auth = useAuthContext();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            router.push(redirectTo);
        }
    }, [auth.isAuthenticated, auth.isLoading, router, redirectTo]);

    return auth;
}
