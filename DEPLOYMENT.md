# Cómo desplegar

Si quieres poner esto en internet, aquí hay algunas opciones.

## Vercel (lo más fácil)

1. Ve a vercel.com
2. Conecta tu GitHub
3. Importa el repo
4. Dale a Deploy
5. Listo

O con la terminal:
```bash
npm i -g vercel
vercel
```

## Netlify

Similar a Vercel:
1. netlify.com
2. "Add new site"
3. Conecta el repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy

## Otras opciones

- Railway
- Render
- DigitalOcean

Todas funcionan parecido - conectas el repo y ellos se encargan del resto.

## Antes de desplegar

Asegúrate que funciona:
```bash
npm run build
npm start
```

Si compila sin errores, estás listo.

## Notas

- No necesitas variables de entorno por ahora
- Todo se guarda en localStorage del navegador
- Si agregas backend después, ahí sí necesitarás configurar más cosas
