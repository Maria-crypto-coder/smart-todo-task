# 🚂 Deployment en Railway - Guía Actualizada

## ✅ Prerequisitos

Antes de hacer deploy, asegúrate de tener:
- ✅ Código funcionando localmente
- ✅ Cuenta en Railway (https://railway.app)
- ✅ Proyecto de Supabase configurado
- ✅ Cuenta de Clerk configurada

---

## 📋 Paso 1: Preparar Variables de Entorno

Necesitas tener a mano estas 4 variables:

### Clerk (ya las tienes en tu .env.local)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Supabase (de tu proyecto en Supabase)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Dónde encontrar las keys de Supabase:**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🚀 Paso 2: Configurar Railway

### Opción A: Nuevo Proyecto

1. **Ve a Railway:** https://railway.app
2. **Click en "New Project"**
3. **Selecciona "Deploy from GitHub repo"**
4. **Conecta tu repositorio:** `Maria-crypto-coder/smart-todo-task`
5. **Railway detectará automáticamente que es Next.js**

### Opción B: Proyecto Existente

1. **Ve a tu proyecto en Railway**
2. **Click en el servicio**
3. **Ve a "Settings"**

---

## 🔧 Paso 3: Agregar Variables de Entorno

1. **En tu proyecto de Railway, ve a "Variables"**
2. **Click en "New Variable"** o "Raw Editor"
3. **Agrega estas 4 variables:**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_key_aqui
CLERK_SECRET_KEY=sk_test_tu_secret_aqui
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANTE:**
- Reemplaza los valores con tus keys reales
- NO incluyas comillas
- NO incluyas espacios extra
- Asegúrate de que cada variable esté en una línea separada

---

## 🔄 Paso 4: Redeploy

Después de agregar las variables:

1. **Railway hará redeploy automáticamente**, O
2. **Manualmente:** Click en "Deploy" → "Redeploy"

---

## ✅ Paso 5: Verificar el Deploy

1. **Espera a que termine el build** (2-3 minutos)
2. **Railway te dará una URL:** `https://tu-app.up.railway.app`
3. **Abre la URL en tu navegador**
4. **Inicia sesión con Clerk**
5. **Prueba crear una tarea**

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

**Causa:** Las variables no están configuradas correctamente

**Solución:**
1. Ve a Railway → Variables
2. Verifica que las 4 variables estén presentes
3. Verifica que no haya espacios extra
4. Verifica que los valores sean correctos
5. Redeploy

### Error: "Build failed"

**Causa:** Puede ser por varias razones

**Solución:**
1. Ve a Railway → Deployments → Click en el deployment fallido
2. Lee los logs para ver el error específico
3. Si dice "Missing environment variables", agrega las variables
4. Si dice otro error, compártelo para ayudarte

### Error: "Application error" en la URL

**Causa:** El servidor no puede iniciar

**Solución:**
1. Ve a Railway → Deployments → Logs
2. Busca errores en los logs
3. Verifica que las variables de Clerk estén correctas
4. Verifica que las variables de Supabase estén correctas

---

## 🔐 Configurar Clerk para Producción

Después de que funcione el deploy:

1. **Ve a Clerk Dashboard:** https://dashboard.clerk.com
2. **Selecciona tu aplicación**
3. **Ve a "Domains"**
4. **Agrega tu dominio de Railway:**
   ```
   https://tu-app.up.railway.app
   ```
5. **Guarda los cambios**

---

## 📝 Checklist Final

Antes de considerar el deploy completo:

- [ ] Variables de entorno agregadas en Railway
- [ ] Build exitoso (sin errores)
- [ ] URL de Railway funciona
- [ ] Puedes iniciar sesión con Clerk
- [ ] Puedes crear tareas
- [ ] Puedes editar tareas
- [ ] Puedes eliminar tareas
- [ ] Las tareas persisten al recargar
- [ ] Dominio agregado en Clerk

---

## 🎉 ¡Listo!

Tu aplicación ahora está en producción en Railway con:
- ✅ Backend con Supabase
- ✅ Autenticación con Clerk
- ✅ Sincronización entre dispositivos
- ✅ Persistencia de datos

**URL de tu app:** https://tu-app.up.railway.app

---

## 💡 Próximos Pasos

1. **Dominio personalizado** (opcional)
   - Compra un dominio
   - Configúralo en Railway
   - Actualiza Clerk con el nuevo dominio

2. **Monitoreo**
   - Railway tiene logs integrados
   - Puedes ver errores en tiempo real

3. **Actualizaciones**
   - Cada push a `main` en GitHub hará redeploy automático
   - O puedes hacer deploy manual desde Railway

---

## 🆘 Ayuda

Si tienes problemas:
1. Revisa los logs en Railway
2. Verifica las variables de entorno
3. Asegúrate de que funciona localmente primero
4. Comparte el error específico para ayuda
