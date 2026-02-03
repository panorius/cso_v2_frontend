# Fix: JWT Malformed - Structure de réponse API

## 🐛 Problème initial

```
JWT verification failed: JsonWebTokenError: jwt malformed
```

### Cause racine

Le backend renvoie les données dans cette structure :

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 604800,
    "user": { ... }
  }
}
```

Mais le frontend essayait d'accéder directement à `result.data.accessToken`, alors que `result.data` contient déjà tout l'objet de réponse du backend.

**Accès incorrect :**

```typescript
result.data.accessToken; // ❌ undefined
```

**Accès correct :**

```typescript
result.data.data.accessToken(
    // ✅ ou
    result.data.data || result.data
).accessToken; // ✅ avec fallback
```

## ✅ Solution appliquée

### 1. **AuthService.login** ([AuthService.ts](../../cso_v2_frontend/lib/services/AuthService.ts))

```typescript
// Avant (incorrect)
const tokens = new AuthTokens({
    accessToken: result.data.accessToken, // ❌ undefined
    refreshToken: result.data.refreshToken,
    expiresIn: result.data.expiresIn,
});

// Après (correct)
const authData = result.data.data || result.data;
const tokens = new AuthTokens({
    accessToken: authData.accessToken, // ✅ valide
    refreshToken: authData.refreshToken,
    expiresIn: authData.expiresIn,
});
```

### 2. **AuthService.refreshToken**

Même correction appliquée pour le rafraîchissement du token.

### 3. **AuthService.logout**

Ajout du header `Authorization` car la route backend nécessite l'authentification :

```typescript
const accessToken = TokenService.getAccessToken();

const result = await apiHandler(getApiUrl("/auth/logout"), {
    method: "POST",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
});
```

### 4. **UserService.getCurrentUser**

```typescript
// Avant (incorrect)
if (result.success && result.data) {
    result.data = User.fromJSON(result.data); // ❌
}

// Après (correct)
if (result.success && result.data) {
    const userData = result.data.data || result.data;
    const user = User.fromJSON(userData); // ✅

    return {
        success: true,
        data: user,
    };
}
```

### 5. **UserService.updateProfile**

Même correction appliquée.

## 🔍 Explication détaillée

### Structure de réponse du backend

Toutes les routes du backend (Fastify) retournent :

```typescript
{
  success: boolean,
  data?: any,
  error?: { code: string, message: string }
}
```

### Structure de réponse de apiHandler

Le `apiHandler` du frontend retourne :

```typescript
{
  success: boolean,
  data?: any,  // Contient TOUT le JSON du backend
  error?: string,
  status?: number
}
```

Donc si le backend renvoie :

```json
{
    "success": true,
    "data": { "accessToken": "..." }
}
```

Le frontend reçoit :

```typescript
{
  success: true,
  data: {
    success: true,
    data: { accessToken: "..." }
  }
}
```

### Solutions possibles

**Option 1 : Modifier apiHandler pour extraire automatiquement data.data**

```typescript
// Dans apiHandler
if (data.success && data.data) {
    return {
        success: true,
        data: data.data, // Extraire automatiquement
        status: response.status,
    };
}
```

**Option 2 : Utiliser un fallback (solution choisie)**

```typescript
const authData = result.data.data || result.data;
```

Cette solution est plus flexible car elle gère les deux cas.

## 🧪 Test

Pour vérifier que le problème est résolu :

1. **Se connecter** sur http://localhost:3001
2. **Vérifier dans DevTools** → Application → LocalStorage :
    - `accessToken` doit contenir un JWT valide (format : `eyJhbGc...`)
    - `refreshToken` doit contenir un JWT valide
3. **Naviguer vers /dashboard**
4. **Vérifier la console** : Pas d'erreur "jwt malformed"
5. **Vérifier le Network** : `/api/users/me` retourne 200 OK

## 📝 Logs utiles pour débugger

Les logs suivants ont été ajoutés pour aider au débogage :

```typescript
// Dans apiHandler
console.log("API Call:", { url, options: fetchOptions });
console.log("API Response:", { url, status: response.status, data });
```

Pour les retirer en production, vous pouvez :

- Les mettre derrière un flag `process.env.NODE_ENV === 'development'`
- Utiliser un logger centralisé

## 🎯 Résultat

✅ Les tokens sont maintenant correctement extraits et stockés  
✅ L'authentification fonctionne  
✅ La navigation entre pages protégées fonctionne  
✅ Le rafraîchissement automatique fonctionne

## 🔄 Prochaines améliorations possibles

1. Créer un type strict pour les réponses API backend
2. Ajouter un interceptor pour extraire automatiquement `data.data`
3. Utiliser un logger centralisé au lieu de console.log
4. Ajouter des tests unitaires pour les services
