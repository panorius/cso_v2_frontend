"use client";

import { verifyEmail } from "@/lib/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type VerificationState = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerificationState>("loading");
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<{
    pseudo: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState("error");
      setError("Token de vérification manquant");
      return;
    }

    const handleVerification = async () => {
      try {
        setState("loading");
        const response = await verifyEmail({ token });

        if (response.success && response.data) {
          setState("success");
          setUserData({
            pseudo: response.data.user.pseudo,
            email: response.data.user.email,
          });
        } else {
          setState("error");
          setError(response.error?.message || "Erreur de vérification");
        }
      } catch (err) {
        setState("error");
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      }
    };

    handleVerification();
  }, [searchParams]);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="animate-spin w-8 h-8 text-blue-500"
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
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vérification en cours...
          </h1>
          <p className="text-gray-600">
            Nous vérifions votre adresse email, veuillez patienter.
          </p>
        </div>
      </div>
    );
  }

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
            Email vérifié avec succès !
          </h1>
          {userData && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Bienvenue <strong>{userData.pseudo}</strong> !
              </p>
              <p className="text-gray-600">
                Votre adresse email <strong>{userData.email}</strong> a été
                confirmée.
              </p>
            </div>
          )}
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Se connecter
            </Link>
            <Link
              href="/"
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erreur de vérification
          </h1>
          <div className="mb-6">
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/signup"
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Créer un nouveau compte
            </Link>
            <Link
              href="/"
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}