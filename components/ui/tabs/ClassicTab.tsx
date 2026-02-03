import { Tab } from "@heroui/tabs";
import { extendVariants } from "@heroui/system";

export const ClassicTab = extendVariants(Tab, {
    variants: {
        variant: {
            cso: {
                base: [
                    "flex-1",
                    "py-3",
                    "font-semibold",
                    "text-white/80",
                    "bg-orange/80",
                    "transition-all",
                    "duration-200",
                    "data-[selected=true]:bg-orange",
                    "data-[selected=true]:text-white",
                    "hover:bg-orange/90",
                    "border-none",
                    "rounded-none",
                ],
            },
        },
    },
    defaultVariants: {
        variant: "cso",
    },
});
