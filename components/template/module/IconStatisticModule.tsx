"use client";

import {
    IconstatisticModuleConfig,
    IconstatisticModuleValue,
} from "@/types/template/modules/iconstatistic";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";

interface IconStatisticModuleProps {
    module: IconstatisticModuleConfig;
    onUpdate: (updates: Partial<IconstatisticModuleConfig>) => void;
    onDelete: () => void;
}

export function IconStatisticModule({
    module,
    onUpdate,
    onDelete,
}: IconStatisticModuleProps) {
    const handleAddValue = () => {
        onUpdate({
            values: [
                ...(module.values || []),
                {
                    id: `icon-stat-${Date.now()}`,
                    icon: "star",
                    label: "Nouvelle statistique",
                    defaultValue: "",
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
        <div className="border-2 rounded p-4 bg-gradient-to-br from-amber-50 to-yellow-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-amber-300 px-2 py-1 rounded">
                        ICON STAT
                    </span>
                    <span className="text-sm font-semibold">
                        Statistiques à icônes
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium">Statistiques</label>
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
                    {(module.values || []).map(
                        (value: IconstatisticModuleValue, index: number) => (
                            <div
                                key={value.id}
                                className="flex items-center gap-2 bg-white p-2 rounded border"
                            >
                                <input
                                    type="text"
                                    value={value.icon}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            icon: e.target.value,
                                        })
                                    }
                                    className="w-24 px-2 py-1 border rounded text-sm"
                                    placeholder="Icône"
                                />
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
                                    value={value.defaultValue}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            defaultValue: e.target.value,
                                        })
                                    }
                                    className="w-32 px-2 py-1 border rounded text-sm"
                                    placeholder="Valeur"
                                />
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveValue(index)}
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
