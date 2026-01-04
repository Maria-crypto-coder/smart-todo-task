# Setup de la App

## 1. Instalar dependencias

Primero necesitas instalar las dependencias. Abre PowerShell como administrador y ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego en la terminal normal:

```bash
npm install
```

Esto instalará:
- `@clerk/nextjs` - Autenticación
- `lucide-react` - Iconos
- `framer-motion` - Animaciones (opcional)

## 2. Configurar Clerk (Autenticación)

### Crear cuenta en Clerk

1. Ve a https://clerk.com
2. Crea una cuenta gratis
3. Crea una nueva aplicación
4. Selecciona los métodos de login que quieras (email, Google, GitHub, etc.)

### Obtener las keys

En el dashboard de Clerk:
1. Ve a "API Keys"
2. Copia las keys que necesitas

### Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Copia desde .env.local.example
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_key_aqui
CLERK_SECRET_KEY=sk_test_tu_key_aqui

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## 3. Ejecutar la app

```bash
npm run dev
```

Abre http://localhost:3000

## 4. Probar

1. Deberías ver la pantalla de login
2. Haz clic en "Iniciar Sesión"
3. Crea una cuenta o inicia sesión
4. ¡Listo! Ya puedes usar la app

## Notas

- Los errores de TypeScript son normales hasta que instales las dependencias
- Si no quieres usar autenticación, puedes volver a la versión anterior sin Clerk
- Las tareas se guardan en localStorage por usuario (usando el ID de Clerk)

## Problemas comunes

### Error: Cannot find module '@clerk/nextjs'
Solución: Ejecuta `npm install`

### Error: PowerShell execution policy
Solución: Ejecuta PowerShell como admin y corre:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### La app no carga
Solución: Verifica que las variables de entorno estén bien configuradas en `.env.local`
