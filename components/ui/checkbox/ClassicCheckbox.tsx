import { extendVariants, Checkbox } from "@heroui/react";

export const ClassicCheckbox = extendVariants(Checkbox, {
    variants: {
        color: {
            cso: {
                wrapper: [
                    "before:border-grey-darklight",
                    "after:bg-orange",
                    "group-data-[selected=true]:before:border-orange",
                ],
                label: "text-white text-small",
            },
        },
    },
    defaultVariants: {
        color: "cso",
        size: "sm",
    },
});
