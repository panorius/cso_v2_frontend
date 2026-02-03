'use client';

import { Card } from '@/components/ui/card';
import { ModuleCategory } from '@/types/template/modules';
import { useDraggable } from '@dnd-kit/core';
import {
  Type,
  Hash,
  List,
  CheckSquare,
  FileText,
  Gauge,
  Table,
  Package,
  Lightbulb,
  Scale,
  Star,
  Minus,
  Zap,
  Target,
  Percent,
} from 'lucide-react';

interface ModuleType {
  type: string;
  label: string;
  category: ModuleCategory;
  icon: React.ReactNode;
  description: string;
}

const moduleTypes: ModuleType[] = [
  {
    type: 'text',
    label: 'Texte',
    category: ModuleCategory.SIMPLE,
    icon: <Type className="w-5 h-5" />,
    description: 'Champ de texte simple',
  },
  {
    type: 'number',
    label: 'Nombre',
    category: ModuleCategory.SIMPLE,
    icon: <Hash className="w-5 h-5" />,
    description: 'Champ numérique',
  },
  {
    type: 'textarea',
    label: 'Zone de texte',
    category: ModuleCategory.SIMPLE,
    icon: <FileText className="w-5 h-5" />,
    description: 'Texte multilignes',
  },
  {
    type: 'checkbox',
    label: 'Case à cocher',
    category: ModuleCategory.SIMPLE,
    icon: <CheckSquare className="w-5 h-5" />,
    description: 'Case à cocher',
  },
  {
    type: 'list',
    label: 'Liste',
    category: ModuleCategory.SIMPLE,
    icon: <List className="w-5 h-5" />,
    description: 'Liste déroulante',
  },
  {
    type: 'separator',
    label: 'Séparateur',
    category: ModuleCategory.SIMPLE,
    icon: <Minus className="w-5 h-5" />,
    description: 'Ligne de séparation',
  },
  {
    type: 'points',
    label: 'Points',
    category: ModuleCategory.MINI,
    icon: <Target className="w-5 h-5" />,
    description: 'Système de points',
  },
  {
    type: 'gauge',
    label: 'Jauge',
    category: ModuleCategory.CARACTERISTIQUE,
    icon: <Gauge className="w-5 h-5" />,
    description: 'Barre de progression',
  },
  {
    type: 'skill',
    label: 'Compétence',
    category: ModuleCategory.INTELLIGENT,
    icon: <Star className="w-5 h-5" />,
    description: 'Compétence avec jet de dés',
  },
  {
    type: 'aptitude',
    label: 'Aptitude',
    category: ModuleCategory.INTELLIGENT,
    icon: <Lightbulb className="w-5 h-5" />,
    description: 'Aptitude ou capacité',
  },
  {
    type: 'ability',
    label: 'Capacité',
    category: ModuleCategory.INTELLIGENT,
    icon: <Zap className="w-5 h-5" />,
    description: 'Capacité spéciale',
  },
  {
    type: 'balance',
    label: 'Balance',
    category: ModuleCategory.CARACTERISTIQUE,
    icon: <Scale className="w-5 h-5" />,
    description: 'Curseur de balance',
  },
  {
    type: 'table',
    label: 'Tableau',
    category: ModuleCategory.INTELLIGENT,
    icon: <Table className="w-5 h-5" />,
    description: 'Tableau de données',
  },
  {
    type: 'inventory',
    label: 'Inventaire',
    category: ModuleCategory.INTELLIGENT,
    icon: <Package className="w-5 h-5" />,
    description: 'Gestion d\'inventaire',
  },
  {
    type: 'iconstatistic',
    label: 'Stats avec icônes',
    category: ModuleCategory.CARACTERISTIQUE,
    icon: <Target className="w-5 h-5" />,
    description: 'Statistiques avec icônes',
  },
  {
    type: 'masteriespercentage',
    label: 'Maîtrises %',
    category: ModuleCategory.INTELLIGENT,
    icon: <Percent className="w-5 h-5" />,
    description: 'Maîtrises en pourcentage',
  },
];

function DraggableModule({ module }: { module: ModuleType }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${module.type}`,
    data: module,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 cursor-grab hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{module.icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{module.label}</h4>
          <p className="text-xs text-gray-500 mt-1">{module.description}</p>
        </div>
      </div>
    </Card>
  );
}

export function ModulePalette() {
  const groupedModules = moduleTypes.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<ModuleCategory, ModuleType[]>);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Modules Disponibles</h2>
      <div className="space-y-6">
        {Object.entries(groupedModules).map(([category, modules]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-600 mb-3">{category}</h3>
            <div className="space-y-2">
              {modules.map((module) => (
                <DraggableModule key={module.type} module={module} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
