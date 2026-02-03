"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth, UseAuthReturn } from "@/lib/hooks/useAuth";

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Provider pour gérer l'état d'authentification global
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Hook pour accéder au contexte d'authentification
 */
export function useAuthContext(): UseAuthReturn {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
}
