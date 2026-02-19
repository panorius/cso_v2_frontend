"use client";

import { useState } from "react";
import {
    Schema,
    SchemaTab,
    TabModule,
    BlockModule,
} from "@/types/template/schema";
import { ModuleSelectionModal } from "./ModuleSelectionModal";
import { Button, StyledButton } from "@/components/ui/button";
import { ClassicInput } from "@/components/ui/inputs";
import { StyledTabs } from "@/components/ui/StyledTabs";
import { wrap } from "module";

interface SchemaEditorProps {
    initialSchema?: Schema;
    onSave?: (schema: Schema) => void;
    compact?: boolean; // Mode compact pour intégration dans TemplateEditor
}

export function SchemaEditor({
    initialSchema,
    onSave,
    compact = false,
}: SchemaEditorProps) {
    const [schema, setSchema] = useState<Schema>(
        initialSchema || {
            type: "player",
            outsideTabs: {
                labelName: "Nom",
                labelBiography: "Biographie",
                labelGenre: "Genre",
            },
            tabs: [
                {
                    id: crypto.randomUUID(),
                    title: "Undefined",
                    icon: "address-card",
                    order: 1,
                    rights: {
                        tab: {
                            view: "ALL",
                            edit: "ALL",
                        },
                        modules: [],
                    },
                    modules: []
                }
            ],
        },
    );

    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
    const [selectedTabId, setSelectedTabId] = useState<string | null>(null);
    const [insertPosition, setInsertPosition] = useState<{
        tabId: string;
        position: number;
        blockId?: string;
    } | null>(null);

    // Calculer le nombre de tabs qui comptent dans le layout
    const getLayoutTabCount = (items: any[]) => {
        return items.filter((item) => !item.excludeFromLayout).length;
    };

    // Générer la classe de largeur automatique pour les tabs
    const getTabWidthClass = (items: any[], item: any) => {
        if (item.excludeFromLayout) {
            return ""; // Pas de contrainte de largeur pour les tabs exclus
        }
        const layoutCount = getLayoutTabCount(items);
        return `flex-1 max-w-[calc(100%/${layoutCount})]`;
    };

    // const handleAddTab = () => {
    //     const newTab: SchemaTab = {
    //         id: `tab-${Date.now()}`,
    //         title: "Nouvel onglet",
    //         icon: "star",
    //         order: schema.tabs.length + 1,
    //         rights: {
    //             tab: {
    //                 view: "ALL",
    //                 edit: "ALL",
    //             },
    //             modules: [],
    //         },
    //         modules: [],
    //     };

    //     setSchema({
    //         ...schema,
    //         tabs: [...schema.tabs, newTab],
    //     });
    // };

    // const handleUpdateTab = (tabId: string, updates: Partial<SchemaTab>) => {
    //     setSchema({
    //         ...schema,
    //         tabs: schema.tabs.map((tab) =>
    //             tab.id === tabId ? { ...tab, ...updates } : tab,
    //         ),
    //     });
    // };

    // const handleDeleteTab = (tabId: string) => {
    //     setSchema({
    //         ...schema,
    //         tabs: schema.tabs.filter((tab) => tab.id !== tabId),
    //     });
    // };

    // const handleOpenModuleModal = (
    //     tabId: string,
    //     position: number,
    //     blockId?: string,
    // ) => {
    //     setInsertPosition({ tabId, position, blockId });
    //     setIsModuleModalOpen(true);
    // };

    const handleAddModule = (moduleType: string) => {
        if (!insertPosition) return;

        const { tabId, position, blockId } = insertPosition;
        const newModule = createModuleByType(moduleType);

        setSchema({
            ...schema,
            tabs: schema.tabs.map((tab) => {
                if (tab.id !== tabId) return tab;

                if (blockId) {
                    // Ajouter dans un block existant
                    return {
                        ...tab,
                        modules: tab.modules.map((mod) => {
                            if (mod.type === "block" && mod.id === blockId) {
                                const blockModule = mod as BlockModule;
                                const modules = [...blockModule.modules];
                                modules.splice(position, 0, newModule as any);
                                return {
                                    ...blockModule,
                                    modules,
                                };
                            }
                            return mod;
                        }),
                    };
                } else {
                    // Ajouter au niveau du tab
                    const modules = [...tab.modules];
                    modules.splice(position, 0, newModule);
                    return {
                        ...tab,
                        modules,
                    };
                }
            }),
        });

        setIsModuleModalOpen(false);
        setInsertPosition(null);
    };

    // const handleSave = () => {
    //     if (onSave) {
    //         onSave(schema);
    //     }
    //     console.log("Schema saved:", schema);
    // };

    // const handleExportJson = () => {
    //     const dataStr = JSON.stringify(schema, null, 2);
    //     const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    //     const exportFileDefaultName = `schema-${schema.type}.json`;

    //     const linkElement = document.createElement("a");
    //     linkElement.setAttribute("href", dataUri);
    //     linkElement.setAttribute("download", exportFileDefaultName);
    //     linkElement.click();
    // };

    // Définir les items des tabs
    const tabItems = [
        // Bouton de configuration (toujours présent)
        {
            key: "cog",
            title: (
                <>
                    <i className="icon-cog" />
                </>
            ),
            wrapperClasses: "max-w-[30px]!",
            bgColor: "#9e9e9e",
            bgColorHover: "#7e7e7e",
            sticky: true,
            excludeFromLayout: true,
        },
        // Tabs du schéma (triés par ordre)
        ...schema.tabs
            .sort((a, b) => a.order - b.order)
            .map((tab) => ({
                key: tab.id,
                title: (
                    <>
                        <i className={`icon-${tab.icon}`} />
                    </>
                ),
                content: <div>Contenu du tab {tab.title}</div>,
                bgColor: "#FFAF3A", // Couleur par défaut pour les tabs du schéma
            })),
        // Bouton d'ajout de tab
        {
            key: "add-tab",
            title: (
                <>
                    <i className="icon-plus" />
                </>
            ),
            excludeFromLayout: true,
        },
    ];

    // Ajouter dynamiquement les wrapperClasses
    const tabItemsWithClasses = tabItems.map((item) => ({
        ...item,
        wrapperClasses: getTabWidthClass(tabItems, item),
    }));

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            {/* <div className="flex items-center justify-between p-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold">
                        Éditeur de Schéma - {schema.type}
                    </h2>
                    <p className="text-sm text-gray-600">
                        Créez et modifiez votre schéma de personnage
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="bordered" onClick={handleExportJson}>
                        <FileJson className="w-4 h-4 mr-2" />
                        Exporter JSON
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                    </Button>
                </div>
            </div> */}

            <div className="w-[606px] h-[642px] relative flex flex-col items-center bg-grey-dark rounded">
                <div className="flex items-center justify-center gap-5 px-[30px] py-[25px]">
                    <ClassicInput label="Nom" value="" />
                    <ClassicInput label="Biographie" value="" />
                    <ClassicInput label="Genre" value="" />
                    <StyledButton
                        fullWidth
                        bgColor={"#FFAF3A"}
                        className="h-full font-semibold text-white"
                    >
                        Niveau
                    </StyledButton>
                </div>
                <StyledTabs
                    fullWidth
                    aria-label="Tabs form"
                    // selectedKey={selectedSection}
                    size="lg"
                    disableCursorAnimation
                    borderRadius="none"
                    // onSelectionChange={setSelectedSection}
                    items={tabItemsWithClasses}
                />
            </div>

            {/* Outside Tabs Configuration */}
            {/* <div className="p-4 border-b bg-grey-darken">
                <h3 className="mb-3 text-lg font-semibold">
                    Configuration générale
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Label Nom
                        </label>
                        <input
                            type="text"
                            value={schema.outsideTabs.labelName}
                            onChange={(e) =>
                                setSchema({
                                    ...schema,
                                    outsideTabs: {
                                        ...schema.outsideTabs,
                                        labelName: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Label Biographie
                        </label>
                        <input
                            type="text"
                            value={schema.outsideTabs.labelBiography}
                            onChange={(e) =>
                                setSchema({
                                    ...schema,
                                    outsideTabs: {
                                        ...schema.outsideTabs,
                                        labelBiography: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Label Genre
                        </label>
                        <input
                            type="text"
                            value={schema.outsideTabs.labelGenre}
                            onChange={(e) =>
                                setSchema({
                                    ...schema,
                                    outsideTabs: {
                                        ...schema.outsideTabs,
                                        labelGenre: e.target.value,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                </div>
            </div> */}

            {/* Tabs Section */}
            {/* <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Onglets</h3>
                    <Button onClick={handleAddTab} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un onglet
                    </Button>
                </div>

                {schema.tabs.length === 0 ? (
                    <div className="py-12 text-center text-gray-400">
                        <p>
                            Aucun onglet. Cliquez sur "Ajouter un onglet" pour
                            commencer.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {schema.tabs.map((tab) => (
                            <TabEditor
                                key={tab.id}
                                tab={tab}
                                onUpdate={(updates: Partial<SchemaTab>) =>
                                    handleUpdateTab(tab.id, updates)
                                }
                                onDelete={() => handleDeleteTab(tab.id)}
                                onAddModule={handleOpenModuleModal}
                            />
                        ))}
                    </div>
                )}
            </div> */}

            {/* Module Selection Modal */}
            <ModuleSelectionModal
                isOpen={isModuleModalOpen}
                onClose={() => {
                    setIsModuleModalOpen(false);
                    setInsertPosition(null);
                }}
                onSelectModule={handleAddModule}
            />
        </div>
    );
}

// Helper function pour créer un module par type
function createModuleByType(type: string): TabModule {
    const id = `${type}-${Date.now()}`;
    const order = 1;

    switch (type) {
        case "text":
            return {
                id,
                type: "text",
                order,
                title: "Texte",
                defaultValue: "",
                hasLabelVisible: true,
            };
        case "number":
            return {
                id,
                type: "number",
                order,
                title: "Nombre",
                unit: "",
                defaultValue: 0,
                hasLabelVisible: true,
            };
        case "checkbox":
            return {
                id,
                type: "checkbox",
                order,
                title: "Case à cocher",
                defaultValue: false,
            };
        case "list":
            return {
                id,
                type: "list",
                order,
                title: "Liste",
                hasLabelVisible: true,
                values: [],
                defaultValue: [],
                isMultiple: false,
            };
        case "point":
            return {
                id,
                type: "point",
                order,
                title: "Points",
                defaultValue: 0,
                maxDefaultValue: 10,
                hasLabelVisible: true,
            };
        case "textarea":
            return {
                id,
                type: "textarea",
                order,
                title: "Zone de texte",
                defaultValue: "",
            };
        case "ability":
            return {
                id,
                type: "ability",
                order,
                title: "Caractéristiques",
                values: [],
                rolldice: "1d20+VALUE",
                modificator: "",
                hasBonus: false,
                display: "classic",
            };
        case "aptitude":
            return {
                id,
                type: "aptitude",
                order,
                title: "Aptitudes",
                labelName: "Nom",
                labelDescription: "Description",
                values: [],
            };
        case "balance":
            return {
                id,
                type: "balance",
                order,
                title: "Balance",
                step: 1,
                minimum: {
                    icon: "sad",
                    label: "Minimum",
                    defaultValue: -10,
                },
                maximum: {
                    icon: "happy",
                    label: "Maximum",
                    defaultValue: 10,
                },
                defaultValue: 0,
            };
        case "gauge":
            return {
                id,
                type: "gauge",
                order,
                values: [],
            };
        case "iconstatistic":
            return {
                id,
                type: "iconstatistic",
                order,
                values: [],
            };
        case "table":
            return {
                id,
                type: "table",
                order,
                title: "Tableau",
                headers: [],
                rows: [],
                hasSumRow: false,
                hasCheckboxColumn: false,
            };
        case "skill":
            return {
                id,
                type: "skill",
                order,
                values: [],
                rollDice: "1d20+VALUE",
                listBonusMalus: [],
            };
        case "separator":
            return {
                id,
                type: "separator",
                order,
                label: "Séparateur",
            };
        case "masteriespercentage":
            return {
                id,
                type: "masteriespercentage",
                order,
                label: "Maîtrises",
                values: [],
                rollDice: "1d100+VALUE",
            };
        case "inventory":
            return {
                id,
                type: "inventory",
                order,
                labels: {
                    name: "Nom",
                    rarity: "Rareté",
                    quantity: "Quantité",
                    description: "Description",
                    weight: "Poids",
                },
                hasRarity: false,
                hasWeight: false,
            };
        case "block":
            return {
                id,
                type: "block",
                order,
                modules: [],
            };
        default:
            throw new Error(`Unknown module type: ${type}`);
    }
}
