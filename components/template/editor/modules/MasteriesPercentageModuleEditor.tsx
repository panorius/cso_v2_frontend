'use client';

import {
  MasteriesPercentageModuleConfig,
  MasteriesPercentageValue,
} from '@/types/template/modules/masteriespercentage';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface MasteriesPercentageModuleEditorProps {
  config: MasteriesPercentageModuleConfig;
  onChange: (config: MasteriesPercentageModuleConfig) => void;
}

export function MasteriesPercentageModuleEditor({
  config,
  onChange,
}: MasteriesPercentageModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [...config.values, { label: '', value: '', isReadOnly: false }],
    });
  };

  const updateValue = (index: number, updates: Partial<MasteriesPercentageValue>) => {
    const newValues = [...config.values];
    newValues[index] = { ...newValues[index], ...updates };
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
          placeholder="Titre du module"
        />
      </div>

      <div>
        <Label htmlFor="rollDiceFormula">Formule de dé</Label>
        <Input
          id="rollDiceFormula"
          value={config.rollDiceFormula || ''}
          onChange={(e) => onChange({ ...config, rollDiceFormula: e.target.value })}
          placeholder="Ex: 1d100"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Maîtrises</Label>
          <Button type="button" size="sm" onClick={addValue}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {config.values.map((value, index) => (
            <div key={index} className="p-4 space-y-2 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Maîtrise {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeValue(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Label</Label>
                <Input
                  value={value.label}
                  onChange={(e) => updateValue(index, { label: e.target.value })}
                  placeholder="Nom de la maîtrise"
                />
              </div>

              <div>
                <Label>Valeur (%)</Label>
                <Input
                  value={value.value}
                  onChange={(e) => updateValue(index, { value: e.target.value })}
                  placeholder="50"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`readOnly-${index}`}
                  checked={value.isReadOnly ?? false}
                  onCheckedChange={(checked: boolean) =>
                    updateValue(index, { isReadOnly: checked })
                  }
                />
                <Label htmlFor={`readOnly-${index}`} className="cursor-pointer">
                  Lecture seule
                </Label>
              </div>
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
