/**
 * Gestionnaire centralisé pour les appels API
 * Gère automatiquement les erreurs et retourne un format standard
 */

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    status?: number;
}

export interface ApiOptions extends RequestInit {
    skipErrorParsing?: boolean;
}

/**
 * Wrapper pour les appels API avec gestion d'erreurs centralisée
 */
export async function apiHandler<T = any>(
    url: string,
    options: ApiOptions = {}
): Promise<ApiResponse<T>> {
    const { skipErrorParsing, ...fetchOptions } = options;
    console.log("API Call:", { url, options: fetchOptions });
    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers: {
                "Content-Type": "application/json",
                ...fetchOptions.headers,
            },
        });

        const data = await response.json();
        console.log("API Response:", { url, status: response.status, data });
        if (!response.ok) {
            return {
                success: false,
                error: data.message || `HTTP Error ${response.status}`,
                status: response.status,
                data,
            };
        }

        return {
            success: true,
            data,
            status: response.status,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}

/**
 * Construit l'URL complète de l'API
 */
export function getApiUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
