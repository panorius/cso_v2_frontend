import { Tabs } from "@heroui/tabs";
import { extendVariants } from "@heroui/system";

export const ClassicTabs = extendVariants(Tabs, {
  variants: {
    variant: {
      cso: {
        base: "w-full",
        tabList: [
          "gap-0",
          "w-full",
          "relative",
          "rounded-lg",
          "overflow-hidden",
          "bg-transparent",
          "p-0",
        ],
        cursor: "hidden", // On cache le curseur par défaut
        tab: [
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
          "h-auto",
        ],
        tabContent: "group-data-[selected=true]:text-white",
        panel: [
          "p-6",
          "bg-grey-cso-dark",
          "rounded-b-lg",
        ],
      },
      clean: {
        base: "w-full",
        tabList: [
          "gap-2",
          "w-full",
          "bg-transparent",
          "p-1",
        ],
        tab: [
          "px-4",
          "py-2",
          "font-medium",
          "text-gray-600",
          "data-[selected=true]:text-orange-cso",
          "data-[selected=true]:bg-white",
          "data-[selected=true]:shadow-md",
          "hover:text-gray-800",
          "transition-all",
        ],
        panel: "p-4",
      },
    },
  },
  defaultVariants: {
    variant: "cso",
  },
});
