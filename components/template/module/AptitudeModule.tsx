"use client";

import { AptitudeModuleConfig } from "@/types/template/modules/aptitude";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";

interface AptitudeModuleProps {
    module: AptitudeModuleConfig;
    onUpdate: (updates: Partial<AptitudeModuleConfig>) => void;
    onDelete: () => void;
}

export function AptitudeModule({
    module,
    onUpdate,
    onDelete,
}: AptitudeModuleProps) {
    const handleAddValue = () => {
        onUpdate({
            values: [
                ...(module.values || []),
                {
                    id: `aptitude-${Date.now()}`,
                    name: "Nouvelle aptitude",
                    description: "",
                },
            ],
        });
    };

    const handleUpdateValue = (index: number, field: string, value: string) => {
        const values = [...(module.values || [])];
        values[index] = { ...values[index], [field]: value };
        onUpdate({ values });
    };

    const handleRemoveValue = (index: number) => {
        const values = [...(module.values || [])];
        values.splice(index, 1);
        onUpdate({ values });
    };

    return (
        <div className="border-2 rounded p-4 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-pink-300 px-2 py-1 rounded">
                        APTITUDE
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
                <div className="grid grid-cols-3 gap-3">
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
                        <label className="block text-xs font-medium mb-1">
                            Label Nom
                        </label>
                        <input
                            type="text"
                            value={module.labelName}
                            onChange={(e) =>
                                onUpdate({ labelName: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            Label Description
                        </label>
                        <input
                            type="text"
                            value={module.labelDescription}
                            onChange={(e) =>
                                onUpdate({ labelDescription: e.target.value })
                            }
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium">Aptitudes</label>
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
                                className="flex gap-2 bg-white p-2 rounded border"
                            >
                                <input
                                    type="text"
                                    value={value.name}
                                    onChange={(e) =>
                                        handleUpdateValue(
                                            index,
                                            "name",
                                            e.target.value,
                                        )
                                    }
                                    className="w-1/3 px-2 py-1 border rounded text-sm"
                                    placeholder="Nom"
                                />
                                <input
                                    type="text"
                                    value={value.description}
                                    onChange={(e) =>
                                        handleUpdateValue(
                                            index,
                                            "description",
                                            e.target.value,
                                        )
                                    }
                                    className="flex-1 px-2 py-1 border rounded text-sm"
                                    placeholder="Description"
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
