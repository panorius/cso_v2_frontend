"use client";

import { SchemaEditor } from "@/components/template/editor/SchemaEditor";
import { Schema } from "@/types/template/schema";

export default function SchemaEditorPage() {
    // Vous pouvez charger un schéma existant ici
    // const initialSchema = ...

    const handleSave = (schema: Schema) => {
        console.log("Schéma sauvegardé:", schema);
        // Ici, vous pouvez envoyer le schéma à une API, etc.
    };

    return (
        <div className="min-h-screen">
            <SchemaEditor
                // initialSchema={initialSchema} // Optionnel
                onSave={handleSave}
            />
        </div>
    );
}
