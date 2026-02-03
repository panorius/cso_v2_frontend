/**
 * Service de gestion de la langue
 */

import { Locale, locales, defaultLocale } from "./config";

export class LanguageService {
    private static readonly LANG_KEY = "userLanguage";

    /**
     * Détecte la langue du navigateur
     */
    static detectBrowserLanguage(): Locale {
        if (typeof navigator === "undefined") return defaultLocale;

        const browserLang = navigator.language.split("-")[0] as Locale;
        return locales.includes(browserLang) ? browserLang : defaultLocale;
    }

    /**
     * Récupère la langue sauvegardée ou détecte celle du navigateur
     */
    static getLanguage(): Locale {
        if (typeof localStorage === "undefined") {
            return this.detectBrowserLanguage();
        }

        const saved = localStorage.getItem(this.LANG_KEY) as Locale;
        if (saved && locales.includes(saved)) {
            return saved;
        }

        return this.detectBrowserLanguage();
    }

    /**
     * Sauvegarde la langue choisie
     */
    static setLanguage(locale: Locale): void {
        if (!locales.includes(locale)) {
            console.warn(`Invalid locale: ${locale}`);
            return;
        }

        if (typeof localStorage !== "undefined") {
            localStorage.setItem(this.LANG_KEY, locale);
        }
    }

    /**
     * Réinitialise à la langue par défaut
     */
    static resetLanguage(): void {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(this.LANG_KEY);
        }
    }

    /**
     * Convertit un code de langue en format API
     */
    static toAPIFormat(locale: Locale): string {
        return locale;
    }

    /**
     * Convertit depuis le format API vers Locale
     */
    static fromAPIFormat(apiLang: string): Locale {
        const lang = apiLang.toLowerCase() as Locale;
        return locales.includes(lang) ? lang : defaultLocale;
    }
}
