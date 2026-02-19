"use client";

import { AbilityModuleConfig } from "@/types/template/modules/ability";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";

interface AbilityModuleProps {
    module: AbilityModuleConfig;
    onUpdate: (updates: Partial<AbilityModuleConfig>) => void;
    onDelete: () => void;
}

export function AbilityModule({
    module,
    onUpdate,
    onDelete,
}: AbilityModuleProps) {
    const handleAddValue = () => {
        onUpdate({
            values: [
                ...(module.values || []),
                {
                    id: `ability-value-${Date.now()}`,
                    name: "Nouvelle caractéristique",
                    defaultValues: 0,
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
        <div className="border-2 rounded p-4 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-orange-300 px-2 py-1 rounded">
                        ABILITY
                    </span>
                    <span className="text-sm font-semibold">
                        {module.title || "Caractéristiques"}
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
                            value={module.title || ""}
                            onChange={(e) =>
                                onUpdate({ title: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Affichage
                        </label>
                        <select
                            value={module.display}
                            onChange={(e) =>
                                onUpdate({ display: e.target.value as any })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        >
                            <option value="classic">Classic</option>
                            <option value="dnd">D&D</option>
                            <option value="cthulhu">Cthulhu</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Formule de dé
                        </label>
                        <input
                            type="text"
                            value={module.rolldice || ""}
                            onChange={(e) =>
                                onUpdate({ rolldice: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="1d20+VALUE"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Modificateur
                        </label>
                        <input
                            type="text"
                            value={module.modificator || ""}
                            onChange={(e) =>
                                onUpdate({ modificator: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="ROUNDDOWN((VALUE-10)/2)"
                        />
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={module.hasBonus}
                            onChange={(e) =>
                                onUpdate({ hasBonus: e.target.checked })
                            }
                        />
                        A des bonus
                    </label>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium">
                            Caractéristiques
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
                    <div className="space-y-2">
                        {(module.values || []).map((value, index) => (
                            <div
                                key={value.id}
                                className="flex items-center gap-2 bg-white p-2 rounded border"
                            >
                                <input
                                    type="text"
                                    value={value.name}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            name: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 border rounded text-sm"
                                    placeholder="Nom"
                                />
                                <input
                                    type="number"
                                    value={value.defaultValues}
                                    onChange={(e) =>
                                        handleUpdateValue(index, {
                                            defaultValues: parseInt(
                                                e.target.value,
                                            ),
                                        })
                                    }
                                    className="w-20 px-2 py-1 border rounded text-sm"
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
