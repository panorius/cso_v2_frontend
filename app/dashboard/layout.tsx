"use client";

import { HeaderClassic } from "@/components/ui/PageWallpaper";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import standardWallpaper from "@/assets/images/wallpapers/standard.png";
import avatar from "@/assets/images/avatars/Druid2.png";
import Image from "next/image";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute
            redirectTo="/"
            loadingMessage="Chargement du tableau de bord..."
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
                {/* Header Section */}
                {/* <HeaderClassic title="Le Hall" overlay overlayOpacity={0.5} /> */}
                <div className="fixed z-50 top-4 right-4">
                    <Image
                        src={avatar}
                        alt="User Avatar"
                        width={80}
                        height={80}
                        className="transition-all duration-300 border-4 shadow-2xl cursor-pointer border-white/80 rounded-2xl hover:border-orange"
                    />
                </div>
                {/* Content Sections */}
                <main className="flex-1 py-20">{children}</main>
            </div>
        </ProtectedRoute>
    );
}
