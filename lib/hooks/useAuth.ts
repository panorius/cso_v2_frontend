"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TokenService } from "@/lib/services/TokenService";
import { AuthService } from "@/lib/services/AuthService";
import { UserService } from "@/lib/services/UserService";
import { User } from "@/lib/models";

export interface UseAuthReturn {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

/**
 * Hook pour gérer l'authentification de l'utilisateur
 * Vérifie si le token est valide et si l'utilisateur existe encore
 */
export function useAuth(): UseAuthReturn {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Vérifie l'authentification et récupère l'utilisateur
     */
    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        // Vérifier si un token existe
        const hasToken = TokenService.isAuthenticated();

        if (!hasToken) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        // Vérifier si le token doit être rafraîchi
        if (TokenService.shouldRefresh()) {
            const refreshResult = await AuthService.refreshToken();
            if (!refreshResult.success) {
                // Le refresh a échoué, déconnecter l'utilisateur
                TokenService.clearTokens();
                setIsAuthenticated(false);
                setUser(null);
                setError("Session expirée. Veuillez vous reconnecter.");
                setIsLoading(false);
                return;
            }
        }

        // Récupérer les informations de l'utilisateur
        try {
            const result = await UserService.getCurrentUser();

            if (result.success && result.data) {
                setUser(result.data);
                setIsAuthenticated(true);
                setError(null);
            } else {
                // L'utilisateur n'existe plus ou le token est invalide
                TokenService.clearTokens();
                setIsAuthenticated(false);
                setUser(null);
                setError(
                    result.error ||
                        "Impossible de récupérer les informations utilisateur."
                );
            }
        } catch (err) {
            TokenService.clearTokens();
            setIsAuthenticated(false);
            setUser(null);
            setError("Erreur lors de la vérification de l'authentification.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Rafraîchit manuellement les informations de l'utilisateur
     */
    const refreshUser = useCallback(async () => {
        await checkAuth();
    }, [checkAuth]);

    /**
     * Déconnexion de l'utilisateur
     */
    const logout = useCallback(async () => {
        setIsLoading(true);
        await AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
        setIsLoading(false);
        router.push("/");
    }, [router]);

    // Vérifier l'authentification au montage du composant
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Vérifier périodiquement si le token est toujours valide
    useEffect(() => {
        if (!isAuthenticated) return;

        // Vérifier toutes les 5 minutes
        const interval = setInterval(
            () => {
                checkAuth();
            },
            5 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, [isAuthenticated, checkAuth]);

    return {
        user,
        isLoading,
        isAuthenticated,
        error,
        refreshUser,
        logout,
    };
}
