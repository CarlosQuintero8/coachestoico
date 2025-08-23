// Configuración de Coach Estoico - ARCHIVO DE EJEMPLO
// Copia este archivo como 'config.js' y agrega tu API key real

const CONFIG = {
    // Obtén tu API key gratuita en: https://makersuite.google.com/app/apikey
    GEMINI_API_KEY: 'TU_API_KEY_AQUI',
    
    // Configuración opcional
    GEMINI_MODEL: 'gemini-pro',
    MAX_TOKENS: 1024,
    TEMPERATURE: 0.7,
    
    // Configuración de fallback
    USE_FALLBACK: true, // Si es true, usa respuestas predefinidas cuando Gemini falla
    
    // Debug
    DEBUG_MODE: true // Muestra logs detallados en la consola
};

// Hacer la configuración disponible globalmente
window.COACH_CONFIG = CONFIG;