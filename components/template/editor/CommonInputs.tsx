import React from "react";

interface DiceInputProps {
    value: string;
    onChange: (val: string) => void;
    label?: string;
}

export const DiceInput: React.FC<DiceInputProps> = ({
    value,
    onChange,
    label = "Lancer de dés au clic",
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {label}
        </label>
        <div className="relative group">
            <input
                type="text"
                placeholder="ex: 1d20+#MOD>=10"
                className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg p-2.5 text-sm text-gray-300 outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-4 bg-orange-500 rounded-r-lg">
                <span className="text-[10px] font-black text-[#1a1423]">#</span>
            </div>
        </div>
    </div>
);

export const LabelInput: React.FC<{
    value: string;
    onChange: (val: string) => void;
}> = ({ value, onChange }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Label
        </label>
        <input
            type="text"
            className="bg-[#1e1e1e] border border-orange-500/30 rounded-lg p-2.5 text-sm text-white font-bold outline-none focus:border-orange-500 transition-all"
            placeholder="Label"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
