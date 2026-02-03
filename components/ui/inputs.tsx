import { Input } from "@heroui/react";

import { extendVariants } from "@heroui/system";
export const ClassicInput = extendVariants(Input, {
    variants: {
        variant: {
            faded: {
                input: [
                    "bg-input",

                    "text-white dark:text-white",
                    "placeholder:text-grey-grey-darklight dark:placeholder:text-grey-darklight",
                ],

                inputWrapper: [
                    "rounded-[var(--radius)]",
                    "focus-within:bg-grey-darklight/50!",
                ],
                label: "text-white dark:text-white",
            },
        },
    },
});
