"use client";
import { createUser } from "@/lib/api";
import { useState } from "react";

interface SignupForm {
  pseudo: string;
  email: string;
  passwordHash: string;
  confirmPassword: string;
  newsletter: boolean;
  termsAccepted: boolean;
}

type SignupState = "idle" | "loading" | "success" | "error";

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    pseudo: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
    newsletter: false,
    termsAccepted: false,
  });

  const [state, setState] = useState<SignupState>("idle");
  const [error, setError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    // Validation du pseudo
    if (!form.pseudo.trim()) {
      errors.pseudo = "Le pseudo est requis";
    } else if (form.pseudo.length < 3) {
      errors.pseudo = "Le pseudo doit contenir au moins 3 caractères";
    } else if (form.pseudo.length > 20) {
      errors.pseudo = "Le pseudo ne peut pas dépasser 20 caractères";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(form.pseudo)) {
      errors.pseudo =
        "Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores";
    }

    // Validation de l'email
    if (!form.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Format d'email invalide";
    }

    // Validation du mot de passe
    if (!form.passwordHash) {
      errors.password = "Le mot de passe est requis";
    } else if (form.passwordHash.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.passwordHash)) {
      errors.password =
        "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre";
    }

    // Validation de la confirmation du mot de passe
    if (form.passwordHash !== form.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Validation des conditions d'utilisation
    if (!form.termsAccepted) {
      errors.termsAccepted = "Vous devez accepter les conditions d'utilisation";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setState("loading");
    setError("");

    try {
      const response = await createUser({
        pseudo: form.pseudo,
        email: form.email,
        passwordHash: form.passwordHash,
        confirmPassword: form.confirmPassword,
        newsletter: form.newsletter,
        termsAccepted: form.termsAccepted,
      });

      if (response.success) {
        setState("success");
      } else {
        setState("error");
        setError(response.error?.message || "Une erreur est survenue");
      }
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  const handleInputChange = (
    field: keyof SignupForm,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur de validation pour ce champ
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (state === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Compte créé avec succès !
          </h1>
          <p className="text-gray-600 mb-6">
            Un email de vérification a été envoyé à{" "}
            <strong>{form.email}</strong>. Veuillez vérifier votre boîte mail et
            cliquer sur le lien pour activer votre compte.
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rejoignez la communauté CSO
          </p>
        </div>

        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Pseudo */}
            <div>
              <label
                htmlFor="pseudo"
                className="block text-sm font-medium text-gray-700 mb-1">
                Pseudo *
              </label>
              <input
                id="pseudo"
                name="pseudo"
                type="text"
                autoComplete="username"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.pseudo ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Votre pseudo"
                value={form.pseudo}
                onChange={(e) => handleInputChange("pseudo", e.target.value)}
              />
              {validationErrors.pseudo && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.pseudo}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.password
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="Votre mot de passe"
                value={form.passwordHash}
                onChange={(e) =>
                  handleInputChange("passwordHash", e.target.value)
                }
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.confirmPassword
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="Confirmez votre mot de passe"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Newsletter */}
            <div className="flex items-center">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={form.newsletter}
                onChange={(e) =>
                  handleInputChange("newsletter", e.target.checked)
                }
              />
              <label
                htmlFor="newsletter"
                className="ml-2 block text-sm text-gray-700">
                Je souhaite recevoir la newsletter
              </label>
            </div>

            {/* Conditions d'utilisation */}
            <div className="flex items-start">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                required
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 ${
                  validationErrors.termsAccepted ? "border-red-300" : ""
                }`}
                checked={form.termsAccepted}
                onChange={(e) =>
                  handleInputChange("termsAccepted", e.target.checked)
                }
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 block text-sm text-gray-700">
                J&apos;accepte les{" "}
                <a href="/terms" className="text-blue-600 hover:text-blue-500">
                  conditions d&apos;utilisation
                </a>{" "}
                et la{" "}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-500">
                  politique de confidentialité
                </a>
                *
              </label>
            </div>
            {validationErrors.termsAccepted && (
              <p className="text-sm text-red-600">
                {validationErrors.termsAccepted}
              </p>
            )}
          </div>

          {/* Message d'erreur global */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {state === "loading" ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </div>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500">
                Se connecter
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
