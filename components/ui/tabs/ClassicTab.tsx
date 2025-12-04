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
          "bg-orange-cso/80",
          "transition-all",
          "duration-200",
          "data-[selected=true]:bg-orange-cso",
          "data-[selected=true]:text-white",
          "hover:bg-orange-cso/90",
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
