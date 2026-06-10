# 🚀 Guía de Deployment

Esta guía te ayudará a desplegar Smart Finance Tracker Pro en diferentes plataformas.

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de:

- ✅ Todas las dependencias están instaladas
- ✅ El proyecto compila sin errores
- ✅ Has probado la build de producción localmente
- ✅ Has configurado las variables de entorno necesarias

## 🏗️ Build de Producción

```bash
# Instalar dependencias
npm install

# Crear build optimizado
npm run build

# Preview local del build
npm run preview
```

El build generará una carpeta `dist/` con los archivos optimizados.

## 🌐 Plataformas de Deployment

### Vercel (Recomendado)

Vercel es ideal para aplicaciones React y ofrece deployment automático.

#### Deployment desde GitHub

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Agrega variables de entorno (si es necesario)
5. Haz clic en "Deploy"

#### Deployment con CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

**Vercel Configuration** (`vercel.json`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### Netlify

Netlify es otra excelente opción con CI/CD integrado.

#### Deployment desde GitHub

1. Crea una cuenta en [Netlify](https://www.netlify.com)
2. Click en "New site from Git"
3. Conecta tu repositorio
4. Configura:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Deploy

#### Deployment con CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar
netlify init

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

**Netlify Configuration** (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### GitHub Pages

Ideal para proyectos de portafolio públicos.

#### Configuración

1. Instala el paquete de deployment:

```bash
npm install --save-dev gh-pages
```

2. Agrega a `package.json`:

```json
{
  "homepage": "https://tu-usuario.github.io/smart-finance-tracker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Actualiza `vite.config.js`:

```javascript
export default defineConfig({
  base: '/smart-finance-tracker/',
  // ... resto de configuración
});
```

4. Deploy:

```bash
npm run deploy
```

---

### Firebase Hosting

Google Firebase ofrece hosting gratuito con SSL.

#### Setup

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Configurar:
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds: No
```

#### Deploy

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

**Firebase Configuration** (`firebase.json`):

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### Render

Render ofrece deployment gratuito con builds automáticas.

1. Crea una cuenta en [Render](https://render.com)
2. Click en "New Static Site"
3. Conecta tu repositorio
4. Configura:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Deploy

---

### AWS S3 + CloudFront

Para deployment empresarial con CDN global.

#### Prerrequisitos

- Cuenta de AWS
- AWS CLI configurado

#### Pasos

```bash
# Build
npm run build

# Crear bucket S3
aws s3 mb s3://smart-finance-tracker

# Configurar para hosting estático
aws s3 website s3://smart-finance-tracker \
  --index-document index.html \
  --error-document index.html

# Subir archivos
aws s3 sync dist/ s3://smart-finance-tracker

# Configurar política pública
aws s3api put-bucket-policy \
  --bucket smart-finance-tracker \
  --policy file://bucket-policy.json
```

**Bucket Policy** (`bucket-policy.json`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::smart-finance-tracker/*"
    }
  ]
}
```

---

## 🔧 Variables de Entorno

### En Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable

### En Netlify

1. Site settings → Build & deploy → Environment
2. Click "Edit variables"
3. Agrega cada variable

### En GitHub Pages

Las variables deben ser públicas (prefix `VITE_PUBLIC_`)

---

## 🔒 Seguridad

### Headers de Seguridad

Para Netlify (`netlify.toml`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
```

Para Vercel (`vercel.json`):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📊 Optimizaciones

### 1. Lazy Loading

Ya implementado con React.lazy() para rutas

### 2. Code Splitting

Vite lo hace automáticamente

### 3. Compresión

La mayoría de plataformas comprimen automáticamente (gzip/brotli)

### 4. CDN

Vercel, Netlify y Firebase usan CDN por defecto

---

## 🔍 Verificación Post-Deployment

Después de desplegar, verifica:

- [ ] La aplicación carga correctamente
- [ ] Todas las rutas funcionan (no 404)
- [ ] Los estilos se aplican correctamente
- [ ] Las imágenes cargan
- [ ] Los gráficos se renderizan
- [ ] El tema dark/light funciona
- [ ] Responsive en diferentes dispositivos
- [ ] Lighthouse score > 90

---

## 🐛 Troubleshooting

### Rutas devuelven 404

**Solución**: Configura redirects para SPA en tu plataforma

### Estilos no se aplican

**Solución**: Verifica la configuración de `base` en `vite.config.js`

### Variables de entorno no funcionan

**Solución**: 
- Deben tener prefijo `VITE_`
- Reinicia el servidor después de cambiarlas
- En producción, configúralas en tu plataforma

### Build falla

**Solución**:
- Verifica versión de Node (>= 18)
- Limpia cache: `rm -rf node_modules && npm install`
- Verifica errores de TypeScript/ESLint

---

## 📚 Recursos Adicionales

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

¡Tu aplicación está lista para el mundo! 🎉
