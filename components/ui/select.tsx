import React from "react";

export const Select = ({
    value,
    onValueChange,
    children,
    className = "",
    ...props
}: any) => {
    return (
        <select
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};

export const SelectTrigger = ({ children, className = "", ...props }: any) => (
    <div className={className} {...props}>
        {children}
    </div>
);

export const SelectValue = () => null;

export const SelectContent = ({ children, ...props }: any) => <>{children}</>;

export const SelectItem = ({ value, children, ...props }: any) => (
    <option value={value} {...props}>
        {children}
    </option>
);
