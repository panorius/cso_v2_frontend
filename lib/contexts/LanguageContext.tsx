/**
 * Contexte pour la gestion de la langue
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, defaultLocale } from "@/lib/i18n/config";
import { LanguageService } from "@/lib/i18n/LanguageService";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    messages: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [locale, setLocaleState] = useState<Locale>(defaultLocale);
    const [messages, setMessages] = useState<any>(null);

    useEffect(() => {
        // Charger la langue sauvegardée ou détecter celle du navigateur
        const detectedLocale = LanguageService.getLanguage();
        loadLocale(detectedLocale);
    }, []);

    const loadLocale = async (newLocale: Locale) => {
        try {
            console.log("Loading locale:", newLocale);
            const loadedMessages = await import(
                `@/lib/i18n/messages/${newLocale}.json`
            );
            setMessages(loadedMessages.default);
            setLocaleState(newLocale);
            console.log("Locale loaded successfully:", newLocale);
        } catch (error) {
            console.error(`Failed to load locale ${newLocale}`, error);
            // Fallback sur la langue par défaut
            const defaultMessages = await import(
                `@/lib/i18n/messages/${defaultLocale}.json`
            );
            setMessages(defaultMessages.default);
            setLocaleState(defaultLocale);
        }
    };

    const setLocale = (newLocale: Locale) => {
        console.log("LanguageContext: setLocale called with", newLocale);
        LanguageService.setLanguage(newLocale);
        loadLocale(newLocale);
    };

    if (!messages) {
        return null; // Ou un loader
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, messages }}>
            {children}
        </LanguageContext.Provider>
    );
};
