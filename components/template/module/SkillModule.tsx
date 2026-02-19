"use client";

import { SkillModuleConfig } from "@/types/template/modules/skill";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";

interface SkillModuleProps {
    module: SkillModuleConfig;
    onUpdate: (updates: Partial<SkillModuleConfig>) => void;
    onDelete: () => void;
}

export function SkillModule({ module, onUpdate, onDelete }: SkillModuleProps) {
    const handleAddValue = () => {
        onUpdate({
            values: [
                ...(module.values || []),
                {
                    id: `skill-${Date.now()}`,
                    label: "Nouvelle compétence",
                    defaultValue: 0,
                },
            ],
        });
    };

    const handleAddBonusMalus = () => {
        onUpdate({
            listBonusMalus: [
                ...(module.listBonusMalus || []),
                {
                    id: `bonus-${Date.now()}`,
                    name: "Nouveau bonus/malus",
                    operator: "+",
                    value: 0,
                },
            ],
        });
    };

    return (
        <div className="border-2 rounded p-4 bg-gradient-to-br from-sky-50 to-indigo-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-sky-300 px-2 py-1 rounded">
                        SKILL
                    </span>
                    <span className="text-sm font-semibold">Compétences</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium mb-1">
                        Formule de dé
                    </label>
                    <input
                        type="text"
                        value={module.rollDice || ""}
                        onChange={(e) => onUpdate({ rollDice: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                        placeholder="1d20+VALUE"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium">
                            Compétences
                        </label>
                        <Button
                            size="sm"
                            variant="bordered"
                            onClick={handleAddValue}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Ajouter
                        </Button>
                    </div>
                    <div className="space-y-1">
                        {(module.values || []).map((value, index) => (
                            <div
                                key={value.id}
                                className="flex items-center gap-2 bg-white p-2 rounded border text-sm"
                            >
                                <span>{value.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium">
                            Bonus/Malus
                        </label>
                        <Button
                            size="sm"
                            variant="bordered"
                            onClick={handleAddBonusMalus}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Ajouter
                        </Button>
                    </div>
                    <div className="space-y-1">
                        {(module.listBonusMalus || []).map((bm, index) => (
                            <div
                                key={bm.id}
                                className="flex items-center gap-2 bg-white p-2 rounded border text-sm"
                            >
                                <span>
                                    {bm.name} ({bm.operator}
                                    {bm.value})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
