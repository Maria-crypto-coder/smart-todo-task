# Guía de Despliegue en Railway

## Opción 1: Desplegar desde GitHub (Recomendado)

### Paso 1: Instalar Git (si no lo tienes)

1. Descarga Git desde: https://git-scm.com/download/win
2. Instala con las opciones por defecto
3. Reinicia VSCode o la terminal

### Paso 2: Inicializar Repositorio Git

```bash
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Smart TODO App"
```

### Paso 3: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `smart-todo-app`
3. Descripción: "Smart TODO App with Next.js, Clerk, and TypeScript"
4. Selecciona **Public** o **Private**
5. **NO** marques "Initialize with README" (ya tienes uno)
6. Click en "Create repository"

### Paso 4: Conectar con GitHub

```bash
# Agregar remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/smart-todo-app.git

# Cambiar a rama main
git branch -M main

# Push al repositorio
git push -u origin main
```

### Paso 5: Desplegar en Railway

1. Ve a https://railway.app
2. Click en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway a acceder a GitHub
5. Selecciona el repositorio `smart-todo-app`
6. Railway detectará automáticamente que es Next.js

### Paso 6: Configurar Variables de Entorno en Railway

1. En el dashboard de Railway, ve a tu proyecto
2. Click en "Variables"
3. Agrega las siguientes variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLW1vcmF5LTY3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=tu_secret_key_aqui
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. Click en "Add" para cada variable
5. Railway automáticamente redesplegará

### Paso 7: Configurar Dominio en Clerk

1. Ve a https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a "Domains"
4. Agrega el dominio de Railway (ej: `tu-app.up.railway.app`)
5. Guarda los cambios

### Paso 8: Verificar Despliegue

1. Railway te dará una URL (ej: `https://smart-todo-app-production.up.railway.app`)
2. Abre la URL en tu navegador
3. Verifica que la app funcione correctamente
4. Prueba el login/registro

---

## Opción 2: Desplegar sin Git (Railway CLI)

### Paso 1: Instalar Railway CLI

```bash
# Windows (PowerShell como administrador)
iwr https://railway.app/install.ps1 | iex

# O con npm
npm i -g @railway/cli
```

### Paso 2: Login en Railway

```bash
railway login
```

### Paso 3: Inicializar Proyecto

```bash
# En la carpeta del proyecto
railway init
```

### Paso 4: Agregar Variables de Entorno

```bash
railway variables set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLW1vcmF5LTY3LmNsZXJrLmFjY291bnRzLmRldiQ
railway variables set CLERK_SECRET_KEY=tu_secret_key_aqui
railway variables set NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
railway variables set NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
railway variables set NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
railway variables set NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Paso 5: Desplegar

```bash
railway up
```

---

## Opción 3: Usar GitHub Desktop (Más Fácil)

### Paso 1: Instalar GitHub Desktop

1. Descarga desde: https://desktop.github.com
2. Instala y abre GitHub Desktop
3. Inicia sesión con tu cuenta de GitHub

### Paso 2: Agregar Repositorio

1. En GitHub Desktop: File → Add Local Repository
2. Selecciona la carpeta `smart-todo-app`
3. Si dice "not a git repository", click en "Create a repository"
4. Nombre: `smart-todo-app`
5. Click en "Create Repository"

### Paso 3: Hacer Commit

1. Verás todos los archivos en "Changes"
2. En "Summary", escribe: "Initial commit"
3. Click en "Commit to main"

### Paso 4: Publicar en GitHub

1. Click en "Publish repository"
2. Nombre: `smart-todo-app`
3. Descripción: "Smart TODO App with Next.js and Clerk"
4. Desmarca "Keep this code private" si quieres que sea público
5. Click en "Publish repository"

### Paso 5: Continuar con Railway

Ahora sigue desde el **Paso 5** de la Opción 1 (Desplegar en Railway)

---

## Configuración de Railway (railway.json)

Railway detecta automáticamente Next.js, pero puedes crear un archivo de configuración:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## Problemas Comunes

### 1. Build falla en Railway

**Causa:** Variables de entorno no configuradas

**Solución:**
- Verifica que agregaste todas las variables en Railway
- Asegúrate de que las keys de Clerk sean correctas
- Redespliega manualmente

### 2. Error de autenticación

**Causa:** Dominio no configurado en Clerk

**Solución:**
- Ve a Clerk Dashboard → Domains
- Agrega el dominio de Railway
- Espera unos minutos para que se propague

### 3. App no carga

**Causa:** Puerto incorrecto

**Solución:**
Railway usa la variable `PORT` automáticamente. Next.js la detecta por defecto.

### 4. "Module not found"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
# Asegúrate de que package-lock.json esté en el repo
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

---

## Verificación Post-Despliegue

### Checklist:

- [ ] La app carga correctamente
- [ ] El login/registro funciona
- [ ] Las tareas se pueden agregar
- [ ] Las tareas se pueden editar
- [ ] Las tareas se pueden eliminar
- [ ] Los filtros funcionan
- [ ] El contador de tareas es correcto
- [ ] El dark mode funciona
- [ ] La app es responsive

---

## Comandos Útiles de Railway

```bash
# Ver logs en tiempo real
railway logs

# Ver variables de entorno
railway variables

# Abrir dashboard
railway open

# Ver status del proyecto
railway status

# Redeploy
railway up --detach
```

---

## Actualizar la App Después del Despliegue

### Con Git:

```bash
# Hacer cambios en el código
# ...

# Agregar cambios
git add .

# Commit
git commit -m "Descripción de los cambios"

# Push a GitHub
git push

# Railway detectará el push y redesplegará automáticamente
```

### Con GitHub Desktop:

1. Haz cambios en el código
2. GitHub Desktop mostrará los cambios
3. Escribe un mensaje de commit
4. Click en "Commit to main"
5. Click en "Push origin"
6. Railway redesplegará automáticamente

---

## Monitoreo

Railway proporciona:
- **Logs en tiempo real**
- **Métricas de uso** (CPU, RAM, Network)
- **Historial de despliegues**
- **Rollback** a versiones anteriores

Accede desde el dashboard de Railway.

---

## Costos

Railway ofrece:
- **$5 de crédito gratis** al mes
- **500 horas de ejecución** gratis
- Después: ~$0.000463 por GB-hora

Para esta app, el plan gratuito es suficiente para empezar.

---

## Alternativas a Railway

Si prefieres otras opciones:

1. **Vercel** (Recomendado para Next.js)
   - Más fácil
   - Mejor integración con Next.js
   - Plan gratuito generoso

2. **Netlify**
   - Similar a Vercel
   - Buen plan gratuito

3. **Render**
   - Similar a Railway
   - Plan gratuito disponible

4. **DigitalOcean App Platform**
   - Más control
   - Desde $5/mes

---

## Soporte

Si tienes problemas:
1. Revisa los logs en Railway
2. Verifica las variables de entorno
3. Consulta la documentación de Railway: https://docs.railway.app
4. Únete al Discord de Railway: https://discord.gg/railway
