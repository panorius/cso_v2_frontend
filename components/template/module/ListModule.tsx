"use client";

import { ListModuleConfig } from "@/types/template/modules/list";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

interface ListModuleProps {
    module: ListModuleConfig;
    onUpdate: (updates: Partial<ListModuleConfig>) => void;
    onDelete: () => void;
}

export function ListModule({ module, onUpdate, onDelete }: ListModuleProps) {
    const [newValue, setNewValue] = useState("");

    const handleAddValue = () => {
        if (newValue.trim()) {
            onUpdate({
                values: [...(module.values || []), newValue.trim()],
            });
            setNewValue("");
        }
    };

    const handleRemoveValue = (index: number) => {
        const values = [...(module.values || [])];
        values.splice(index, 1);
        onUpdate({ values });
    };

    return (
        <div className="border rounded p-4 bg-purple-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-purple-200 px-2 py-1 rounded">
                        LIST
                    </span>
                    <span className="text-sm font-semibold">
                        {module.title}
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
                            Titre
                        </label>
                        <input
                            type="text"
                            value={module.title}
                            onChange={(e) =>
                                onUpdate({ title: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={module.isMultiple}
                                onChange={(e) =>
                                    onUpdate({ isMultiple: e.target.checked })
                                }
                            />
                            Sélection multiple
                        </label>
                        <label className="flex items-center gap-2 text-sm mt-2">
                            <input
                                type="checkbox"
                                checked={module.hasLabelVisible}
                                onChange={(e) =>
                                    onUpdate({
                                        hasLabelVisible: e.target.checked,
                                    })
                                }
                            />
                            Label visible
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1">
                        Valeurs disponibles
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" && handleAddValue()
                            }
                            className="flex-1 px-2 py-1 border rounded text-sm"
                            placeholder="Nouvelle valeur..."
                        />
                        <Button size="sm" onClick={handleAddValue}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(module.values || []).map((value, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-white px-2 py-1 rounded border text-sm"
                            >
                                <span>{value}</span>
                                <button
                                    onClick={() => handleRemoveValue(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
