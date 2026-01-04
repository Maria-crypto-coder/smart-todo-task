# Guía de Instalación

## Problema: PowerShell no permite ejecutar npm

Si ves este error:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

### Solución

#### Opción 1: Cambiar política de ejecución (Recomendado)

1. Abre PowerShell como **Administrador**
2. Ejecuta:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
3. Confirma con "Y"
4. Cierra y abre una nueva terminal normal
5. Ahora ejecuta:
```bash
npm install
```

#### Opción 2: Usar CMD en lugar de PowerShell

1. Abre CMD (Command Prompt) en lugar de PowerShell
2. Navega a tu proyecto:
```cmd
cd c:\Users\Urano\smart-todo-app
```
3. Ejecuta:
```cmd
npm install
```

#### Opción 3: Usar Git Bash

Si tienes Git instalado:
1. Abre Git Bash
2. Navega a tu proyecto
3. Ejecuta:
```bash
npm install
```

## Después de instalar

Una vez que `npm install` funcione, los errores de TypeScript desaparecerán porque las dependencias estarán instaladas.

## Pasos completos

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env.local (copia desde .env.local.example)
# Agrega tus keys de Clerk

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

## Verificar instalación

Después de `npm install`, verifica que se instalaron:

```bash
npm list @clerk/nextjs
npm list lucide-react
npm list framer-motion
```

Deberías ver las versiones instaladas.

## Si todo falla

Como última opción, puedes usar la versión anterior sin autenticación:

1. Revierte los cambios en `src/app/page.tsx` y `src/app/layout.tsx`
2. Elimina `middleware.ts`
3. No necesitarás instalar las nuevas dependencias

Pero te recomiendo resolver el problema de PowerShell para poder usar la versión mejorada con autenticación.

## Ayuda adicional

- [Documentación de Clerk](https://clerk.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Solución de problemas de PowerShell](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
