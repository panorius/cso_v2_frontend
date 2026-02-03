import React from "react";
import { FilterPill } from "@/lib/hooks/useFilterPills";

interface FilterPillsProps {
    pills: FilterPill[];
    selectedFilters: string[];
    onToggle: (pillId: string) => void;
    className?: string;
}

export default function FilterPills({
    pills,
    selectedFilters,
    onToggle,
    className = "",
}: FilterPillsProps) {
    return (
        <>
            <style>
                {`.filter-pill {
            background: #3e3b4d;
            border-radius: 999px;
            padding: 4px 14px;
            font-size: 13px;
            font-weight: 600;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.2s;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        .filter-pill.active {
            background: #f59e0b;
            color: #1a1625;
            border-color: #fbbf24;
        }
        .filter-pill:hover {
            transform: translateY(-1px);
            border-color: rgba(255,255,255,0.2);
        }
        .filter-count {
            background: rgba(0,0,0,0.3);
            color: #fbbf24;
            padding: 0 6px;
            border-radius: 4px;
            margin-left: 8px;
            font-size: 11px;
        }
        .active .filter-count {
            background: #1a1625;
            color: white;
        }`}
            </style>
            <div className={`flex flex-wrap gap-3 ${className}`}>
                {pills.map((pill) => (
                    <button
                        key={pill.id}
                        onClick={() => onToggle(pill.id)}
                        className={`filter-pill ${
                            selectedFilters.includes(pill.id) ? "active" : ""
                        }`}
                    >
                        {pill.label}{" "}
                        <span className="filter-count">{pill.count}</span>
                    </button>
                ))}
            </div>
        </>
    );
}
