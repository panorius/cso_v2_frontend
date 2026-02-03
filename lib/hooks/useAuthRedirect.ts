"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TokenService } from "@/lib/services/TokenService";

/**
 * Hook pour rediriger les utilisateurs déjà connectés
 */
export function useAuthRedirect(redirectTo: string = "/dashboard") {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Vérifier si l'utilisateur a un token valide
        const token = TokenService.getAccessToken();

        if (token) {
            // Afficher le loader et rediriger après un court délai
            setIsRedirecting(true);
            setTimeout(() => {
                router.push(redirectTo);
            }, 800);
        }
    }, [router, redirectTo]);

    return { isRedirecting };
}
