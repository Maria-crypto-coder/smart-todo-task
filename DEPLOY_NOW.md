v# 🚀 Desplegar en Railway - Guía Rápida

## ✅ Código Subido a GitHub

Tu código ya está en: https://github.com/Maria-crypto-coder/smart-todo-task

---

## Paso 1: Ir a Railway

1. Abre: https://railway.app
2. Click en **"Login"** o **"Start a New Project"**
3. Inicia sesión con GitHub

---

## Paso 2: Crear Nuevo Proyecto

1. Click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Si es la primera vez, autoriza Railway a acceder a GitHub
4. Busca y selecciona: **`Maria-crypto-coder/smart-todo-task`**
5. Railway detectará automáticamente que es Next.js

---

## Paso 3: Configurar Variables de Entorno

⚠️ **IMPORTANTE:** Railway necesita las variables de Clerk para hacer el build.

1. En el dashboard de Railway, click en tu proyecto
2. Click en la pestaña **"Variables"**
3. Agrega estas variables una por una:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLW1vcmF5LTY3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=tu_secret_key_completa_aqui
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. Para cada variable:
   - Click en **"New Variable"**
   - Escribe el nombre (ej: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
   - Escribe el valor (tu key de Clerk)
   - Click en **"Add"**

5. Repite para todas las variables

---

## Paso 4: Obtener tus Keys de Clerk

Si no tienes las keys:

1. Ve a: https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a **"API Keys"** en el menú lateral
4. Copia:
   - **Publishable key** (empieza con `pk_test_...`)
   - **Secret key** (empieza con `sk_test_...`)
5. Pégalas en Railway

---

## Paso 5: Desplegar

1. Después de agregar las variables, Railway automáticamente:
   - Detecta los cambios
   - Inicia el build
   - Despliega la aplicación

2. Espera 2-5 minutos mientras se despliega

3. Verás el progreso en tiempo real:
   - ⏳ Building...
   - ⏳ Deploying...
   - ✅ Deployed!

---

## Paso 6: Obtener la URL

1. Una vez desplegado, Railway te dará una URL
2. Click en **"Settings"** → **"Domains"**
3. Verás algo como: `smart-todo-task-production.up.railway.app`
4. Click en la URL para abrir tu app

---

## Paso 7: Configurar Dominio en Clerk

⚠️ **MUY IMPORTANTE:** Debes agregar el dominio de Railway en Clerk.

1. Ve a: https://dashboard.clerk.com
2. Selecciona tu aplicación
3. Ve a **"Domains"**
4. Click en **"Add domain"**
5. Agrega: `tu-app.up.railway.app` (tu dominio de Railway)
6. Guarda los cambios

---

## Paso 8: Verificar

1. Abre la URL de Railway
2. Verifica que la app cargue
3. Prueba el login/registro
4. Agrega una tarea
5. Verifica que todo funcione

---

## 🎉 ¡Listo!

Tu Smart TODO App está en producción en:
- **GitHub:** https://github.com/Maria-crypto-coder/smart-todo-task
- **Railway:** [Tu URL de Railway]

---

## Actualizar la App

Cada vez que hagas cambios:

```bash
# 1. Hacer cambios en el código
# 2. Agregar y commit
git add .
git commit -m "Descripción de los cambios"

# 3. Push a GitHub
git push

# 4. Railway detecta el push y redespliega automáticamente
```

---

## Problemas Comunes

### Build falla en Railway

**Causa:** Variables de entorno no configuradas

**Solución:**
1. Ve a Railway → Variables
2. Verifica que todas las variables estén correctas
3. Redespliega manualmente: Settings → Redeploy

### Error de autenticación

**Causa:** Dominio no configurado en Clerk

**Solución:**
1. Ve a Clerk Dashboard → Domains
2. Agrega el dominio de Railway
3. Espera 1-2 minutos
4. Recarga la app

### App no carga

**Causa:** Build aún en progreso

**Solución:**
- Espera a que termine el build (2-5 minutos)
- Revisa los logs en Railway

---

## Ver Logs en Railway

1. En Railway, click en tu proyecto
2. Ve a la pestaña **"Deployments"**
3. Click en el deployment activo
4. Verás los logs en tiempo real

---

## Costos

Railway ofrece:
- **$5 de crédito gratis** al mes
- **500 horas de ejecución** gratis
- Suficiente para esta app

---

## Alternativa: Vercel (Más Fácil)

Si prefieres Vercel:

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desplegar
vercel

# 3. Seguir las instrucciones
# 4. Agregar variables en Vercel dashboard
```

Vercel es más fácil y tiene mejor integración con Next.js.

---

## Soporte

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Clerk Docs:** https://clerk.com/docs
