'use client';

import { AbilityModuleConfig } from '@/types/template/modules/ability';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface AbilityModuleEditorProps {
  config: AbilityModuleConfig;
  onChange: (config: AbilityModuleConfig) => void;
}

export function AbilityModuleEditor({ config, onChange }: AbilityModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [...config.values, ''],
    });
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...config.values];
    newValues[index] = value;
    onChange({ ...config, values: newValues });
  };

  const removeValue = (index: number) => {
    onChange({
      ...config,
      values: config.values.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={config.label || ''}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          placeholder="Nom de la capacité"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Valeurs</Label>
          <Button type="button" size="sm" onClick={addValue}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {config.values.map((value, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => updateValue(index, e.target.value)}
                placeholder={`Valeur ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeValue(index)}
                disabled={config.values.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="rollDiceFormula">Formule de dé</Label>
        <Input
          id="rollDiceFormula"
          value={config.rollDiceFormula || ''}
          onChange={(e) => onChange({ ...config, rollDiceFormula: e.target.value })}
          placeholder="Ex: 1d20"
        />
      </div>

      <div>
        <Label htmlFor="modFormula">Formule de modificateur</Label>
        <Input
          id="modFormula"
          value={config.modFormula || ''}
          onChange={(e) => onChange({ ...config, modFormula: e.target.value })}
          placeholder="Ex: (value-10)/2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasBonus"
          checked={config.hasBonus ?? false}
          onCheckedChange={(checked: boolean) => onChange({ ...config, hasBonus: checked })}
        />
        <Label htmlFor="hasBonus" className="cursor-pointer">
          Possède des bonus
        </Label>
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
