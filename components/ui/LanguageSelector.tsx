/**
 * Composant de sélection de langue
 */

"use client";

import { useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@heroui/react";
import { locales, localeNames, localeFlags, Locale } from "@/lib/i18n";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export const LanguageSelector = () => {
    const { locale: currentLocale, setLocale } = useLanguage();

    const handleLanguageChange = (locale: Locale) => {
        setLocale(locale);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="flat" size="sm" className="min-w-[120px]">
                    {localeFlags[currentLocale]} {localeNames[currentLocale]}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Language selection"
                onAction={(key) => handleLanguageChange(key as Locale)}
            >
                {locales.map((locale) => (
                    <DropdownItem
                        key={locale}
                        startContent={localeFlags[locale]}
                    >
                        {localeNames[locale]}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
