import { ModuleCategory, ModuleType } from '@/types/template/modules';

export interface ModuleMetadata {
  type: ModuleType;
  label: string;
  category: ModuleCategory;
  description: string;
  icon: string;
  color: string;
}

export const MODULE_METADATA: Record<string, ModuleMetadata> = {
  text: {
    type: 'text',
    label: 'Texte',
    category: ModuleCategory.SIMPLE,
    description: 'Champ de texte simple pour saisir du texte court',
    icon: 'Type',
    color: 'bg-blue-100 text-blue-600',
  },
  number: {
    type: 'number',
    label: 'Nombre',
    category: ModuleCategory.SIMPLE,
    description: 'Champ numérique pour les valeurs',
    icon: 'Hash',
    color: 'bg-green-100 text-green-600',
  },
  textarea: {
    type: 'textarea',
    label: 'Zone de texte',
    category: ModuleCategory.SIMPLE,
    description: 'Zone de texte multilignes pour les descriptions',
    icon: 'FileText',
    color: 'bg-blue-100 text-blue-600',
  },
  checkbox: {
    type: 'checkbox',
    label: 'Case à cocher',
    category: ModuleCategory.SIMPLE,
    description: 'Case à cocher simple',
    icon: 'CheckSquare',
    color: 'bg-gray-100 text-gray-600',
  },
  list: {
    type: 'list',
    label: 'Liste',
    category: ModuleCategory.SIMPLE,
    description: 'Liste déroulante avec options prédéfinies',
    icon: 'List',
    color: 'bg-purple-100 text-purple-600',
  },
  separator: {
    type: 'separator',
    label: 'Séparateur',
    category: ModuleCategory.SIMPLE,
    description: 'Ligne de séparation visuelle',
    icon: 'Minus',
    color: 'bg-gray-100 text-gray-600',
  },
  points: {
    type: 'points',
    label: 'Points',
    category: ModuleCategory.MINI,
    description: 'Système de points avec indicateurs visuels',
    icon: 'Target',
    color: 'bg-yellow-100 text-yellow-600',
  },
  gauge: {
    type: 'gauge',
    label: 'Jauge',
    category: ModuleCategory.CARACTERISTIQUE,
    description: 'Barre de progression pour les ressources',
    icon: 'Gauge',
    color: 'bg-red-100 text-red-600',
  },
  skill: {
    type: 'skill',
    label: 'Compétence',
    category: ModuleCategory.INTELLIGENT,
    description: 'Compétence avec jet de dés et modificateurs',
    icon: 'Star',
    color: 'bg-indigo-100 text-indigo-600',
  },
  aptitude: {
    type: 'aptitude',
    label: 'Aptitude',
    category: ModuleCategory.INTELLIGENT,
    description: 'Aptitude ou pouvoir spécial',
    icon: 'Lightbulb',
    color: 'bg-yellow-100 text-yellow-600',
  },
  battlestatistics: {
    type: 'battlestatistics',
    label: 'Statistiques de combat',
    category: ModuleCategory.INTELLIGENT,
    description: 'Statistiques de combat',
    icon: 'Zap',
    color: 'bg-orange-100 text-orange-600',
  },
  balance: {
    type: 'balance',
    label: 'Balance',
    category: ModuleCategory.CARACTERISTIQUE,
    description: 'Curseur de balance entre deux valeurs',
    icon: 'Scale',
    color: 'bg-teal-100 text-teal-600',
  },
  table: {
    type: 'table',
    label: 'Tableau',
    category: ModuleCategory.INTELLIGENT,
    description: 'Tableau de données structurées',
    icon: 'Table',
    color: 'bg-slate-100 text-slate-600',
  },
  inventory: {
    type: 'inventory',
    label: 'Inventaire',
    category: ModuleCategory.INTELLIGENT,
    description: 'Système complet de gestion d\'inventaire',
    icon: 'Package',
    color: 'bg-amber-100 text-amber-600',
  },
  skills: {
    type: 'skills',
    label: 'Compétences',
    category: ModuleCategory.INTELLIGENT,
    description: 'Liste de compétences',
    icon: 'Target',
    color: 'bg-cyan-100 text-cyan-600',
  },
  spellbook: {
    type: 'spellbook',
    label: 'Grimoire',
    category: ModuleCategory.INTELLIGENT,
    description: 'Livre de sorts',
    icon: 'Book',
    color: 'bg-pink-100 text-pink-600',
  },
};

export const getModulesByCategory = (category: ModuleCategory): ModuleMetadata[] => {
  return Object.values(MODULE_METADATA).filter((module) => module.category === category);
};

export const getAllCategories = (): ModuleCategory[] => {
  return Object.values(ModuleCategory);
};

export const getModuleMetadata = (type: ModuleType): ModuleMetadata | undefined => {
  return MODULE_METADATA[type];
};
