"use client";

import { MasteriesPercentageModuleConfig } from "@/types/template/modules/masteriespercentage";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";

interface MasteriesPercentageModuleProps {
    module: MasteriesPercentageModuleConfig;
    onUpdate: (updates: Partial<MasteriesPercentageModuleConfig>) => void;
    onDelete: () => void;
}

export function MasteriesPercentageModule({
    module,
    onUpdate,
    onDelete,
}: MasteriesPercentageModuleProps) {
    const handleAddValue = () => {
        onUpdate({
            values: [
                ...(module.values || []),
                {
                    label: "Nouvelle maîtrise",
                    value: "0%",
                    isReadOnly: false,
                },
            ],
        });
    };

    const handleUpdateValue = (index: number, updates: any) => {
        const values = [...(module.values || [])];
        values[index] = { ...values[index], ...updates };
        onUpdate({ values });
    };

    const handleRemoveValue = (index: number) => {
        const values = [...(module.values || [])];
        values.splice(index, 1);
        onUpdate({ values });
    };

    return (
        <div className="border-2 rounded p-4 bg-gradient-to-br from-lime-50 to-green-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-lime-300 px-2 py-1 rounded">
                        MASTERIES %
                    </span>
                    <span className="text-sm font-semibold">
                        {module.label || "Maîtrises"}
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Label
                        </label>
                        <input
                            type="text"
                            value={module.label || ""}
                            onChange={(e) =>
                                onUpdate({ label: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Formule de dé
                        </label>
                        <input
                            type="text"
                            value={module.rollDice || ""}
                            onChange={(e) =>
                                onUpdate({ rollDice: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="1d100+VALUE"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium">Maîtrises</label>
                        <Button
                            size="sm"
                            variant="bordered"
                            onClick={handleAddValue}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Ajouter
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {(module.values || []).map((value, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-white p-2 rounded border"
                            >
                                <input
                                    type="text"
                                    value={value.label}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            label: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 border rounded text-sm"
                                    placeholder="Label"
                                />
                                <input
                                    type="text"
                                    value={value.value}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            value: e.target.value,
                                        })
                                    }
                                    className="w-20 px-2 py-1 border rounded text-sm"
                                    placeholder="50%"
                                />
                                <label className="flex items-center gap-1 text-xs">
                                    <input
                                        type="checkbox"
                                        checked={value.isReadOnly}
                                        onChange={(e) =>
                                            handleUpdateValue(index, {
                                                isReadOnly: e.target.checked,
                                            })
                                        }
                                    />
                                    Lecture seule
                                </label>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveValue(index)}
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
