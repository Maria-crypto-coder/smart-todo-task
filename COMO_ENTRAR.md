# 🌐 Cómo Entrar a tu App en Railway

## Paso 1: Obtener la URL

### Opción A: Desde el Dashboard de Railway

1. Ve a: https://railway.app/dashboard
2. Click en tu proyecto **"smart-todo-task"**
3. Verás el proyecto desplegado
4. Click en **"Settings"** (⚙️ en el menú lateral)
5. Scroll hasta la sección **"Domains"**
6. Verás una URL como:
   ```
   smart-todo-task-production.up.railway.app
   ```
   o
   ```
   tu-proyecto.railway.app
   ```
7. **Click en esa URL** para abrir tu app

### Opción B: Generar un Dominio (si no aparece)

Si no ves ninguna URL:

1. En Railway, ve a tu proyecto
2. Click en **"Settings"**
3. Busca **"Domains"**
4. Click en **"Generate Domain"**
5. Railway creará automáticamente una URL
6. Espera 30 segundos
7. Click en la URL generada

---

## Paso 2: Configurar Clerk (MUY IMPORTANTE)

⚠️ **Si no haces esto, el login NO funcionará**

1. Copia la URL de Railway (ejemplo: `smart-todo-task-production.up.railway.app`)

2. Ve a Clerk Dashboard: https://dashboard.clerk.com

3. Selecciona tu aplicación

4. Ve a **"Domains"** en el menú lateral

5. Click en **"Add domain"**

6. Pega tu URL de Railway (SIN `https://`, solo el dominio):
   ```
   smart-todo-task-production.up.railway.app
   ```

7. Click en **"Add domain"**

8. Espera 1-2 minutos para que se propague

---

## Paso 3: Verificar Variables de Entorno

En Railway, verifica que tengas TODAS estas variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Si falta alguna:
1. Ve a Railway → tu proyecto → **"Variables"**
2. Click en **"New Variable"**
3. Agrega las que falten
4. Railway redesplegará automáticamente

---

## Paso 4: Abrir tu App

1. Abre la URL de Railway en tu navegador
2. Deberías ver la pantalla de bienvenida
3. Click en **"Sign In"** o **"Sign Up"**
4. Crea una cuenta o inicia sesión
5. ¡Empieza a usar tu TODO app!

---

## 🎉 Tu App Está Lista

**URL de tu app:** [Copia la URL de Railway aquí]

**Funcionalidades disponibles:**
- ✅ Agregar tareas
- ✅ Marcar como completadas
- ✅ Editar tareas (click en el texto)
- ✅ Eliminar tareas
- ✅ Filtrar (Todas/Activas/Completadas)
- ✅ Contador de tareas pendientes
- ✅ Persistencia en localStorage
- ✅ Autenticación con Clerk
- ✅ Dark mode automático
- ✅ Responsive design

---

## Problemas Comunes

### 1. "Application error" o página en blanco

**Causa:** Variables de entorno no configuradas

**Solución:**
1. Ve a Railway → Variables
2. Verifica que TODAS las variables de Clerk estén ahí
3. Si faltan, agrégalas
4. Espera 2-3 minutos para el redespliegue

### 2. Error de autenticación / "Invalid publishable key"

**Causa:** Dominio no configurado en Clerk

**Solución:**
1. Ve a Clerk Dashboard → Domains
2. Agrega el dominio de Railway
3. Espera 1-2 minutos
4. Recarga la página

### 3. "This site can't be reached"

**Causa:** El despliegue aún está en progreso

**Solución:**
- Espera 2-5 minutos más
- Verifica en Railway que el status sea "Active"
- Recarga la página

### 4. La app carga pero no puedo hacer login

**Causa:** Dominio no agregado en Clerk

**Solución:**
1. Clerk Dashboard → Domains
2. Agrega: `tu-app.up.railway.app`
3. Guarda y espera 1 minuto
4. Intenta de nuevo

---

## Ver Logs (si algo falla)

1. Ve a Railway Dashboard
2. Click en tu proyecto
3. Click en **"Deployments"**
4. Click en el deployment activo (el primero)
5. Verás los logs en tiempo real
6. Busca errores en rojo

---

## Compartir tu App

Una vez que funcione, puedes compartir la URL con cualquiera:

```
https://tu-app.up.railway.app
```

Cada persona necesitará:
1. Crear su propia cuenta (Sign Up)
2. Sus tareas serán privadas y separadas

---

## Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio (ejemplo: `todo.tudominio.com`):

1. En Railway → Settings → Domains
2. Click en **"Custom Domain"**
3. Ingresa tu dominio
4. Sigue las instrucciones para configurar DNS
5. También agrégalo en Clerk Dashboard

---

## Actualizar la App

Cuando hagas cambios en el código:

```bash
# 1. Hacer cambios
# 2. Commit
git add .
git commit -m "Descripción del cambio"

# 3. Push
git push

# 4. Railway detecta el push y redespliega automáticamente
```

---

## Costos

Railway te da:
- **$5 USD gratis** al mes
- **500 horas de ejecución**
- Suficiente para esta app

Si se acaba el crédito:
- La app se pausará
- Puedes agregar una tarjeta para continuar
- O esperar al siguiente mes

---

## Alternativa: Vercel (Gratis Ilimitado)

Si prefieres Vercel (más fácil y gratis):

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desplegar
vercel

# 3. Seguir instrucciones
# 4. Agregar variables en dashboard.vercel.com
```

Vercel es mejor para Next.js y es completamente gratis.

---

## Soporte

- **Railway:** https://railway.app/help
- **Clerk:** https://clerk.com/support
- **Next.js:** https://nextjs.org/docs

---

## ¿Necesitas Ayuda?

Si tienes problemas:
1. Copia el error exacto
2. Revisa los logs en Railway
3. Verifica las variables de entorno
4. Asegúrate de que el dominio esté en Clerk
