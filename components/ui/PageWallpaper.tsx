import Image from "next/image";
import standardWallpaper from "@/assets/images/wallpapers/standard.png";
import { Title } from "./Title";
import { ReactNode } from "react";

export interface HeaderClassicProps {
    className?: string;
    overlay?: boolean;
    overlayOpacity?: number;
    title?: ReactNode;
    showLogo?: boolean;
}

export const HeaderClassic: React.FC<HeaderClassicProps> = ({
    className = "",
    overlay = false,
    overlayOpacity = 0.6,
    title,
    showLogo = true,
}) => {
    return (
        <div
            className={`absolute w-full flex justify-center min-h-dvh ${className}`}
        >
            {/* Wallpaper background - max 1980px centered */}
            {/* <div
                className="absolute w-full max-w-[1980px] min-h-[1980px] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${standardWallpaper.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1980px",
                    backgroundPosition: "top",
                }}
            > */}
            {/* Logo positioned absolutely at 40px from top */}
            {showLogo && (
                <div className="absolute top-[40px] left-0 right-0 flex flex-col items-center gap-10 justify-center">
                    <Image
                        className="w-[180px] h-auto sm:w-[220px] md:w-[274px]"
                        src="/images/logos/cso.svg"
                        alt="CSO Logo"
                        width={274}
                        height={110}
                        priority
                    />
                    {/* Title positioned absolutely, centered vertically */}
                    {title && typeof title === "string" ? (
                        <Title
                            level="h1"
                            withDecorations
                            className="text-center"
                        >
                            {title}
                        </Title>
                    ) : (
                        title
                    )}
                </div>
            )}
            {/* </div> */}
        </div>
    );
};
