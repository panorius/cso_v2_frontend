/**
 * Service de gestion de l'authentification
 */

import {
    SignupCredentials,
    LoginCredentials,
    OAuthSignupData,
    AuthTokens,
    User,
} from "@/lib/models";
import { apiHandler, getApiUrl, ApiResponse } from "@/lib/utils/apiHandler";
import { TokenService } from "./TokenService";

export class AuthService {
    /**
     * Inscription avec email/password
     */
    static async signup(
        credentials: SignupCredentials
    ): Promise<ApiResponse<void>> {
        const validation = credentials.validate();
        if (!validation.valid) {
            return {
                success: false,
                error: validation.errors.join(", "),
            };
        }

        return apiHandler(getApiUrl("/users"), {
            method: "POST",
            body: JSON.stringify(credentials.toAPIFormat()),
        });
    }

    /**
     * Connexion avec email/password
     */
    static async login(
        credentials: LoginCredentials
    ): Promise<
        ApiResponse<{ accessToken: string; refreshToken: string; user?: User }>
    > {
        const validation = credentials.validate();
        if (!validation.valid) {
            return {
                success: false,
                error: validation.errors.join(", "),
            };
        }

        const result = await apiHandler<{
            success: boolean;
            data: {
                accessToken: string;
                refreshToken: string;
                expiresIn?: number;
                user?: any;
            };
        }>(getApiUrl("/auth/login"), {
            method: "POST",
            body: JSON.stringify(credentials.toAPIFormat()),
        });

        if (result.success && result.data) {
            // La réponse du backend est { success: true, data: { accessToken, refreshToken, ... } }
            const authData = result.data.data || result.data;

            // Sauvegarder les tokens
            const tokens = new AuthTokens({
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                expiresIn: authData.expiresIn,
            });
            TokenService.saveTokens(tokens);

            // Créer l'objet User si disponible
            if (authData.user) {
                authData.user = User.fromJSON(authData.user);
            }

            // Retourner les données dans le bon format
            return {
                success: true,
                data: {
                    accessToken: authData.accessToken,
                    refreshToken: authData.refreshToken,
                    user: authData.user,
                },
            };
        }

        return result as any;
    }

    /**
     * Déconnexion
     */
    static async logout(): Promise<ApiResponse<void>> {
        const accessToken = TokenService.getAccessToken();

        const result = await apiHandler(getApiUrl("/auth/logout"), {
            method: "POST",
            headers: accessToken
                ? {
                      Authorization: `Bearer ${accessToken}`,
                  }
                : {},
        });

        // Toujours nettoyer les tokens locaux
        TokenService.clearTokens();

        return result;
    }

    /**
     * Rafraîchir le token d'accès
     */
    static async refreshToken(): Promise<ApiResponse<AuthTokens>> {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) {
            return {
                success: false,
                error: "No refresh token available",
            };
        }

        const result = await apiHandler<{
            success: boolean;
            data: {
                accessToken: string;
                refreshToken: string;
                expiresIn?: number;
            };
        }>(getApiUrl("/auth/refresh"), {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
        });

        if (result.success && result.data) {
            // La réponse du backend est { success: true, data: { accessToken, refreshToken, ... } }
            const authData = result.data.data || result.data;

            const tokens = new AuthTokens({
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                expiresIn: authData.expiresIn,
            });
            TokenService.saveTokens(tokens);

            return {
                success: true,
                data: tokens,
            };
        }

        return {
            success: false,
            error: result.error,
        };
    }

    /**
     * Vérifier l'email
     */
    static async verifyEmail(token: string): Promise<ApiResponse<void>> {
        return apiHandler(getApiUrl(`/auth/verify-email/${token}`), {
            method: "GET",
        });
    }

    /**
     * Préparer les données OAuth et obtenir l'URL de redirection
     */
    static prepareOAuthSignup(data: OAuthSignupData): string | null {
        const validation = data.validate();
        if (!validation.valid) {
            console.error("OAuth validation errors:", validation.errors);
            return null;
        }

        const oauthRoutes: Record<string, string> = {
            google: "/auth/google",
            facebook: "/auth/facebook",
            twitter: "/auth/twitter",
            discord: "/auth/discord",
        };

        // Stocker les données temporaires
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(
                "signup_data",
                JSON.stringify(data.toJSON())
            );
        }

        return getApiUrl(oauthRoutes[data.provider] || "/auth/google");
    }

    /**
     * Récupérer les données OAuth stockées
     */
    static getOAuthSignupData(): OAuthSignupData | null {
        if (typeof sessionStorage === "undefined") return null;

        const data = sessionStorage.getItem("signup_data");
        if (!data) return null;

        try {
            return OAuthSignupData.fromJSON(JSON.parse(data));
        } catch {
            return null;
        }
    }

    /**
     * Nettoyer les données OAuth
     */
    static clearOAuthSignupData(): void {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.removeItem("signup_data");
        }
    }

    /**
     * Vérifier si l'utilisateur est connecté
     */
    static isAuthenticated(): boolean {
        return TokenService.isAuthenticated();
    }

    /**
     * Obtenir le token d'accès actuel
     */
    static getAccessToken(): string | null {
        return TokenService.getAccessToken();
    }
}
