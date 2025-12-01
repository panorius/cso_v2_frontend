// apps/frontend/src/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface CreateUserInput {
  pseudo: string;
  email: string;
  passwordHash: string;
  confirmPassword: string;
  newsletter?: boolean;
  termsAccepted?: boolean;
}

export interface CreateUserResponse {
  success: boolean;
  data?: {
    id: string;
    pseudo: string;
    email: string;
    provider: string;
    lang: string;
    newsletter: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export async function createUser(
  input: CreateUserInput
): Promise<CreateUserResponse> {
  console.log(input);
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      pseudo: input.pseudo,
      email: input.email,
      passwordHash: input.passwordHash, // Le backend attend passwordHash
      confirmPassword: input.confirmPassword, // Confirmation requise par le backend
      provider: "CSO", // Valeur par défaut (majuscules comme attendu)
      lang: "fr", // Langue française par défaut
      newsletter: input.newsletter || false,
      role: "USER", // Role par défaut (majuscules comme attendu)
      termsAccepted: input.termsAccepted || true, // Requis par le backend
      image: null, // Pas d'image lors de l'inscription
    }),
  });

  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Retourner l'erreur structurée du backend
    throw new Error(
      responseData.error?.message ??
        responseData.message ??
        `Erreur lors de la création du compte: ${res.status}`
    );
  }

  return responseData;
}

export interface VerifyEmailInput {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  data?: {
    message: string;
    user: {
      id: string;
      pseudo: string;
      email: string;
    };
  };
  error?: {
    code: string;
    message: string;
  };
}

export async function verifyEmail(
  input: VerifyEmailInput
): Promise<VerifyEmailResponse> {
  const res = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token: input.token,
    }),
  });

  const responseData = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      responseData.error?.message ??
        responseData.message ??
        `Erreur lors de la vérification: ${res.status}`
    );
  }

  return responseData;
}

export async function getUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) {
    throw new Error(`GetUser failed: ${res.status}`);
  }
  return res.json();
}
