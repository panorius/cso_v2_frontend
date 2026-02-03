"use client";

import { HeaderClassic } from "@/components/ui/PageWallpaper";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import standardWallpaper from "@/assets/images/wallpapers/standard.png";
import avatar from "@/assets/images/avatars/Druid2.png";
import Image from "next/image";

export default function TemplateEditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute
            redirectTo="/"
            loadingMessage="Chargement de l'éditeur de template..."
        >
            <div
                className="flex flex-col min-h-screen"
                style={{
                    backgroundImage: `url(${standardWallpaper.src})`,
                    // backgroundSize: 100,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1980px",
                    backgroundPosition: "top",
                }}
            >
                {/* Content Sections */}
                <main className="flex-1 px-5 py-20">{children}</main>
            </div>
        </ProtectedRoute>
    );
}
