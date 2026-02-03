/**
 * Modèle de données pour l'authentification
 */

export class AuthTokens {
    public accessToken: string;
    public refreshToken: string;
    public expiresAt?: Date;

    constructor(data: {
        accessToken: string;
        refreshToken: string;
        expiresIn?: number;
    }) {
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;

        if (data.expiresIn) {
            this.expiresAt = new Date(Date.now() + data.expiresIn * 1000);
        }
    }

    /**
     * Vérifie si le token est expiré ou va expirer bientôt
     */
    isExpired(bufferSeconds: number = 60): boolean {
        if (!this.expiresAt) return false;

        const now = new Date();
        const bufferTime = new Date(
            this.expiresAt.getTime() - bufferSeconds * 1000
        );

        return now >= bufferTime;
    }

    /**
     * Sérialise pour le stockage
     */
    toJSON() {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expiresAt: this.expiresAt?.toISOString(),
        };
    }

    /**
     * Crée une instance depuis un JSON
     */
    static fromJSON(json: any): AuthTokens {
        const tokens = new AuthTokens({
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
        });

        if (json.expiresAt) {
            tokens.expiresAt = new Date(json.expiresAt);
        }

        return tokens;
    }
}

export class SignupCredentials {
    public pseudo: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public newsletter: boolean;
    public termsAccepted: boolean;
    public lang?: string;

    constructor(data: {
        pseudo: string;
        email: string;
        password: string;
        confirmPassword: string;
        newsletter: boolean;
        termsAccepted: boolean;
        lang?: string;
    }) {
        this.pseudo = data.pseudo.trim();
        this.email = data.email.trim().toLowerCase();
        this.password = data.password;
        this.confirmPassword = data.confirmPassword;
        this.newsletter = data.newsletter;
        this.termsAccepted = data.termsAccepted;
        this.lang = data.lang || this.detectBrowserLanguage();
    }

    /**
     * Détecte la langue du navigateur
     */
    private detectBrowserLanguage(): string {
        if (typeof navigator !== "undefined") {
            return navigator.language.split("-")[0];
        }
        return "en";
    }

    /**
     * Valide les données d'inscription
     */
    validate(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!this.pseudo || this.pseudo.length < 3) {
            errors.push("Pseudo must be at least 3 characters");
        }

        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push("Invalid email address");
        }

        if (!this.password || this.password.length < 8) {
            errors.push("Password must be at least 8 characters");
        }

        if (this.password !== this.confirmPassword) {
            errors.push("Passwords do not match");
        }

        if (!this.termsAccepted) {
            errors.push("You must accept the terms and conditions");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }

    /**
     * Valide un email
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Convertit en format API
     */
    toAPIFormat() {
        return {
            pseudo: this.pseudo,
            email: this.email,
            passwordHash: this.password,
            confirmPassword: this.confirmPassword,
            provider: "CSO",
            newsletter: this.newsletter,
            termsAccepted: this.termsAccepted,
            lang: this.lang,
        };
    }
}

export class LoginCredentials {
    public email?: string;
    public pseudo?: string;
    public password: string;

    constructor(data: { email?: string; pseudo?: string; password: string }) {
        this.email = data.email?.trim();
        this.pseudo = data.pseudo?.trim();
        this.password = data.password;
    }

    /**
     * Valide les données de connexion
     */
    validate(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!this.email && !this.pseudo) {
            errors.push("Email or pseudo is required");
        }

        if (!this.password) {
            errors.push("Password is required");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }

    /**
     * Convertit en format API
     */
    toAPIFormat() {
        const result: { email?: string; pseudo?: string; password: string } = {
            password: this.password,
        };

        if (this.email) {
            result.email = this.email;
        }

        if (this.pseudo) {
            result.pseudo = this.pseudo;
        }

        return result;
    }
}

export class OAuthSignupData {
    public pseudo: string;
    public newsletter: boolean;
    public termsAccepted: boolean;
    public provider: string;

    constructor(data: {
        pseudo: string;
        newsletter: boolean;
        termsAccepted: boolean;
        provider: string;
    }) {
        this.pseudo = data.pseudo.trim();
        this.newsletter = data.newsletter;
        this.termsAccepted = data.termsAccepted;
        this.provider = data.provider.toLowerCase();
    }

    /**
     * Valide les données OAuth
     */
    validate(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!this.pseudo || this.pseudo.length < 3) {
            errors.push("Pseudo must be at least 3 characters");
        }

        if (!this.termsAccepted) {
            errors.push("You must accept the terms and conditions");
        }

        const validProviders = ["google", "facebook", "twitter", "discord"];
        if (!validProviders.includes(this.provider)) {
            errors.push("Invalid OAuth provider");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }

    /**
     * Sérialise pour le stockage
     */
    toJSON() {
        return {
            pseudo: this.pseudo,
            newsletter: this.newsletter,
            termsAccepted: this.termsAccepted,
            provider: this.provider,
        };
    }

    /**
     * Crée une instance depuis un JSON
     */
    static fromJSON(json: any): OAuthSignupData | null {
        if (!json) return null;

        return new OAuthSignupData({
            pseudo: json.pseudo,
            newsletter: json.newsletter,
            termsAccepted: json.termsAccepted,
            provider: json.provider,
        });
    }
}
