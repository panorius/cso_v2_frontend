# Système d'authentification protégée

Ce système permet de vérifier automatiquement que l'utilisateur est toujours connecté et que son token est valide sur les routes protégées.

## 📋 Fonctionnalités

- ✅ Vérification automatique du token à chaque chargement de page protégée
- ✅ Rafraîchissement automatique du token avant expiration
- ✅ Vérification que l'utilisateur existe toujours dans la base de données
- ✅ Contrôle périodique (toutes les 5 minutes) de l'authentification
- ✅ Redirection automatique vers la page de connexion si non authentifié
- ✅ Contexte global pour éviter les appels API redondants
- ✅ Loader personnalisé pendant la vérification

## 🚀 Utilisation

### Méthode 1 : Protéger une page entière avec ProtectedRoute

Utilisez le composant `ProtectedRoute` dans votre layout pour protéger toutes les pages d'une section :

```tsx
// app/dashboard/layout.tsx
"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute redirectTo="/" loadingMessage="Chargement...">
            <div>
                {/* Votre contenu protégé */}
                {children}
            </div>
        </ProtectedRoute>
    );
}
```

### Méthode 2 : Utiliser le contexte d'authentification dans un composant

Pour accéder aux informations de l'utilisateur et aux méthodes d'authentification :

```tsx
"use client";

import { useAuthContext } from "@/lib/contexts/AuthContext";

export default function MyPage() {
    const { user, logout, isLoading, isAuthenticated } = useAuthContext();

    if (isLoading) return <div>Chargement...</div>;
    if (!isAuthenticated) return null; // Ou redirection

    return (
        <div>
            <h1>Bienvenue {user?.pseudo}</h1>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
}
```

### Méthode 3 : Vérification simple avec redirection automatique

Pour une vérification simple qui redirige automatiquement si non authentifié :

```tsx
"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";

export default function MyProtectedPage() {
    const { user, isLoading } = useRequireAuth("/"); // Redirige vers "/" si non authentifié

    if (isLoading) return <div>Chargement...</div>;

    return <div>Contenu protégé pour {user?.pseudo}</div>;
}
```

## 🏗️ Architecture

### Composants créés

1. **`useAuth`** ([lib/hooks/useAuth.ts](lib/hooks/useAuth.ts))

    - Hook principal de gestion de l'authentification
    - Vérifie le token, rafraîchit si nécessaire
    - Récupère les informations de l'utilisateur
    - Contrôle périodique automatique

2. **`AuthContext`** ([lib/contexts/AuthContext.tsx](lib/contexts/AuthContext.tsx))

    - Contexte React pour partager l'état d'authentification
    - Évite les appels API redondants
    - Accessible via `useAuthContext()`

3. **`ProtectedRoute`** ([components/auth/ProtectedRoute.tsx](components/auth/ProtectedRoute.tsx))

    - Composant wrapper pour protéger des routes
    - Gère la redirection automatique
    - Affiche un loader pendant la vérification

4. **`useRequireAuth`** ([lib/hooks/useRequireAuth.ts](lib/hooks/useRequireAuth.ts))
    - Hook simplifié pour les pages nécessitant l'authentification
    - Utilise le contexte pour éviter les appels redondants

### Flux d'authentification

```
1. Chargement de la page protégée
   ↓
2. ProtectedRoute ou useRequireAuth vérifie l'authentification
   ↓
3. useAuth vérifie si le token existe et n'est pas expiré
   ↓
4. Si le token expire bientôt → Rafraîchissement automatique
   ↓
5. Appel API pour récupérer l'utilisateur (vérification qu'il existe encore)
   ↓
6. Si tout est OK → Affichage du contenu
   Si KO → Redirection vers la page de connexion
```

## ⚙️ Configuration

### Personnalisation de la vérification périodique

Par défaut, la vérification est effectuée toutes les 5 minutes. Pour modifier cette durée, éditez [lib/hooks/useAuth.ts](lib/hooks/useAuth.ts) :

```typescript
// Ligne ~115
const interval = setInterval(
    () => {
        checkAuth();
    },
    5 * 60 * 1000 // Modifier cette valeur (en millisecondes)
);
```

### Personnalisation du délai de rafraîchissement

Le token est automatiquement rafraîchi s'il expire dans moins de 5 minutes. Pour modifier ce seuil, éditez [lib/services/TokenService.ts](lib/services/TokenService.ts) :

```typescript
// Ligne ~76
shouldRefresh(): boolean {
    const tokens = this.getTokens();
    if (!tokens) return false;

    // Modifier 300 (secondes) selon vos besoins
    return tokens.isExpired(300);
}
```

## 🔒 Sécurité

### Ce qui est vérifié :

- ✅ Présence du token dans le localStorage
- ✅ Validité du token (non expiré)
- ✅ Existence de l'utilisateur dans la base de données
- ✅ Rafraîchissement automatique avant expiration
- ✅ Nettoyage des tokens en cas d'erreur

### Cas gérés :

- Token expiré → Tentative de rafraîchissement, puis déconnexion si échec
- Utilisateur supprimé → Déconnexion automatique
- Token invalide → Déconnexion automatique
- Erreur réseau → Affichage d'un message d'erreur

## 📝 Exemple complet

Voir l'implémentation dans [app/dashboard/layout.tsx](app/dashboard/layout.tsx) et [app/dashboard/page.tsx](app/dashboard/page.tsx) pour un exemple complet d'utilisation.

## 🐛 Débogage

Pour activer les logs de débogage, vous pouvez ajouter des console.log dans :

- [lib/hooks/useAuth.ts](lib/hooks/useAuth.ts) - Pour suivre le flux d'authentification
- [lib/services/TokenService.ts](lib/services/TokenService.ts) - Pour voir les opérations sur les tokens
- [lib/services/AuthService.ts](lib/services/AuthService.ts) - Pour suivre les appels API d'authentification
