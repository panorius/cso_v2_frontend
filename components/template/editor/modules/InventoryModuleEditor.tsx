'use client';

import {
  InventoryModuleConfig,
  CategoryItem,
  CategoryValue,
  Currency,
} from '@/types/template/modules/inventory';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface InventoryModuleEditorProps {
  config: InventoryModuleConfig;
  onChange: (config: InventoryModuleConfig) => void;
}

export function InventoryModuleEditor({ config, onChange }: InventoryModuleEditorProps) {
  const addCategory = () => {
    onChange({
      ...config,
      categories: [
        ...(config.categories || []),
        { icon: '📦', label: 'Nouvelle catégorie', values: [] },
      ],
    });
  };

  const updateCategory = (index: number, updates: Partial<CategoryItem>) => {
    const newCategories = [...(config.categories || [])];
    newCategories[index] = { ...newCategories[index], ...updates };
    onChange({ ...config, categories: newCategories });
  };

  const removeCategory = (index: number) => {
    onChange({
      ...config,
      categories: config.categories?.filter((_, i) => i !== index),
    });
  };

  const addCategoryValue = (categoryIndex: number) => {
    const newCategories = [...(config.categories || [])];
    newCategories[categoryIndex].values.push({ label: '' });
    onChange({ ...config, categories: newCategories });
  };

  const updateCategoryValue = (
    categoryIndex: number,
    valueIndex: number,
    label: string
  ) => {
    const newCategories = [...(config.categories || [])];
    newCategories[categoryIndex].values[valueIndex] = { label };
    onChange({ ...config, categories: newCategories });
  };

  const removeCategoryValue = (categoryIndex: number, valueIndex: number) => {
    const newCategories = [...(config.categories || [])];
    newCategories[categoryIndex].values = newCategories[categoryIndex].values.filter(
      (_, i) => i !== valueIndex
    );
    onChange({ ...config, categories: newCategories });
  };

  const addCurrency = () => {
    onChange({
      ...config,
      currencies: {
        ...config.currencies,
        mainReferencyLabel: config.currencies?.mainReferencyLabel || '',
        others: [
          ...(config.currencies?.others || []),
          { label: '', referencyValue: 1 },
        ],
      },
    });
  };

  const updateCurrency = (index: number, updates: Partial<Currency>) => {
    const newOthers = [...(config.currencies?.others || [])];
    newOthers[index] = { ...newOthers[index], ...updates };
    onChange({
      ...config,
      currencies: {
        ...config.currencies!,
        others: newOthers,
      },
    });
  };

  const removeCurrency = (index: number) => {
    onChange({
      ...config,
      currencies: {
        ...config.currencies!,
        others: config.currencies?.others?.filter((_, i) => i !== index) || [],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Fields */}
      <div>
        <Label htmlFor="labelName">Label nom</Label>
        <Input
          id="labelName"
          value={config.labelName || ''}
          onChange={(e) => onChange({ ...config, labelName: e.target.value })}
          placeholder="Nom"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasRarity"
          checked={config.hasRarity ?? false}
          onCheckedChange={(checked: boolean) => onChange({ ...config, hasRarity: checked })}
        />
        <Label htmlFor="hasRarity" className="cursor-pointer">
          A une rareté
        </Label>
      </div>

      {config.hasRarity && (
        <div>
          <Label htmlFor="labelRarity">Label rareté</Label>
          <Input
            id="labelRarity"
            value={config.labelRarity || ''}
            onChange={(e) => onChange({ ...config, labelRarity: e.target.value })}
            placeholder="Rareté"
          />
        </div>
      )}

      <div>
        <Label htmlFor="labelQuantity">Label quantité</Label>
        <Input
          id="labelQuantity"
          value={config.labelQuantity || ''}
          onChange={(e) => onChange({ ...config, labelQuantity: e.target.value })}
          placeholder="Quantité"
        />
      </div>

      <div>
        <Label htmlFor="labelDescription">Label description</Label>
        <Input
          id="labelDescription"
          value={config.labelDescription || ''}
          onChange={(e) => onChange({ ...config, labelDescription: e.target.value })}
          placeholder="Description"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasWeight"
          checked={config.hasWeight ?? false}
          onCheckedChange={(checked: boolean) => onChange({ ...config, hasWeight: checked })}
        />
        <Label htmlFor="hasWeight" className="cursor-pointer">
          A un poids
        </Label>
      </div>

      {config.hasWeight && (
        <div>
          <Label htmlFor="labelWeight">Label poids</Label>
          <Input
            id="labelWeight"
            value={config.labelWeight || ''}
            onChange={(e) => onChange({ ...config, labelWeight: e.target.value })}
            placeholder="Poids"
          />
        </div>
      )}

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Catégories</Label>
          <Button type="button" size="sm" onClick={addCategory}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {(config.categories || []).map((category, catIndex) => (
            <div key={catIndex} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Catégorie {catIndex + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCategory(catIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Icône</Label>
                  <Input
                    value={category.icon}
                    onChange={(e) => updateCategory(catIndex, { icon: e.target.value })}
                    placeholder="📦"
                  />
                </div>
                <div>
                  <Label>Label</Label>
                  <Input
                    value={category.label}
                    onChange={(e) => updateCategory(catIndex, { label: e.target.value })}
                    placeholder="Nom de la catégorie"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs">Valeurs</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="bordered"
                    onClick={() => addCategoryValue(catIndex)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {category.values.map((value, valIndex) => (
                    <div key={valIndex} className="flex gap-2">
                      <Input
                        value={value.label}
                        onChange={(e) =>
                          updateCategoryValue(catIndex, valIndex, e.target.value)
                        }
                        placeholder="Label"
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCategoryValue(catIndex, valIndex)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currencies */}
      <div>
        <Label className="mb-2 block">Monnaies</Label>
        
        <div className="mb-3">
          <Label htmlFor="mainCurrency" className="text-sm">
            Monnaie de référence
          </Label>
          <Input
            id="mainCurrency"
            value={config.currencies?.mainReferencyLabel || ''}
            onChange={(e) =>
              onChange({
                ...config,
                currencies: {
                  mainReferencyLabel: e.target.value,
                  others: config.currencies?.others || [],
                },
              })
            }
            placeholder="Ex: Pièce d'or"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm">Autres monnaies</Label>
          <Button type="button" size="sm" onClick={addCurrency}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {(config.currencies?.others || []).map((currency, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={currency.label}
                onChange={(e) => updateCurrency(index, { label: e.target.value })}
                placeholder="Label"
                className="flex-1"
              />
              <Input
                type="number"
                value={currency.referencyValue.toString()}
                onChange={(e) =>
                  updateCurrency(index, { referencyValue: parseFloat(e.target.value) || 1 })
                }
                placeholder="Valeur"
                className="w-24"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCurrency(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="required"
          checked={config.required ?? false}
          onCheckedChange={(checked: boolean) => onChange({ ...config, required: checked })}
        />
        <Label htmlFor="required" className="cursor-pointer">
          Obligatoire
        </Label>
      </div>
    </div>
  );
}
