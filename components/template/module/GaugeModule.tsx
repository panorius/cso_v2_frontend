"use client";

import { GaugeModuleConfig } from "@/types/template/modules/gauge";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";

interface GaugeModuleProps {
    module: GaugeModuleConfig;
    onUpdate: (updates: Partial<GaugeModuleConfig>) => void;
    onDelete: () => void;
}

export function GaugeModule({ module, onUpdate, onDelete }: GaugeModuleProps) {
    const handleAddValue = () => {
        onUpdate({
            values: [
                ...(module.values || []),
                {
                    id: `gauge-${Date.now()}`,
                    label: "Nouvelle jauge",
                    hasNegativeValues: false,
                    defaultMinValue: 0,
                    defaultMaxValue: 100,
                    color: "#3b82f6",
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
        <div className="border-2 rounded p-4 bg-gradient-to-br from-teal-50 to-emerald-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-teal-300 px-2 py-1 rounded">
                        GAUGE
                    </span>
                    <span className="text-sm font-semibold">Jauges</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium">Jauges</label>
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
                            key={value.id}
                            className="bg-white p-3 rounded border"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <input
                                    type="text"
                                    value={value.label}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            label: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 border rounded text-sm mr-2"
                                    placeholder="Label"
                                />
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveValue(index)}
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div>
                                    <label className="block text-xs mb-1">
                                        Min
                                    </label>
                                    <input
                                        type="number"
                                        value={value.defaultMinValue || 0}
                                        onChange={(e) =>
                                            handleUpdateValue(index, {
                                                defaultMinValue: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full px-2 py-1 border rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs mb-1">
                                        Max
                                    </label>
                                    <input
                                        type="number"
                                        value={value.defaultMaxValue || 100}
                                        onChange={(e) =>
                                            handleUpdateValue(index, {
                                                defaultMaxValue: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className="w-full px-2 py-1 border rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs mb-1">
                                        Couleur
                                    </label>
                                    <input
                                        type="color"
                                        value={value.color || "#3b82f6"}
                                        onChange={(e) =>
                                            handleUpdateValue(index, {
                                                color: e.target.value,
                                            })
                                        }
                                        className="w-full h-[30px] border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1 text-xs mt-4">
                                        <input
                                            type="checkbox"
                                            checked={value.hasNegativeValues}
                                            onChange={(e) =>
                                                handleUpdateValue(index, {
                                                    hasNegativeValues:
                                                        e.target.checked,
                                                })
                                            }
                                        />
                                        Négatif
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
