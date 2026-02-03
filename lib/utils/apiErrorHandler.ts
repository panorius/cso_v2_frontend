/**
 * Formate les erreurs d'API pour l'affichage dans les toasts
 * Structure attendue: { success: false, error: { code: string, message: string } }
 */
export interface APIError {
    code: string;
    message: string;
}

export interface APIResponse<T = any> {
    success: boolean;
    data?: T;
    error?: APIError;
}

/**
 * Extrait le message d'erreur d'une réponse API
 * @param error - L'objet erreur de l'API { code, message }
 * @returns Le message d'erreur
 */
export function getAPIErrorMessage(error: APIError | undefined): string {
    if (!error) return "";
    return error.message || "";
}

/**
 * Extrait le code d'erreur d'une réponse API
 * @param error - L'objet erreur de l'API
 * @returns Le code d'erreur
 */
export function getAPIErrorCode(
    error: APIError | undefined
): string | undefined {
    if (!error) return undefined;
    return error.code;
}

/**
 * Formate une erreur API pour l'affichage
 * @param error - L'objet erreur de l'API
 * @param fallbackMessage - Message par défaut si aucune erreur n'est fournie
 * @returns Message formaté
 */
export function formatAPIError(
    error: APIError | undefined,
    fallbackMessage: string = "Une erreur est survenue"
): string {
    return getAPIErrorMessage(error) || fallbackMessage;
}

/**
 * Vérifie si une réponse API est un succès
 * @param response - La réponse de l'API
 * @returns true si succès, false sinon
 */
export function isAPISuccess<T>(
    response: APIResponse<T>
): response is APIResponse<T> & { success: true; data: T } {
    return response.success === true;
}
