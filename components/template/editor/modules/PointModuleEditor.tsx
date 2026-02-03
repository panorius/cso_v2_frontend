'use client';

import { PointModuleConfig } from '@/types/template/modules/point';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface PointModuleEditorProps {
  config: PointModuleConfig;
  onChange: (config: PointModuleConfig) => void;
}

export function PointModuleEditor({ config, onChange }: PointModuleEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={config.label || ''}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          placeholder="Nom du système de points"
        />
      </div>

      <div>
        <Label htmlFor="value">Nombre de points</Label>
        <Input
          id="value"
          type="number"
          value={config.value.toString()}
          onChange={(e) => onChange({ ...config, value: parseInt(e.target.value) || 0 })}
          placeholder="5"
        />
        <p className="text-xs text-gray-500 mt-1">Nombre de points à afficher</p>
      </div>

      <div>
        <Label htmlFor="defaultValue">Valeur par défaut</Label>
        <Input
          id="defaultValue"
          value={config.defaultValue || ''}
          onChange={(e) => onChange({ ...config, defaultValue: e.target.value })}
          placeholder="Ex: ○ pour vide, ● pour rempli"
        />
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
