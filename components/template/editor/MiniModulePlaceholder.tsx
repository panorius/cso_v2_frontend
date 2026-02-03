import React from "react";

interface MiniModulePlaceholderProps {
    onClick: () => void;
}

export const MiniModulePlaceholder: React.FC<MiniModulePlaceholderProps> = ({
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-center justify-center h-[100px] bg-[#1a1423]/30 border-2 border-dashed border-[#4a3b5c] rounded-2xl hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
        >
            <div className="w-8 h-8 rounded-xl bg-[#2a2235] border border-[#4a3b5c] flex items-center justify-center text-gray-600 group-hover:text-orange-500 group-hover:scale-110 transition-all">
                <i className="w-5 h-5 icon-plus" />
            </div>
            <span className="mt-2 text-[8px] font-black uppercase tracking-[0.2em] text-gray-700 group-hover:text-orange-500/50">
                Ajouter
            </span>
        </button>
    );
};
