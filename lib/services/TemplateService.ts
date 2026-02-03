import { apiHandler, getApiUrl } from "@/lib/utils/api";

export interface Template {
    props: {
        name: string;
        image?: {
            url: string;
            publicId?: string;
        };
        version: Record<string, any>;
        schemaIds: string[];
        rules?: Record<string, any>;
        isPublished: boolean;
        userId: string;
        contributors: string[];
        tags: string[];
        lang: string;
        createdAt: string;
        updatedAt: string;
    };
    _id: string;
}

export class TemplateService {
    /**
     * Récupérer tous les templates de l'utilisateur connecté
     */
    static async getUserTemplates() {
        return apiHandler<Template[]>(getApiUrl("/templates"), {
            method: "GET",
        });
    }

    /**
     * Récupérer un template par son ID
     */
    static async getTemplateById(templateId: string) {
        return apiHandler<Template>(getApiUrl(`/templates/${templateId}`), {
            method: "GET",
        });
    }

    /**
     * Récupérer les templates publics
     */
    static async getPublicTemplates() {
        return apiHandler<Template[]>(getApiUrl("/templates/public"), {
            method: "GET",
        });
    }
}
