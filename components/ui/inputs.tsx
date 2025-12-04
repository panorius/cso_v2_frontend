import { Input } from "@heroui/react";  
// ⚠️ c'est bien "input" en minuscule (le composant de base)

import { extendVariants } from "@heroui/system";
export const ClassicInput = extendVariants(Input, {
  variants: {
    variant: {
      faded: {
        input: ["bg-cso-input","text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",],
            
          inputWrapper: [
            "rounded-[var(--radius-cso)]",
          ],
        label: "text-gray-500",
      },
    },
  },
});
