"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { Button } from "@/components/ui/button";
import {
    Text,
    Hash,
    CheckSquare,
    List,
    Circle,
    FileText,
    Target,
    Scale,
    Gauge,
    BarChart,
    Table,
    Sparkles,
    Minus,
    Percent,
    Package,
    Box,
} from "lucide-react";

interface ModuleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectModule: (moduleType: string) => void;
}

interface ModuleOption {
    type: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    category: "simple" | "intelligent" | "container";
}

const MODULE_OPTIONS: ModuleOption[] = [
    // Modules simples (mini modules/modules de base)
    {
        type: "text",
        label: "Texte",
        description: "Champ de texte simple",
        icon: <Text className="w-6 h-6" />,
        category: "simple",
    },
    {
        type: "number",
        label: "Nombre",
        description: "Champ numérique avec unité optionnelle",
        icon: <Hash className="w-6 h-6" />,
        category: "simple",
    },
    {
        type: "checkbox",
        label: "Case à cocher",
        description: "Case à cocher simple",
        icon: <CheckSquare className="w-6 h-6" />,
        category: "simple",
    },
    {
        type: "list",
        label: "Liste",
        description: "Liste de sélection simple ou multiple",
        icon: <List className="w-6 h-6" />,
        category: "simple",
    },
    {
        type: "point",
        label: "Points",
        description: "Gestion de points (vie, mana, etc.)",
        icon: <Circle className="w-6 h-6" />,
        category: "simple",
    },
    {
        type: "textarea",
        label: "Zone de texte",
        description: "Zone de texte multilignes",
        icon: <FileText className="w-6 h-6" />,
        category: "simple",
    },

    // Modules intelligents
    {
        type: "ability",
        label: "Caractéristiques",
        description: "Système de caractéristiques avec modificateurs",
        icon: <Target className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "aptitude",
        label: "Aptitudes",
        description: "Liste d'aptitudes avec nom et description",
        icon: <Sparkles className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "balance",
        label: "Balance",
        description: "Curseur de valeur entre deux extrêmes",
        icon: <Scale className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "gauge",
        label: "Jauges",
        description: "Jauges de progression multiples",
        icon: <Gauge className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "iconstatistic",
        label: "Statistiques à icônes",
        description: "Statistiques visuelles avec icônes",
        icon: <BarChart className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "table",
        label: "Tableau",
        description: "Tableau de données avec lignes et colonnes",
        icon: <Table className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "skill",
        label: "Compétences",
        description: "Système de compétences avec bonus/malus",
        icon: <Sparkles className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "separator",
        label: "Séparateur",
        description: "Séparateur visuel avec label et icônes",
        icon: <Minus className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "masteriespercentage",
        label: "Maîtrises en %",
        description: "Gestion de maîtrises en pourcentage",
        icon: <Percent className="w-6 h-6" />,
        category: "intelligent",
    },
    {
        type: "inventory",
        label: "Inventaire",
        description: "Système d'inventaire avec catégories",
        icon: <Package className="w-6 h-6" />,
        category: "intelligent",
    },

    // Conteneur
    {
        type: "block",
        label: "Bloc",
        description: "Conteneur pour regrouper des modules simples",
        icon: <Box className="w-6 h-6" />,
        category: "container",
    },
];

export function ModuleSelectionModal({
    isOpen,
    onClose,
    onSelectModule,
}: ModuleSelectionModalProps) {
    const simpleModules = MODULE_OPTIONS.filter((m) => m.category === "simple");
    const intelligentModules = MODULE_OPTIONS.filter(
        (m) => m.category === "intelligent",
    );
    const containerModules = MODULE_OPTIONS.filter(
        (m) => m.category === "container",
    );

    const handleSelect = (moduleType: string) => {
        onSelectModule(moduleType);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader>
                    <h3 className="text-xl font-semibold">
                        Sélectionnez un module
                    </h3>
                </ModalHeader>
                <ModalBody className="py-6">
                    <div className="space-y-6">
                        {/* Modules simples */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">
                                Modules simples
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {simpleModules.map((module) => (
                                    <Button
                                        key={module.type}
                                        variant="bordered"
                                        className="h-auto flex-col items-start p-4 hover:border-blue-500 hover:bg-blue-50"
                                        onClick={() =>
                                            handleSelect(module.type)
                                        }
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            {module.icon}
                                            <span className="font-semibold">
                                                {module.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 text-left">
                                            {module.description}
                                        </p>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Modules intelligents */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">
                                Modules intelligents
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {intelligentModules.map((module) => (
                                    <Button
                                        key={module.type}
                                        variant="bordered"
                                        className="h-auto flex-col items-start p-4 hover:border-purple-500 hover:bg-purple-50"
                                        onClick={() =>
                                            handleSelect(module.type)
                                        }
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            {module.icon}
                                            <span className="font-semibold">
                                                {module.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 text-left">
                                            {module.description}
                                        </p>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Conteneurs */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">
                                Conteneurs
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {containerModules.map((module) => (
                                    <Button
                                        key={module.type}
                                        variant="bordered"
                                        className="h-auto flex-col items-start p-4 hover:border-green-500 hover:bg-green-50"
                                        onClick={() =>
                                            handleSelect(module.type)
                                        }
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            {module.icon}
                                            <span className="font-semibold">
                                                {module.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 text-left">
                                            {module.description}
                                        </p>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
