import "@/styles/globals.css";
import "@/styles/buttons.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { LanguageSwitch } from "@/components/language-switch";

export const metadata: Metadata = {
    title: {
        default: "CSO",
        template: `%s - CSO`,
    },
    description: "CSO description",
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    "min-h-screen text-foreground bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Providers
                    themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                    <div className="relative flex flex-col h-screen">
                        {/* <LanguageSwitch className="fixed z-50 top-4 left-4" /> */}
                        <main className="flex-grow min-h-screen bg-purple-bg">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
