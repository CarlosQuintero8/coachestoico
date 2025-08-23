# 🤖 Configuración de Gemini AI - Coach Estoico

## 📋 Descripción
Esta guía te ayudará a configurar la integración con Google Gemini AI para obtener respuestas personalizadas de filosofía estoica. La aplicación funciona tanto con como sin API key.

## � Inifcio Rápido

### Opción 1: Con Gemini AI (Recomendado)
1. **Obtén tu API Key gratuita**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Copia el archivo de configuración**:
   ```bash
   cp config.example.js config.js
   ```
3. **Edita `config.js`** y reemplaza `TU_API_KEY_AQUI` con tu API key real
4. **Abre `index.html`** en tu navegador

### Opción 2: Solo con respuestas predefinidas
1. **Abre `index.html`** directamente en tu navegador
2. La aplicación funcionará con respuestas estoicas predefinidas

## 📁 Estructura del Proyecto

```
coach-estoico/
├── index.html              # Página principal
├── config.example.js       # Plantilla de configuración
├── config.js              # Tu configuración (crear desde example)
├── css/
│   └── styles.css         # Estilos de la aplicación
├── js/
│   └── main.js           # Lógica principal
├── README.md             # Documentación del proyecto
├── GEMINI_SETUP.md       # Esta guía
└── .gitignore           # Archivos ignorados por Git
```

## ⚙️ Configuración Detallada

### 1. Crear archivo de configuración

```bash
cp config.example.js config.js
```

### 2. Configurar tu API Key

Edita `config.js`:

```javascript
const CONFIG = {
    // Tu API key de Google AI Studio
    GEMINI_API_KEY: 'tu-api-key-real-aqui',
    
    // Configuración del modelo (opcional)
    GEMINI_MODEL: 'gemini-pro',
    MAX_TOKENS: 1024,
    TEMPERATURE: 0.7,
    
    // Sistema de respaldo
    USE_FALLBACK: true,  // Usa respuestas predefinidas si Gemini falla
    
    // Modo debug
    DEBUG_MODE: false    // Cambia a true para ver logs detallados
};

window.COACH_CONFIG = CONFIG;
```

### 3. Parámetros de Configuración

| Parámetro | Descripción | Valor por Defecto |
|-----------|-------------|-------------------|
| `GEMINI_API_KEY` | Tu API key de Google AI Studio | `'TU_API_KEY_AQUI'` |
| `GEMINI_MODEL` | Modelo de Gemini a usar | `'gemini-pro'` |
| `MAX_TOKENS` | Máximo de tokens en la respuesta | `1024` |
| `TEMPERATURE` | Creatividad de las respuestas (0-1) | `0.7` |
| `USE_FALLBACK` | Usar respuestas predefinidas como respaldo | `true` |
| `DEBUG_MODE` | Mostrar logs detallados en consola | `false` |

## 🔐 Obtener API Key de Google

### Paso a paso:

1. **Ve a Google AI Studio**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Inicia sesión** con tu cuenta de Google
3. **Haz clic en "Create API Key"**
4. **Selecciona un proyecto** o crea uno nuevo
5. **Copia la API key** generada
6. **Pégala en tu archivo `config.js`**

### 💡 Consejos de seguridad:
- ✅ Nunca compartas tu API key públicamente
- ✅ El archivo `config.js` está en `.gitignore` (no se sube a Git)
- ✅ Usa restricciones de API key en Google Cloud Console si es necesario

## 🌐 Despliegue

### Desarrollo Local
```bash
# Simplemente abre el archivo en tu navegador
open index.html
# o
python -m http.server 8000  # Si necesitas un servidor local
```

### GitHub Pages
1. Sube tu proyecto a GitHub (sin el archivo `config.js`)
2. Ve a Settings > Pages
3. Selecciona la rama main como fuente
4. Tu aplicación estará disponible en `https://tu-usuario.github.io/coach-estoico`

### Hosting Web
1. Sube todos los archivos a tu servidor web
2. Asegúrate de incluir tu `config.js` con la API key
3. Accede a tu dominio

## 🔍 Verificación y Pruebas

### 1. Verificar configuración
1. Abre `index.html` en tu navegador
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña Console
4. Busca mensajes de configuración

### 2. Probar la aplicación
1. Haz clic en "Comenzar Chat"
2. Escribe un mensaje como: "¿Cómo puedo ser más resiliente?"
3. **Con API Key**: Recibirás una respuesta personalizada de Gemini
4. **Sin API Key**: Recibirás una respuesta estoica predefinida

### 3. Solución de problemas

| Problema | Solución |
|----------|----------|
| "API key no válida" | Verifica que copiaste correctamente la API key |
| "Modelo no encontrado" | Cambia `GEMINI_MODEL` a `'gemini-pro'` |
| "Error de CORS" | Usa un servidor local o hosting web |
| "No hay respuesta" | Verifica tu conexión a internet |

## 🎯 Funcionalidades

### ✅ Con Gemini AI configurado:
- Respuestas personalizadas y contextuales
- Adaptación al estilo de conversación del usuario
- Conocimiento actualizado de filosofía estoica
- Respuestas en español e inglés

### ✅ Sin Gemini AI (modo fallback):
- 12 respuestas estoicas predefinidas
- Funcionalidad básica garantizada
- Sin dependencia de internet para respuestas
- Experiencia de usuario fluida

## 🔧 Personalización Avanzada

### Cambiar el comportamiento del modelo:
```javascript
// En config.js
const CONFIG = {
    GEMINI_API_KEY: 'tu-api-key',
    GEMINI_MODEL: 'gemini-pro',
    TEMPERATURE: 0.9,  // Más creativo (0-1)
    MAX_TOKENS: 2048,  // Respuestas más largas
    // ...
};
```

### Activar modo debug:
```javascript
DEBUG_MODE: true  // Verás logs detallados en la consola
```

## 📊 Rendimiento Esperado

- **Primera consulta**: 2-3 segundos (inicialización)
- **Consultas posteriores**: 1-2 segundos
- **Modo fallback**: Instantáneo
- **Uso de datos**: ~1-5KB por consulta

## 🆘 Soporte

Si tienes problemas:

1. **Revisa la consola del navegador** (F12) para errores
2. **Verifica tu API key** en Google AI Studio
3. **Prueba con `DEBUG_MODE: true`** para más información
4. **Usa el modo fallback** si Gemini no funciona

## 📝 Notas Adicionales

- La aplicación funciona completamente en el frontend
- No requiere servidor backend
- Compatible con todos los navegadores modernos
- Responsive design para móvil y desktop
- Soporte bilingüe (español/inglés)

---

¡Tu Coach Estoico está listo para ayudarte en tu camino hacia la sabiduría! 🏛️✨