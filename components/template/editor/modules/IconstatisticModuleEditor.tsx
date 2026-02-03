'use client';

import { IconstatisticModuleConfig, IconstatisticModuleValue } from '@/types/template/modules/iconstatistic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface IconstatisticModuleEditorProps {
  config: IconstatisticModuleConfig;
  onChange: (config: IconstatisticModuleConfig) => void;
}

export function IconstatisticModuleEditor({ config, onChange }: IconstatisticModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [...config.values, { icon: '⭐', label: '', defaultValue: '' }],
    });
  };

  const updateValue = (index: number, updates: Partial<IconstatisticModuleValue>) => {
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
      <div className="flex items-center justify-between mb-3">
        <Label>Statistiques avec icônes</Label>
        <Button type="button" size="sm" onClick={addValue}>
          <Plus className="w-4 h-4 mr-1" />
          Ajouter
        </Button>
      </div>

      <div className="space-y-3">
        {config.values.map((value, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Statistique {index + 1}</span>
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
              <Label>Icône</Label>
              <Input
                value={value.icon}
                onChange={(e) => updateValue(index, { icon: e.target.value })}
                placeholder="⭐"
              />
            </div>

            <div>
              <Label>Label</Label>
              <Input
                value={value.label}
                onChange={(e) => updateValue(index, { label: e.target.value })}
                placeholder="Nom de la statistique"
              />
            </div>

            <div>
              <Label>Valeur par défaut</Label>
              <Input
                value={value.defaultValue}
                onChange={(e) => updateValue(index, { defaultValue: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
