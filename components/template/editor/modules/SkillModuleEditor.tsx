'use client';

import { SkillModuleConfig, SkillModuleValue, BonusMalusConfig } from '@/types/template/modules/skill';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface SkillModuleEditorProps {
  config: SkillModuleConfig;
  onChange: (config: SkillModuleConfig) => void;
}

export function SkillModuleEditor({ config, onChange }: SkillModuleEditorProps) {
  const addValue = () => {
    onChange({
      ...config,
      values: [...config.values, { label: '', defaultValue: '' }],
    });
  };

  const updateValue = (index: number, updates: Partial<SkillModuleValue>) => {
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

  const addBonusMalus = () => {
    onChange({
      ...config,
      listBonusMalus: [
        ...(config.listBonusMalus || []),
        { name: '', operator: '+', value: 0 },
      ],
    });
  };

  const updateBonusMalus = (index: number, updates: Partial<BonusMalusConfig>) => {
    const newList = [...(config.listBonusMalus || [])];
    newList[index] = { ...newList[index], ...updates };
    onChange({ ...config, listBonusMalus: newList });
  };

  const removeBonusMalus = (index: number) => {
    onChange({
      ...config,
      listBonusMalus: config.listBonusMalus?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Values */}
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
                value={value.label}
                onChange={(e) => updateValue(index, { label: e.target.value })}
                placeholder="Label"
                className="flex-1"
              />
              <Input
                value={value.defaultValue}
                onChange={(e) => updateValue(index, { defaultValue: e.target.value })}
                placeholder="Valeur par défaut"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeValue(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Roll Dice Formula */}
      <div>
        <Label htmlFor="rollDiceFormula">Formule de dé</Label>
        <Input
          id="rollDiceFormula"
          value={config.rollDiceFormula || ''}
          onChange={(e) => onChange({ ...config, rollDiceFormula: e.target.value })}
          placeholder="Ex: 1d20"
        />
      </div>

      {/* Bonus/Malus */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Bonus/Malus</Label>
          <Button type="button" size="sm" onClick={addBonusMalus}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {(config.listBonusMalus || []).map((bonus, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={bonus.name}
                onChange={(e) => updateBonusMalus(index, { name: e.target.value })}
                placeholder="Nom"
                className="flex-1"
              />
              <Select
                value={bonus.operator}
                onValueChange={(value: string) =>
                  updateBonusMalus(index, { operator: value as '+' | '-' | '*' | '/' })
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+">+</SelectItem>
                  <SelectItem value="-">-</SelectItem>
                  <SelectItem value="*">×</SelectItem>
                  <SelectItem value="/">÷</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={bonus.value.toString()}
                onChange={(e) =>
                  updateBonusMalus(index, { value: parseFloat(e.target.value) || 0 })
                }
                placeholder="Valeur"
                className="w-24"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeBonusMalus(index)}
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
