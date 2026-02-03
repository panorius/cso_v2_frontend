/**
 * Hook personnalisé pour la gestion des traductions avec typage
 */

import { useTranslations as useNextIntlTranslations } from "next-intl";

export type TranslationNamespace = "common" | "auth" | "validation" | "errors";

/**
 * Hook pour utiliser les traductions avec autocomplétion
 */
export function useT(namespace: TranslationNamespace = "common") {
    return useNextIntlTranslations(namespace);
}

/**
 * Hook pour les traductions communes
 */
export function useCommonT() {
    return useNextIntlTranslations("common");
}

/**
 * Hook pour les traductions d'authentification
 */
export function useAuthT() {
    return useNextIntlTranslations("auth");
}

/**
 * Hook pour les traductions de validation
 */
export function useValidationT() {
    return useNextIntlTranslations("validation");
}

/**
 * Hook pour les traductions d'erreurs
 */
export function useErrorsT() {
    return useNextIntlTranslations("errors");
}
