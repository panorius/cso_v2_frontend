'use client';

import { SeparatorModuleConfig } from '@/types/template/modules/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SeparatorModuleEditorProps {
  config: SeparatorModuleConfig;
  onChange: (config: SeparatorModuleConfig) => void;
}

export function SeparatorModuleEditor({ config, onChange }: SeparatorModuleEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Label (optionnel)</Label>
        <Input
          id="label"
          value={config.label || ''}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          placeholder="Texte du séparateur"
        />
      </div>

      <div>
        <Label htmlFor="style">Style</Label>
        <Select
          value={config.style || 'line'}
          onValueChange={(value: string) => onChange({ ...config, style: value as 'line' | 'space' })}
        >
          <SelectTrigger id="style">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Ligne</SelectItem>
            <SelectItem value="space">Espace</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.style === 'line' && (
        <>
          <div>
            <Label htmlFor="thickness">Épaisseur (px)</Label>
            <Input
              id="thickness"
              type="number"
              value={(config.thickness ?? 1).toString()}
              onChange={(e) =>
                onChange({ ...config, thickness: parseInt(e.target.value) || 1 })
              }
              placeholder="1"
            />
          </div>

          <div>
            <Label htmlFor="color">Couleur</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={config.color || '#d1d5db'}
                onChange={(e) => onChange({ ...config, color: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={config.color || '#d1d5db'}
                onChange={(e) => onChange({ ...config, color: e.target.value })}
                placeholder="#d1d5db"
                className="flex-1 font-mono"
              />
            </div>
          </div>
        </>
      )}

      <div>
        <Label htmlFor="marginTop">Marge supérieure (px)</Label>
        <Input
          id="marginTop"
          type="number"
          value={(config.marginTop ?? 16).toString()}
          onChange={(e) => onChange({ ...config, marginTop: parseInt(e.target.value) || 16 })}
          placeholder="16"
        />
      </div>

      <div>
        <Label htmlFor="marginBottom">Marge inférieure (px)</Label>
        <Input
          id="marginBottom"
          type="number"
          value={(config.marginBottom ?? 16).toString()}
          onChange={(e) =>
            onChange({ ...config, marginBottom: parseInt(e.target.value) || 16 })
          }
          placeholder="16"
        />
      </div>
    </div>
  );
}
