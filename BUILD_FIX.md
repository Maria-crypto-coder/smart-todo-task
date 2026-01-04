# Solución al Error de Build

## Error
```
Error: @clerk/clerk-react: Missing publishableKey
```

## Causa
El comando `npm run build` necesita las variables de entorno de Clerk, pero el archivo `.env.local` tiene valores de ejemplo.

## Solución

### Opción 1: Agregar las keys reales de Clerk (Recomendado)

1. Ve a https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a "API Keys"
4. Copia las keys
5. Edita el archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_TU_KEY_REAL_AQUI
CLERK_SECRET_KEY=sk_test_TU_KEY_REAL_AQUI

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

6. Ejecuta de nuevo:
```bash
npm run build
```

### Opción 2: Build sin Clerk (Para testing local)

Si solo quieres probar el build sin configurar Clerk:

1. Edita `src/app/layout.tsx` temporalmente:

```typescript
// Comenta ClerkProvider temporalmente
export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>  // ← Comentar
      <html lang="es">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    // </ClerkProvider>  // ← Comentar
  );
}
```

2. Edita `src/app/page.tsx` temporalmente:

```typescript
// Comenta SignedIn/SignedOut
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
}
```

3. Comenta `src/middleware.ts`:

```typescript
// import { clerkMiddleware } from '@clerk/nextjs/server';
// export default clerkMiddleware();

// export const config = {
//   matcher: [...]
// };
```

4. Ahora ejecuta:
```bash
npm run build
```

**IMPORTANTE:** Esto es solo para testing. Revierte los cambios después.

### Opción 3: Variables de entorno temporales

Ejecuta el build con variables inline:

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_temp"; $env:CLERK_SECRET_KEY="sk_test_temp"; npm run build

# Windows CMD
set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_temp && set CLERK_SECRET_KEY=sk_test_temp && npm run build

# Linux/Mac
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_temp CLERK_SECRET_KEY=sk_test_temp npm run build
```

## Para Desplegar en Vercel

1. No necesitas hacer build local
2. Vercel lo hace automáticamente
3. Solo agrega las variables de entorno en el dashboard de Vercel:
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega las keys de Clerk
   - Redeploy

## Verificar que funcionó

Después del build exitoso, deberías ver:

```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    ...      ...
└ ○ /sign-in                             ...      ...
```

## Notas

- El archivo `.env.local` NO se sube a Git (está en .gitignore)
- Cada desarrollador necesita su propio `.env.local`
- En producción, usa las variables de entorno de la plataforma (Vercel, Netlify, etc.)
