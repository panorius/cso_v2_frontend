'use client';

import { TemplateEditor } from '@/components/template/TemplateEditor';
import { CharacterSheetTemplate } from '@/types/template';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TemplateEditorPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (template: CharacterSheetTemplate) => {
    setIsSaving(true);
    try {
      // TODO: Implémenter la sauvegarde vers le backend
      console.log('Sauvegarde du template:', template);
      
      // Exemple d'appel API
      // const response = await fetch('/api/templates', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(template),
      // });
      // 
      // if (response.ok) {
      //   router.push('/templates');
      // }
      
      alert('Template sauvegardé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TemplateEditor onSave={handleSave} />
  );
}
