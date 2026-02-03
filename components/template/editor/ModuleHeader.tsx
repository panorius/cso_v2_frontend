import React from "react";

interface ModuleHeaderProps {
    type: string;
    label: string;
    fieldCount: number;
    onFieldCountChange: (delta: number) => void;
    onDelete: () => void;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
    type,
    label,
    fieldCount,
    onFieldCountChange,
    onDelete,
}) => {
    const getDisplayName = () => {
        switch (type) {
            case "stat_cthulhu":
                return "Caractéristique Cthulhu";
            case "stat_mod":
                return "Caractéristique avec MOD";
            case "stat_simple":
                return "Caractéristique Simple";
            default:
                return label;
        }
    };

    return (
        <div className="flex items-center justify-between p-3 bg-[#444444] rounded-t-xl border-b border-[#555555]">
            <div className="flex items-center gap-3">
                <div className="text-orange cursor-grab active:cursor-grabbing">
                    <i className="w-5 h-5 icon-grip-vertical" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-[#1a1423] rounded border border-gray-600">
                        <i className="w-3 h-3 text-white icon-hash" />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-gray-200 uppercase">
                        {getDisplayName()}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 uppercase font-medium">
                        Nombre de champs
                    </span>
                    <div className="flex items-center bg-[#333333] rounded-lg overflow-hidden border border-gray-600">
                        <button
                            onClick={() => onFieldCountChange(-1)}
                            className="p-1.5 hover:bg-orange-500 text-gray-300 hover:text-white transition-colors"
                        >
                            <i className="w-3 h-3 icon-minus" />
                        </button>
                        <span className="px-3 text-sm font-bold text-white">
                            {fieldCount}
                        </span>
                        <button
                            onClick={() => onFieldCountChange(1)}
                            className="p-1.5 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                        >
                            <i className="w-3 h-3 icon-plus" />
                        </button>
                    </div>
                </div>
                <button
                    onClick={onDelete}
                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all"
                >
                    <i className="w-4 h-4 icon-x" />
                </button>
            </div>
        </div>
    );
};
