"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { LanguageProvider, useLanguage } from "@/lib/contexts/LanguageContext";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { PageLoader } from "@/components/ui/PageLoader";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NonNullable<
            Parameters<ReturnType<typeof useRouter>["push"]>[1]
        >;
    }
}

function InnerProviders({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    const { locale, messages } = useLanguage();

    return (
        <NextIntlClientProvider
            key={locale}
            locale={locale}
            messages={messages}
        >
            <HeroUIProvider key={`heroui-${locale}`} navigate={router.push}>
                <NextThemesProvider {...themeProps}>
                    <AuthProvider>
                        <PageLoader />
                        <Toaster
                            position="top-right"
                            expand={true}
                            richColors
                            closeButton
                            theme="dark"
                        />
                        <div key={`content-${locale}`}>{children}</div>
                    </AuthProvider>
                </NextThemesProvider>
            </HeroUIProvider>
        </NextIntlClientProvider>
    );
}

export function Providers({ children, themeProps }: ProvidersProps) {
    return (
        <LanguageProvider>
            <InnerProviders themeProps={themeProps}>{children}</InnerProviders>
        </LanguageProvider>
    );
}
