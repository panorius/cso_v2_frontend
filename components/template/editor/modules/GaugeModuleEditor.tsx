'use client';

import { GaugeModuleConfig, GaugeValue } from '@/types/template/modules/gauge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface GaugeModuleEditorProps {
  config: GaugeModuleConfig;
  onChange: (config: GaugeModuleConfig) => void;
}

export function GaugeModuleEditor({ config, onChange }: GaugeModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [
        ...config.values,
        { label: '', defaultMinValue: 0, defaultMaxValue: 100, color: '#3b82f6' },
      ],
    });
  };

  const updateValue = (index: number, updates: Partial<GaugeValue>) => {
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
      <div className="flex items-center justify-between">
        <Label>Jauges</Label>
        <Button type="button" size="sm" onClick={addValue}>
          <Plus className="w-4 h-4 mr-1" />
          Ajouter une jauge
        </Button>
      </div>

      <div className="space-y-4">
        {config.values.map((value, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Jauge {index + 1}</span>
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
                placeholder="Nom de la jauge"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Valeur Min</Label>
                <Input
                  type="number"
                  value={(value.defaultMinValue ?? 0).toString()}
                  onChange={(e) =>
                    updateValue(index, { defaultMinValue: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label>Valeur Max</Label>
                <Input
                  type="number"
                  value={(value.defaultMaxValue ?? 100).toString()}
                  onChange={(e) =>
                    updateValue(index, { defaultMaxValue: parseFloat(e.target.value) || 100 })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Couleur</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={value.color || '#3b82f6'}
                  onChange={(e) => updateValue(index, { color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={value.color || '#3b82f6'}
                  onChange={(e) => updateValue(index, { color: e.target.value })}
                  placeholder="#3b82f6"
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
