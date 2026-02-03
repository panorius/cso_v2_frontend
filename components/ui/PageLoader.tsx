"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RunningCharacterLoader } from "./RunningCharacterLoader";
import { useTranslations } from "next-intl";

export const PageLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("common");

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Durée minimale de transition

        return () => clearTimeout(timer);
    }, [pathname]);

    if (!isLoading) return null;

    return <RunningCharacterLoader message={t("loading")} />;
};
