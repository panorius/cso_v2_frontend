/**
 * Actions pour la gestion des utilisateurs
 */

import { apiHandler, getApiUrl } from "@/lib/utils/apiHandler";

export interface UserProfile {
    id: string;
    pseudo: string;
    email: string;
    image?: string;
    provider: string;
    newsletter: boolean;
    role: string;
    lang: string;
}

export interface UpdateProfileData {
    pseudo?: string;
    image?: string;
    newsletter?: boolean;
    lang?: string;
}

/**
 * Récupérer le profil utilisateur connecté
 */
export async function getCurrentUser(accessToken: string) {
    return apiHandler<UserProfile>(getApiUrl("/users/me"), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

/**
 * Mettre à jour le profil utilisateur
 */
export async function updateProfile(
    accessToken: string,
    data: UpdateProfileData
) {
    return apiHandler<UserProfile>(getApiUrl("/users/me"), {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });
}

/**
 * Supprimer le compte utilisateur
 */
export async function deleteAccount(accessToken: string) {
    return apiHandler(getApiUrl("/users/me"), {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

/**
 * Changer le mot de passe
 */
export async function changePassword(
    accessToken: string,
    currentPassword: string,
    newPassword: string
) {
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
