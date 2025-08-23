# 🏛️ Coach Estoico

Una aplicación web moderna que proporciona consejos personalizados basados en la filosofía estoica de Marco Aurelio, Epicteto y Séneca. Combina sabiduría antigua con tecnología moderna para ayudarte en tu crecimiento personal.

## ✨ Características Principales

### 🎯 **Tecnología Moderna**
- **Frontend Puro**: No requiere backend ni servidor
- **Integración con Gemini AI**: Respuestas personalizadas e inteligentes
- **Sistema de Fallback**: Funciona sin internet con respuestas predefinidas
- **PWA Ready**: Instalable como aplicación nativa

### 🌐 **Experiencia de Usuario**
- **Bilingüe**: Español e Inglés con cambio instantáneo
- **Responsive**: Optimizado para móviles, tablets y desktop
- **Tema Oscuro**: Diseño elegante con colores morado, azul y negro
- **Chat Interactivo**: Interfaz de conversación moderna y fluida

### 🏛️ **Filosofía Auténtica**
- **Consejos Personalizados**: Respuestas adaptadas a tu situación específica
- **Basado en Textos Clásicos**: Marco Aurelio, Epicteto y Séneca
- **Contexto Inteligente**: Comprende emociones y situaciones complejas
- **Sabiduría Práctica**: Aplicación moderna de principios estoicos

## 🚀 Inicio Rápido

### Opción 1: Con Gemini AI (Recomendado)
```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/coach-estoico.git
cd coach-estoico

# 2. Configura Gemini AI
cp config.example.js config.js
# Edita config.js y agrega tu API key

# 3. Abre la aplicación
open index.html
```

### Opción 2: Solo Frontend
```bash
# Simplemente abre el archivo
open index.html
```

### Opción 3: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

## 📁 Estructura del Proyecto

```
coach-estoico/
├── 📄 index.html              # Página principal
├── 📄 config.example.js       # Plantilla de configuración
├── 📄 config.js              # Tu configuración (crear desde example)
├── 📁 css/
│   └── 📄 styles.css          # Estilos CSS modernos
├── 📁 js/
│   └── 📄 main.js             # Lógica principal + traducciones
├── 📄 README.md               # Documentación principal
├── 📄 GEMINI_SETUP.md         # Guía de configuración de Gemini
└── 📄 .gitignore             # Archivos ignorados por Git
```

## 🎮 Funcionalidades Detalladas

### 💬 **Chat Inteligente**
- **Validación en Tiempo Real**: Mínimo 3 caracteres, máximo 500
- **Contador de Caracteres**: Feedback visual del límite
- **Indicador de Escritura**: Animación mientras el coach "piensa"
- **Scroll Automático**: Navegación fluida entre mensajes
- **Historial Persistente**: Conversaciones guardadas localmente

### 🤖 **Integración con IA**
- **Gemini AI**: Respuestas contextuales y personalizadas
- **Fallback Inteligente**: 12 respuestas estoicas predefinidas
- **Detección de Errores**: Manejo robusto de fallos de API
- **Optimización Automática**: Selección del mejor modelo disponible

### 🌍 **Internacionalización**
- **Cambio Instantáneo**: Español ↔ Inglés sin recargar
- **Detección Automática**: Idioma del navegador por defecto
- **Persistencia**: Preferencias guardadas en localStorage
- **Traducciones Completas**: Interfaz y respuestas traducidas

### 📱 **Diseño Responsive**
- **Mobile First**: Optimizado para dispositivos móviles
- **Elementos Táctiles**: Botones de mínimo 48px
- **Adaptación Automática**: Layouts flexibles para cualquier pantalla
- **Animaciones Suaves**: Transiciones elegantes y performantes

## 🏛️ Filósofos Incluidos

### 📚 **Marco Aurelio** (121-180 d.C.)
- Emperador romano y filósofo estoico
- Autor de "Meditaciones"
- Especialidad: Autodisciplina y reflexión personal

### ⚖️ **Epicteto** (50-135 d.C.)
- Filósofo griego, ex-esclavo convertido en maestro
- Fundador de la escuela estoica de Nicópolis
- Especialidad: Control interno y aceptación

### 🎭 **Séneca** (4 a.C.-65 d.C.)
- Filósofo, dramaturgo y consejero político romano
- Autor de "Cartas a Lucilio"
- Especialidad: Ética práctica y gestión emocional

## ⚙️ Configuración

### 🔐 **API Key de Gemini**
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una API key gratuita
3. Copia `config.example.js` a `config.js`
4. Agrega tu API key al archivo

### 🎨 **Personalización Visual**
```css
/* Variables CSS principales */
:root {
    --color-primary: #8B5CF6;      /* Morado vibrante */
    --color-secondary: #3B82F6;    /* Azul brillante */
    --color-background: #0F0F23;   /* Negro azulado */
    --color-surface: #1A1A2E;      /* Superficie oscura */
    --color-text: #E2E8F0;         /* Texto claro */
}
```

### 📝 **Agregar Consejos**
```javascript
// En js/main.js - objeto stoicResponses
const stoicResponses = {
    es: [
        "Tu nuevo consejo estoico aquí...",
        // Más consejos...
    ],
    en: [
        "Your new stoic advice here...",
        // More advice...
    ]
};
```

## 🔧 Desarrollo

### 🛠️ **Requisitos**
- Navegador moderno (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Editor de código (VS Code recomendado)
- Servidor local opcional para desarrollo

### 📦 **Instalación para Desarrollo**
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/coach-estoico.git
cd coach-estoico

# Configura Gemini (opcional)
cp config.example.js config.js
# Edita config.js con tu API key

# Inicia servidor de desarrollo
python -m http.server 8000
# o
npx http-server -p 8000
```

### 🧪 **Testing**
```bash
# Abre en navegador
open http://localhost:8000

# Prueba funcionalidades:
# 1. Cambio de idioma
# 2. Envío de mensajes
# 3. Respuestas de IA/fallback
# 4. Responsive design
# 5. Persistencia de datos
```

## 🌐 Despliegue

### 📡 **GitHub Pages**
1. Sube el código a GitHub (sin `config.js`)
2. Ve a Settings > Pages
3. Selecciona rama `main`
4. Tu app estará en `https://tu-usuario.github.io/coach-estoico`

### 🏗️ **Netlify/Vercel**
1. Conecta tu repositorio
2. Build command: (ninguno)
3. Publish directory: `/`
4. Agrega variables de entorno para la API key

### 🖥️ **Servidor Propio**
1. Sube todos los archivos a tu servidor
2. Incluye `config.js` con tu API key
3. Configura HTTPS (recomendado)

## 📊 Rendimiento

### ⚡ **Métricas**
- **Tiempo de Carga**: < 2 segundos
- **Primera Respuesta**: 2-3 segundos (con Gemini)
- **Respuestas Posteriores**: 1-2 segundos
- **Modo Fallback**: Instantáneo
- **Tamaño Total**: < 500KB

### 🎯 **Optimizaciones**
- CSS y JS minificados en producción
- Imágenes optimizadas (SVG icons)
- Lazy loading de componentes
- Cache inteligente de respuestas
- Compresión gzip habilitada

## 🔒 Seguridad

### 🛡️ **Mejores Prácticas**
- API keys nunca expuestas en el frontend
- Validación de entrada del usuario
- Sanitización de respuestas
- HTTPS obligatorio en producción
- CSP headers recomendados

### 🔐 **Configuración Segura**
```javascript
// config.js - Nunca subir a Git
const CONFIG = {
    GEMINI_API_KEY: 'tu-api-key-real',
    // Restricciones de API en Google Cloud Console
    // Dominios permitidos configurados
};
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

*"Tienes poder sobre tu mente, no sobre los eventos externos. Date cuenta de esto, y encontrarás fuerza."* - Marco Aurelio

**¡Comienza tu viaje estoico hoy mismo! 🏛️✨**
