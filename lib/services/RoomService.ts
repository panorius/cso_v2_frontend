import { apiHandler, getApiUrl } from "@/lib/utils/api";

export interface Room {
    id: string;
    name: string;
    userId: string;
    templateId: string;
    image?: {
        url: string;
        publicId?: string;
    };
    note: string[];
    favoriteDice: Array<{
        name: string;
        roll: string;
        icon: string;
    }>;
    isPrivate: boolean;
    password: string;
    options: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRoomInput {
    name: string;
    templateId: string;
    image?: File;
    isPrivate?: boolean;
    password?: string;
}

export class RoomService {
    /**
     * Récupérer toutes les rooms de l'utilisateur connecté
     */
    static async getUserRooms() {
        return apiHandler<Room[]>(getApiUrl("/rooms"), {
            method: "GET",
        });
    }

    /**
     * Récupérer une room par son ID
     */
    static async getRoomById(roomId: string) {
        return apiHandler<Room>(getApiUrl(`/rooms/${roomId}`), {
            method: "GET",
        });
    }

    /**
     * Créer une nouvelle room
     */
    static async createRoom(input: CreateRoomInput) {
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("templateId", input.templateId);

        if (input.image) {
            formData.append("image", input.image);
        }

        if (input.isPrivate !== undefined) {
            formData.append("isPrivate", String(input.isPrivate));
        }

        if (input.password) {
            formData.append("password", input.password);
        }

        return apiHandler<Room>(getApiUrl("/rooms"), {
            method: "POST",
            body: formData,
        });
    }

    /**
     * Supprimer une room
     */
    static async deleteRoom(roomId: string) {
        return apiHandler(getApiUrl(`/rooms/${roomId}`), {
            method: "DELETE",
        });
    }
}
