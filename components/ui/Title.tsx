import { ReactNode } from "react";
import clsx from "clsx";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children: ReactNode;
    className?: string;
    withDecorations?: boolean; // Pour ajouter les lignes comme .main-title
}

const titleStyles = {
    h1: "text-xl sm:text-2xl md:text-4xl font-bold text-white uppercase",
    h2: "text-lg sm:text-xl md:text-[24px] font-bold text-white uppercase",
    h3: "text-base sm:text-lg md:text-2xl font-bold text-white",
    h4: "text-sm sm:text-base md:text-xl font-semibold text-white",
    h5: "text-xs sm:text-sm md:text-lg font-semibold text-white",
    h6: "text-xs sm:text-sm md:text-base font-medium text-white",
};

export const Title: React.FC<TitleProps> = ({
    level = "h1",
    children,
    className,
    withDecorations = false,
    ...props
}) => {
    const Component = level;
    const baseStyles = titleStyles[level];
    const decorationClass = withDecorations ? "" : "main-title";

    return (
        <Component
            className={clsx(baseStyles, decorationClass, className)}
            {...props}
        >
            {children}
        </Component>
    );
};
