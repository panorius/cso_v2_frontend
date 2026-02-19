"use client";

import { BlockModule as BlockModuleType } from "@/types/template/schema";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { TextModule } from "./TextModule";
import { NumberModule } from "./NumberModule";
import { CheckboxModule } from "./CheckboxModule";
import { ListModule } from "./ListModule";
import { PointModule } from "./PointModule";

interface BlockModuleProps {
    module: BlockModuleType;
    onUpdate: (updates: Partial<BlockModuleType>) => void;
    onDelete: () => void;
    onAddModule: (blockId: string, position: number) => void;
}

export function BlockModule({
    module,
    onUpdate,
    onDelete,
    onAddModule,
}: BlockModuleProps) {
    const handleUpdateSubModule = (index: number, updates: any) => {
        const modules = [...module.modules];
        modules[index] = { ...modules[index], ...updates };
        onUpdate({ modules });
    };

    const handleDeleteSubModule = (index: number) => {
        const modules = module.modules.filter((_, i) => i !== index);
        onUpdate({ modules });
    };

    return (
        <div className="border-2 border-dashed border-green-400 rounded p-4 bg-green-50">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-green-300 px-2 py-1 rounded">
                        BLOCK
                    </span>
                    <span className="text-sm font-semibold">
                        Conteneur de modules
                    </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <div className="space-y-2">
                {/* Add button at top */}
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAddModule(module.id, 0)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-100"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter un module simple
                    </Button>
                </div>

                {module.modules.length === 0 ? (
                    <div className="text-center py-4 text-gray-400 border border-dashed rounded">
                        <p className="text-sm">
                            Bloc vide. Ajoutez des modules simples.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {module.modules.map((subModule, index) => (
                            <div key={subModule.id}>
                                {/* Render sub-module */}
                                {subModule.type === "text" && (
                                    <TextModule
                                        module={subModule}
                                        onUpdate={(updates) =>
                                            handleUpdateSubModule(
                                                index,
                                                updates,
                                            )
                                        }
                                        onDelete={() =>
                                            handleDeleteSubModule(index)
                                        }
                                    />
                                )}
                                {subModule.type === "number" && (
                                    <NumberModule
                                        module={subModule}
                                        onUpdate={(updates) =>
                                            handleUpdateSubModule(
                                                index,
                                                updates,
                                            )
                                        }
                                        onDelete={() =>
                                            handleDeleteSubModule(index)
                                        }
                                    />
                                )}
                                {subModule.type === "checkbox" && (
                                    <CheckboxModule
                                        module={subModule}
                                        onUpdate={(updates) =>
                                            handleUpdateSubModule(
                                                index,
                                                updates,
                                            )
                                        }
                                        onDelete={() =>
                                            handleDeleteSubModule(index)
                                        }
                                    />
                                )}
                                {subModule.type === "list" && (
                                    <ListModule
                                        module={subModule}
                                        onUpdate={(updates) =>
                                            handleUpdateSubModule(
                                                index,
                                                updates,
                                            )
                                        }
                                        onDelete={() =>
                                            handleDeleteSubModule(index)
                                        }
                                    />
                                )}
                                {subModule.type === "point" && (
                                    <PointModule
                                        module={subModule}
                                        onUpdate={(updates) =>
                                            handleUpdateSubModule(
                                                index,
                                                updates,
                                            )
                                        }
                                        onDelete={() =>
                                            handleDeleteSubModule(index)
                                        }
                                    />
                                )}

                                {/* Add button below */}
                                <div className="flex justify-center my-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            onAddModule(module.id, index + 1)
                                        }
                                        className="text-green-600 hover:text-green-700 hover:bg-green-100"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Ajouter un module simple
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
