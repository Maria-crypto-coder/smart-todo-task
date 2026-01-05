# Solución Rápida - Error de Build con Clerk

## ❌ Error Actual
```
Error: @clerk/clerk-react: Missing publishableKey
```

## ✅ Solución

### Paso 1: Obtener tus Keys de Clerk

1. Ve a: https://dashboard.clerk.com
2. Selecciona tu aplicación (o crea una nueva)
3. Ve a **"API Keys"** en el menú lateral
4. Copia las siguientes keys:
   - `Publishable key` (empieza con `pk_test_...`)
   - `Secret key` (empieza con `sk_test_...`)

### Paso 2: Editar .env.local

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza TODO el contenido con esto (usando TUS keys reales):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_TU_KEY_AQUI
CLERK_SECRET_KEY=sk_test_TU_KEY_AQUI

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

3. **IMPORTANTE:** Reemplaza `pk_test_TU_KEY_AQUI` y `sk_test_TU_KEY_AQUI` con tus keys reales
4. Guarda el archivo

### Paso 3: Verificar

Ejecuta de nuevo:
```bash
npm run build
```

Deberías ver:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## Si No Tienes Cuenta en Clerk

### Crear Cuenta Gratis:

1. Ve a: https://clerk.com
2. Click en "Start Building for Free"
3. Regístrate con GitHub, Google o email
4. Crea una nueva aplicación:
   - Name: "Smart TODO App"
   - Select: "Next.js"
5. Copia las API Keys que te muestra
6. Pégalas en `.env.local`

---

## Alternativa: Desplegar Sin Build Local

Si prefieres no hacer build local, puedes:

1. **Subir a GitHub** (sin hacer build)
2. **Desplegar en Vercel o Railway**
3. **Configurar las variables de entorno en la plataforma**
4. La plataforma hará el build automáticamente

### Para Vercel:
```bash
npm i -g vercel
vercel
# Agrega las variables en el dashboard de Vercel
```

### Para Railway:
1. Conecta tu repo de GitHub
2. Agrega las variables en Railway dashboard
3. Railway hace el build automáticamente

---

## Verificación Rápida

Para verificar que las variables están bien configuradas:

```bash
# En PowerShell
echo $env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Debería mostrar tu key, no "undefined" o vacío
```

---

## Notas Importantes

- ⚠️ **NUNCA** subas `.env.local` a GitHub (ya está en .gitignore)
- ✅ Las keys de Clerk son gratuitas para desarrollo
- ✅ Cada entorno (local, producción) necesita sus propias variables
- ✅ En producción, configura las variables en la plataforma de hosting
