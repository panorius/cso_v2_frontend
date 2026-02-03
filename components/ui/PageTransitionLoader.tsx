"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RunningCharacterLoader } from "./RunningCharacterLoader";

/**
 * Provider pour afficher le loader pendant les transitions de page
 */
export function PageTransitionLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [previousPath, setPreviousPath] = useState(pathname);

    useEffect(() => {
        if (pathname !== previousPath) {
            setIsLoading(true);
            setPreviousPath(pathname);

            // Afficher le loader pendant 500ms minimum pour une transition fluide
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [pathname, previousPath]);

    return (
        <>
            {isLoading && <RunningCharacterLoader />}
            {children}
        </>
    );
}
