/**
 * Actions pour l'authentification
 */

import { apiHandler, getApiUrl } from "@/lib/utils/apiHandler";

export interface SignupData {
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
    newsletter: boolean;
    termsAccepted: boolean;
    lang?: string;
}

export interface LoginData {
    emailOrUsername: string;
    password: string;
}

export interface OAuthSignupData {
    pseudo: string;
    newsletter: boolean;
    termsAccepted: boolean;
    provider: string;
}

/**
 * Inscription avec email/password (CSO)
 */
export async function signupWithCredentials(data: SignupData) {
    // Détecter la langue du navigateur si non fournie
    const lang =
        data.lang ||
        (typeof navigator !== "undefined"
            ? navigator.language.split("-")[0]
            : "en");

    return apiHandler(getApiUrl("/users"), {
        method: "POST",
        body: JSON.stringify({
            pseudo: data.pseudo,
            email: data.email,
            passwordHash: data.password,
            confirmPassword: data.confirmPassword,
            provider: "CSO",
            newsletter: data.newsletter,
            termsAccepted: data.termsAccepted,
            lang,
        }),
    });
}

/**
 * Connexion avec email/password
 */
export async function loginWithCredentials(data: LoginData) {
    return apiHandler(getApiUrl("/auth/login"), {
        method: "POST",
        body: JSON.stringify({
            emailOrUsername: data.emailOrUsername,
            password: data.password,
        }),
    });
}

/**
 * Préparer les données OAuth pour la redirection
 */
export function prepareOAuthSignup(data: OAuthSignupData): string {
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
            JSON.stringify({
                pseudo: data.pseudo,
                newsletter: data.newsletter,
                termsAccepted: data.termsAccepted,
                provider: data.provider,
            })
        );
    }

    return getApiUrl(oauthRoutes[data.provider] || "/auth/google");
}

/**
 * Récupérer les données OAuth stockées
 */
export function getOAuthSignupData(): OAuthSignupData | null {
    if (typeof sessionStorage === "undefined") return null;

    const data = sessionStorage.getItem("signup_data");
    if (!data) return null;

    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

/**
 * Nettoyer les données OAuth stockées
 */
export function clearOAuthSignupData() {
    if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("signup_data");
    }
}

/**
 * Vérifier l'email avec le token
 */
export async function verifyEmail(token: string) {
    return apiHandler(getApiUrl(`/auth/verify-email/${token}`), {
        method: "GET",
    });
}

/**
 * Rafraîchir le token d'accès
 */
export async function refreshAccessToken(refreshToken: string) {
    return apiHandler(getApiUrl("/auth/refresh"), {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
    });
}

/**
 * Déconnexion
 */
export async function logout() {
    // Nettoyer le localStorage/sessionStorage
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    return apiHandler(getApiUrl("/auth/logout"), {
        method: "POST",
    });
}
