"use client";

import { FC, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import Image from "next/image";

import { Locale, locales, localeNames, localeFlags } from "@/lib/i18n";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export interface LanguageSwitchProps {
    className?: string;
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({ className }) => {
    const { locale, setLocale } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLocale: Locale) => {
        console.log("Changing language from", locale, "to", newLocale);
        setLocale(newLocale);
    };

    return (
        <div className={className}>
            <Dropdown
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                className="bg-grey-dark"
            >
                <DropdownTrigger>
                    <Button
                        className="!p-0 px-2 transition-all duration-300 border-4 w-[50px] h-[50px] bg-grey-dark border-white/80 rounded-full hover:border-orange"
                        startContent={
                            <Image
                                src={localeFlags[locale]}
                                alt={localeNames[locale]}
                                width={50}
                                height={50}
                                className="object-cover w-full h-full"
                            />
                        }
                    >
                        {/* {locale.toUpperCase()} */}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Language selection"
                    selectionMode="single"
                    selectedKeys={new Set([locale])}
                    onAction={(key) => handleLanguageChange(key as Locale)}
                >
                    {locales.map((loc) => (
                        <DropdownItem
                            key={loc}
                            startContent={
                                <Image
                                    src={localeFlags[loc]}
                                    alt={localeNames[loc]}
                                    width={20}
                                    height={20}
                                    className="rounded-sm"
                                />
                            }
                        >
                            {localeNames[loc]}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
