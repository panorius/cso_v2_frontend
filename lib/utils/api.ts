import { TokenService } from "@/lib/services/TokenService";

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Récupère l'URL de l'API
 */
export function getApiUrl(path: string): string {
    const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
    return `${baseUrl}${path}`;
}

/**
 * Handler générique pour les appels API
 */
export async function apiHandler<T = any>(
    url: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        // Récupérer le token d'authentification
        const token = TokenService.getAccessToken();

        // Préparer les headers
        const headers: HeadersInit = {
            ...(options.headers || {}),
        };

        // Ajouter le token si disponible
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Ajouter Content-Type pour les requêtes JSON (sauf si FormData)
        if (
            options.body &&
            !(options.body instanceof FormData) &&
            !headers["Content-Type"]
        ) {
            headers["Content-Type"] = "application/json";
        }

        // Faire la requête
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Parser la réponse
        const data = await response.json();

        // Gérer les erreurs d'authentification
        if (response.status === 401) {
            TokenService.clearTokens();
            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
            return {
                success: false,
                error: "Session expirée. Veuillez vous reconnecter.",
            };
        }

        // Retourner la réponse
        if (!response.ok) {
            return {
                success: false,
                error:
                    data.error?.message ||
                    data.message ||
                    "Une erreur est survenue",
            };
        }

        return {
            success: true,
            data: data.data || data,
        };
    } catch (error: any) {
        console.error("API Error:", error);
        return {
            success: false,
            error: error.message || "Une erreur réseau est survenue",
        };
    }
}
