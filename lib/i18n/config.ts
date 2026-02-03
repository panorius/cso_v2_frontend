/**
 * Configuration i18n
 */

import flagEn from "@/assets/images/langs/flag_en.png";
import flagFr from "@/assets/images/langs/flag_fr.png";
import flagEs from "@/assets/images/langs/flag_es.png";
import flagIt from "@/assets/images/langs/flag_it.png";
import flagDe from "@/assets/images/langs/flag_de.png";
import flagPl from "@/assets/images/langs/flag_pl.png";
import flagPt from "@/assets/images/langs/flag_pt.png";
import flagNl from "@/assets/images/langs/flag_nl.png";
import flagRu from "@/assets/images/langs/flag_ru.png";

export const locales = [
    "en",
    "fr",
    "es",
    "it",
    "de",
    "pl",
    "pt",
    "nl",
    "ru",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    fr: "Français",
    es: "Español",
    it: "Italiano",
    de: "Deutsch",
    pl: "Polski",
    pt: "Português (BR)",
    nl: "Nederlands",
    ru: "Русский",
};

export const localeFlags: Record<Locale, any> = {
    en: flagEn,
    fr: flagFr,
    es: flagEs,
    it: flagIt,
    de: flagDe,
    pl: flagPl,
    pt: flagPt,
    nl: flagNl,
    ru: flagRu,
};
