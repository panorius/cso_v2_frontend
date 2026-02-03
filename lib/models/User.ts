/**
 * Modèle de données User
 */

export class User {
    public id: string;
    public pseudo: string;
    public email: string;
    public image?: string;
    public provider: string;
    public newsletter: boolean;
    public role: string;
    public lang: string;
    public createdAt?: Date;
    public lastConnection?: Date;

    constructor(data: {
        id: string;
        pseudo: string;
        email: string;
        image?: string;
        provider: string;
        newsletter: boolean;
        role: string;
        lang: string;
        createdAt?: string | Date;
        lastConnection?: string | Date;
    }) {
        this.id = data.id;
        this.pseudo = data.pseudo;
        this.email = data.email;
        this.image = data.image;
        this.provider = data.provider;
        this.newsletter = data.newsletter;
        this.role = data.role;
        this.lang = data.lang;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
        this.lastConnection = data.lastConnection
            ? new Date(data.lastConnection)
            : undefined;
    }

    /**
     * Vérifie si l'utilisateur est un administrateur
     */
    isAdmin(): boolean {
        return this.role === "ADMIN";
    }

    /**
     * Vérifie si l'utilisateur utilise un provider OAuth
     */
    isOAuthUser(): boolean {
        return this.provider !== "CSO";
    }

    /**
     * Retourne le nom d'affichage de l'utilisateur
     */
    getDisplayName(): string {
        return this.pseudo;
    }

    /**
     * Retourne l'initiale pour l'avatar
     */
    getInitial(): string {
        return this.pseudo.charAt(0).toUpperCase();
    }

    /**
     * Sérialise l'objet pour le stockage
     */
    toJSON() {
        return {
            id: this.id,
            pseudo: this.pseudo,
            email: this.email,
            image: this.image,
            provider: this.provider,
            newsletter: this.newsletter,
            role: this.role,
            lang: this.lang,
            createdAt: this.createdAt?.toISOString(),
            lastConnection: this.lastConnection?.toISOString(),
        };
    }

    /**
     * Crée une instance depuis un JSON
     */
    static fromJSON(json: any): User {
        return new User(json);
    }
}
