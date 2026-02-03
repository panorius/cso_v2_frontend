'use client';

import { BalanceModuleConfig } from '@/types/template/modules/balance';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface BalanceModuleEditorProps {
  config: BalanceModuleConfig;
  onChange: (config: BalanceModuleConfig) => void;
}

export function BalanceModuleEditor({ config, onChange }: BalanceModuleEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={config.title || ''}
          onChange={(e) => onChange({ ...config, title: e.target.value })}
          placeholder="Titre du module"
        />
      </div>

      <div>
        <Label htmlFor="step">Pas</Label>
        <Input
          id="step"
          type="number"
          value={config.step.toString()}
          onChange={(e) => onChange({ ...config, step: parseFloat(e.target.value) || 1 })}
          placeholder="1"
        />
      </div>

      <div>
        <Label htmlFor="defaultValue">Valeur par défaut</Label>
        <Input
          id="defaultValue"
          type="number"
          value={(config.defaultValue ?? 0).toString()}
          onChange={(e) =>
            onChange({ ...config, defaultValue: parseFloat(e.target.value) || 0 })
          }
          placeholder="0"
        />
      </div>

      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-medium text-sm">Maximum</h4>
        <div>
          <Label htmlFor="maxIcon">Icône</Label>
          <Input
            id="maxIcon"
            value={config.maximum.icon || ''}
            onChange={(e) =>
              onChange({
                ...config,
                maximum: { ...config.maximum, icon: e.target.value },
              })
            }
            placeholder="➕"
          />
        </div>
        <div>
          <Label htmlFor="maxLabel">Label</Label>
          <Input
            id="maxLabel"
            value={config.maximum.label}
            onChange={(e) =>
              onChange({
                ...config,
                maximum: { ...config.maximum, label: e.target.value },
              })
            }
            placeholder="Maximum"
          />
        </div>
        <div>
          <Label htmlFor="maxValue">Valeur</Label>
          <Input
            id="maxValue"
            type="number"
            value={(config.maximum.defaultValue ?? 100).toString()}
            onChange={(e) =>
              onChange({
                ...config,
                maximum: {
                  ...config.maximum,
                  defaultValue: parseFloat(e.target.value) || 100,
                },
              })
            }
            placeholder="100"
          />
        </div>
      </div>

      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-medium text-sm">Minimum</h4>
        <div>
          <Label htmlFor="minIcon">Icône</Label>
          <Input
            id="minIcon"
            value={config.minimum.icon || ''}
            onChange={(e) =>
              onChange({
                ...config,
                minimum: { ...config.minimum, icon: e.target.value },
              })
            }
            placeholder="➖"
          />
        </div>
        <div>
          <Label htmlFor="minLabel">Label</Label>
          <Input
            id="minLabel"
            value={config.minimum.label}
            onChange={(e) =>
              onChange({
                ...config,
                minimum: { ...config.minimum, label: e.target.value },
              })
            }
            placeholder="Minimum"
          />
        </div>
        <div>
          <Label htmlFor="minValue">Valeur</Label>
          <Input
            id="minValue"
            type="number"
            value={(config.minimum.defaultValue ?? 0).toString()}
            onChange={(e) =>
              onChange({
                ...config,
                minimum: {
                  ...config.minimum,
                  defaultValue: parseFloat(e.target.value) || 0,
                },
              })
            }
            placeholder="0"
          />
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
