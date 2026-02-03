/**
 * Service de gestion des tokens d'authentification
 */

import { AuthTokens } from "@/lib/models";

export class TokenService {
    private static readonly ACCESS_TOKEN_KEY = "accessToken";
    private static readonly REFRESH_TOKEN_KEY = "refreshToken";
    private static readonly TOKENS_KEY = "authTokens";

    /**
     * Sauvegarde les tokens dans le localStorage
     */
    static saveTokens(tokens: AuthTokens): void {
        if (typeof localStorage === "undefined") return;

        localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        localStorage.setItem(this.TOKENS_KEY, JSON.stringify(tokens.toJSON()));
    }

    /**
     * Récupère les tokens depuis le localStorage
     */
    static getTokens(): AuthTokens | null {
        if (typeof localStorage === "undefined") return null;

        const tokensJson = localStorage.getItem(this.TOKENS_KEY);
        if (!tokensJson) return null;

        try {
            return AuthTokens.fromJSON(JSON.parse(tokensJson));
        } catch {
            return null;
        }
    }

    /**
     * Récupère uniquement l'access token
     */
    static getAccessToken(): string | null {
        if (typeof localStorage === "undefined") return null;
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    /**
     * Récupère uniquement le refresh token
     */
    static getRefreshToken(): string | null {
        if (typeof localStorage === "undefined") return null;
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * Supprime tous les tokens
     */
    static clearTokens(): void {
        if (typeof localStorage === "undefined") return;

        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.TOKENS_KEY);
    }

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    static isAuthenticated(): boolean {
        const tokens = this.getTokens();
        return tokens !== null && !tokens.isExpired();
    }

    /**
     * Vérifie si le token doit être rafraîchi
     */
    static shouldRefresh(): boolean {
        const tokens = this.getTokens();
        if (!tokens) return false;

        // Rafraîchir si le token expire dans moins de 5 minutes
        return tokens.isExpired(300);
    }
}
