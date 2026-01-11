# Configuración Rápida de Git

## ✅ Ya descargaste Git - Ahora sigue estos pasos:

### Paso 1: Reiniciar VSCode
**IMPORTANTE:** Después de instalar Git, DEBES reiniciar VSCode.

**Opción A - Recarga Rápida:**
1. Presiona `Ctrl + Shift + P`
2. Escribe: `Reload Window`
3. Presiona Enter

**Opción B - Reinicio Completo:**
1. Cierra VSCode completamente
2. Vuelve a abrir VSCode
3. Abre la carpeta del proyecto

### Paso 2: Verificar Git
Después de reiniciar, abre una nueva terminal y ejecuta:
```bash
git --version
```

Deberías ver algo como: `git version 2.43.0.windows.1`

---

## Si Git aún no funciona después de reiniciar:

### Solución 1: Verificar la instalación
1. Abre el Explorador de Windows
2. Ve a: `C:\Program Files\Git\bin`
3. Verifica que existe el archivo `git.exe`

### Solución 2: Agregar Git al PATH manualmente
1. Presiona `Windows + R`
2. Escribe: `sysdm.cpl` y presiona Enter
3. Ve a la pestaña "Opciones avanzadas"
4. Click en "Variables de entorno"
5. En "Variables del sistema", busca "Path"
6. Click en "Editar"
7. Click en "Nuevo"
8. Agrega: `C:\Program Files\Git\bin`
9. Click en "Aceptar" en todas las ventanas
10. **Reinicia VSCode completamente**

### Solución 3: Usar Git Bash (Alternativa)
Si PowerShell no reconoce Git, usa Git Bash:
1. En VSCode, abre una nueva terminal
2. Click en la flecha hacia abajo junto al "+"
3. Selecciona "Git Bash"
4. Ahora Git funcionará en esta terminal

---

## Una vez que Git funcione:

### Paso 1: Configurar Git (Primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 2: Inicializar Repositorio
```bash
# Inicializar Git en el proyecto
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - Smart TODO App"
```

### Paso 3: Crear Repositorio en GitHub
1. Ve a: https://github.com/new
2. Nombre: `smart-todo-app`
3. Descripción: "Smart TODO App with Next.js, Clerk, and TypeScript"
4. Selecciona Public o Private
5. **NO marques** "Initialize with README"
6. Click en "Create repository"

### Paso 4: Conectar con GitHub
```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/smart-todo-app.git

# Cambiar a rama main
git branch -M main

# Push al repositorio
git push -u origin main
```

Si te pide autenticación:
- Usuario: tu usuario de GitHub
- Contraseña: usa un **Personal Access Token** (no tu contraseña)
  - Genera uno en: https://github.com/settings/tokens
  - Permisos necesarios: `repo`

### Paso 5: Desplegar en Railway
1. Ve a: https://railway.app
2. Click en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway
5. Selecciona `smart-todo-app`
6. Agrega las variables de entorno:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLW1vcmF5LTY3LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=tu_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```
7. Railway desplegará automáticamente

---

## Alternativa: GitHub Desktop (Más Fácil)

Si Git sigue sin funcionar en la terminal, usa GitHub Desktop:

1. **Descarga GitHub Desktop:** https://desktop.github.com
2. **Instala y abre**
3. **Inicia sesión** con tu cuenta de GitHub
4. **File → Add Local Repository**
5. Selecciona la carpeta `smart-todo-app`
