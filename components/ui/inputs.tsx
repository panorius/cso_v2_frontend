import { Input } from "@heroui/react";

import { extendVariants } from "@heroui/system";
export const ClassicInput = extendVariants(Input, {
    variants: {
        variant: {
            faded: {
                base: ["relative"],
                input: [
                    "bg-neutral-800",
                    "text-white dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-400",
                    "font-['Beiruti']",
                    "text-base",
                    "font-normal",
                ],

                inputWrapper: [
                    "rounded-[5px]",
                    "outline outline-1 outline-offset-[-1px] outline-gray-400",
                    "focus-within:outline-purple-600",
                    "h-7",
                    "bg-neutral-800",
                    "px-3",
                    "py-2",
                    "group",
                ],
                label: [
                    "text-gray-400",
                    "font-['Beiruti']",
                    "text-base",
                    "font-normal",
                    "!absolute",
                    "!left-3",
                    "!top-[50%]",
                    "!translate-y-[-50%]",
                    "pointer-events-none",
                    "transition-all",
                    "duration-200",
                    "group-data-[focus=true]:!text-white",
                    "group-data-[focus=true]:!font-['Belanosima']",
                    "group-data-[focus=true]:!top-[-19.5px]",
                    "group-data-[focus=true]:!left-0",
                    "group-data-[focus=true]:!translate-y-0",
                    "group-data-[filled=true]:!text-white",
                    "group-data-[filled=true]:!font-['Belanosima']",
                    "group-data-[filled=true]:!top-[-19.5px]",
                    "group-data-[filled=true]:!left-0",
                    "group-data-[filled=true]:!translate-y-0",
                ],
            },
        },
    },
    defaultVariants: {
        variant: "faded",
    },
});
