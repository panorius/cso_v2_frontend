/**
 * Service de gestion des utilisateurs
 */

import { User } from "@/lib/models";
import { apiHandler, getApiUrl, ApiResponse } from "@/lib/utils/apiHandler";
import { TokenService } from "./TokenService";

export interface UpdateProfileData {
    pseudo?: string;
    image?: string;
    newsletter?: boolean;
    lang?: string;
}

export class UserService {
    /**
     * Récupérer le profil utilisateur connecté
     */
    static async getCurrentUser(): Promise<ApiResponse<User>> {
        const accessToken = TokenService.getAccessToken();
        if (!accessToken) {
            return {
                success: false,
                error: "No access token available",
            };
        }

        const result = await apiHandler<{
            success: boolean;
            data: any;
        }>(getApiUrl("/users/me"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (result.success && result.data) {
            // La réponse du backend est { success: true, data: {...} }
            const userData = result.data.data || result.data;
            const user = User.fromJSON(userData);

            return {
                success: true,
                data: user,
            };
        }

        return result as any;
    }

    /**
     * Mettre à jour le profil utilisateur
     */
    static async updateProfile(
        data: UpdateProfileData
    ): Promise<ApiResponse<User>> {
        const accessToken = TokenService.getAccessToken();
        if (!accessToken) {
            return {
                success: false,
                error: "No access token available",
            };
        }

        const result = await apiHandler<{
            success: boolean;
            data: any;
        }>(getApiUrl("/users/me"), {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        if (result.success && result.data) {
            // La réponse du backend est { success: true, data: {...} }
            const userData = result.data.data || result.data;
            const user = User.fromJSON(userData);

            return {
                success: true,
                data: user,
            };
        }

        return result as any;
    }

    /**
     * Supprimer le compte utilisateur
     */
    static async deleteAccount(): Promise<ApiResponse<void>> {
        const accessToken = TokenService.getAccessToken();
        if (!accessToken) {
            return {
                success: false,
                error: "No access token available",
            };
        }

        const result = await apiHandler(getApiUrl("/users/me"), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Nettoyer les tokens après suppression
        if (result.success) {
            TokenService.clearTokens();
        }

        return result;
    }

    /**
     * Changer le mot de passe
     */
    static async changePassword(
        currentPassword: string,
        newPassword: string
    ): Promise<ApiResponse<void>> {
        const accessToken = TokenService.getAccessToken();
        if (!accessToken) {
            return {
                success: false,
                error: "No access token available",
            };
        }

        if (!currentPassword || !newPassword) {
            return {
                success: false,
                error: "Both current and new passwords are required",
            };
        }

        if (newPassword.length < 8) {
            return {
                success: false,
                error: "New password must be at least 8 characters",
            };
        }

        return apiHandler(getApiUrl("/users/me/password"), {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });
    }
}
