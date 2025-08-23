// Coach Estoico - Aplicación Principal
class CoachEstoico {
    constructor() {
        this.currentLanguage = 'es';
        this.messages = [];
        this.isLoading = false;
        this.translations = {};
        
        // Configuración de Gemini API
        this.geminiConfig = {
            apiKey: window.COACH_CONFIG?.GEMINI_API_KEY || 'TU_API_KEY_AQUI',
            apiUrl: `https://generativelanguage.googleapis.com/v1beta/models/${window.COACH_CONFIG?.GEMINI_MODEL || 'gemini-pro'}:generateContent`,
            maxTokens: window.COACH_CONFIG?.MAX_TOKENS || 1024,
            temperature: window.COACH_CONFIG?.TEMPERATURE || 0.7,
            useFallback: window.COACH_CONFIG?.USE_FALLBACK !== false,
            debugMode: window.COACH_CONFIG?.DEBUG_MODE || false
        };
        
        // Respuestas predefinidas como fallback
        this.stoicResponses = {
            es: [
                "Como diría Marco Aurelio: 'Tienes poder sobre tu mente, no sobre los eventos externos. Date cuenta de esto, y encontrarás fuerza.' Recuerda que no puedes controlar lo que sucede, pero sí puedes controlar cómo respondes a ello.",
                
                "Epicteto nos enseña que 'No son los hechos los que perturban a los hombres, sino los juicios sobre los hechos.' Reflexiona sobre si tu malestar viene de la situación en sí o de cómo la estás interpretando.",
                
                "Séneca escribió: 'Sufrimos más en la imaginación que en la realidad.' Muchas veces nuestros miedos y preocupaciones son peores que lo que realmente está sucediendo. Enfócate en el presente.",
                
                "Los estoicos creían en la virtud de la aceptación. Como dice Marco Aurelio: 'Acepta las cosas a las que el destino te ata, y ama a las personas con las que el destino te une.' Encuentra paz en aceptar lo que no puedes cambiar.",
                
                "Recuerda las palabras de Epicteto: 'Es imposible que un hombre aprenda lo que cree que ya sabe.' Mantén una mente abierta y ve cada desafío como una oportunidad de crecimiento.",
                
                "Marco Aurelio nos recuerda: 'Muy poco se necesita para hacer una vida feliz; todo está dentro de ti, en tu forma de pensar.' La felicidad no depende de las circunstancias externas, sino de tu perspectiva interior.",
                
                "Como enseñaba Séneca: 'No hay viento favorable para el que no sabe a qué puerto se dirige.' Reflexiona sobre tus valores y objetivos. La claridad en tus propósitos te dará fortaleza ante las adversidades.",
                
                "Epicteto decía: 'Ningún hombre es libre si no es dueño de sí mismo.' La verdadera libertad viene de dominar tus emociones y reacciones, no de controlar el mundo exterior.",
                
                "Marco Aurelio escribió: 'Confina tu atención al presente.' El pasado ya no existe y el futuro aún no ha llegado. Tu poder reside en este momento presente.",
                
                "Séneca nos aconseja: 'Cada nuevo comienzo viene del final de algún otro comienzo.' Los cambios y las pérdidas son oportunidades para crecer y renovarte. Abraza la transformación.",
                
                "Como decía Epicteto: 'La riqueza consiste no en tener grandes posesiones, sino en tener pocas necesidades.' Encuentra contentamiento en la simplicidad y gratitud por lo que ya tienes.",
                
                "Marco Aurelio reflexionaba: 'Cuando te despiertes por la mañana, dite a ti mismo: las personas con las que trato hoy serán entrometidas, ingratas, arrogantes, deshonestas, celosas y hoscas.' Prepárate mentalmente para los desafíos del día con paciencia y comprensión."
            ],
            en: [
                "As Marcus Aurelius would say: 'You have power over your mind - not outside events. Realize this, and you will find strength.' Remember that you cannot control what happens, but you can control how you respond to it.",
                
                "Epictetus teaches us that 'It's not what happens to you, but how you react to it that matters.' Reflect on whether your distress comes from the situation itself or from how you're interpreting it.",
                
                "Seneca wrote: 'We suffer more in imagination than in reality.' Often our fears and worries are worse than what is actually happening. Focus on the present.",
                
                "The Stoics believed in the virtue of acceptance. As Marcus Aurelius says: 'Accept the things to which fate binds you, and love the people with whom fate brings you together.' Find peace in accepting what you cannot change.",
                
                "Remember Epictetus' words: 'It is impossible for a man to learn what he thinks he already knows.' Keep an open mind and see each challenge as an opportunity for growth.",
                
                "Marcus Aurelius reminds us: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.' Happiness doesn't depend on external circumstances, but on your inner perspective.",
                
                "As Seneca taught: 'There is no favorable wind for the one who doesn't know which port he's heading to.' Reflect on your values and goals. Clarity in your purposes will give you strength against adversities.",
                
                "Epictetus said: 'No man is free who is not master of himself.' True freedom comes from mastering your emotions and reactions, not from controlling the external world.",
                
                "Marcus Aurelius wrote: 'Confine yourself to the present.' The past no longer exists and the future hasn't arrived yet. Your power resides in this present moment.",
                
                "Seneca advises us: 'Every new beginning comes from some other beginning's end.' Changes and losses are opportunities to grow and renew yourself. Embrace transformation.",
                
                "As Epictetus said: 'Wealth consists not in having great possessions, but in having few wants.' Find contentment in simplicity and gratitude for what you already have.",
                
                "Marcus Aurelius reflected: 'When you wake up in the morning, tell yourself: the people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly.' Mentally prepare for the day's challenges with patience and understanding."
            ]
        };
        
        // Referencias a elementos DOM
        this.elements = {
            messageInput: document.getElementById('message-input'),
            sendButton: document.getElementById('send-button'),
            messagesArea: document.getElementById('messages-area'),
            charCounter: document.getElementById('char-counter'),
            loadingOverlay: document.getElementById('loading-overlay'),
            errorMessage: document.getElementById('error-message'),
            errorText: document.getElementById('error-text'),
            errorClose: document.getElementById('error-close'),
            welcomeSection: document.getElementById('welcome-section'),
            langEs: document.getElementById('lang-es'),
            langEn: document.getElementById('lang-en'),
            typingIndicator: document.getElementById('typing-indicator'),
            validationMessage: document.getElementById('validation-message'),
            scrollIndicator: null // Se creará dinámicamente
        };
        
        // No llamar init aquí, se llamará desde el event listener
    }
    
    init() {
        this.loadPreferences();
        this.loadTranslations();
        this.setupEventListeners();
        this.updateUI();
        this.updateCharCounter();
        
        // Configurar detección de conexión
        this.setupConnectionDetection();
        
        // Configurar optimizaciones de rendimiento
        this.setupPerformanceOptimizations();
        
        // Crear indicador de scroll
        this.createScrollIndicator();
        
        // Mostrar información de la aplicación
        this.logAppInfo();
    }
    
    setupEventListeners() {
        // Botón de envío
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Touch feedback para botón de envío
        this.elements.sendButton.addEventListener('touchstart', () => {
            this.elements.sendButton.style.transform = 'scale(0.95)';
        });
        
        this.elements.sendButton.addEventListener('touchend', () => {
            setTimeout(() => {
                this.elements.sendButton.style.transform = '';
            }, 150);
        });
        
        // Enter en textarea (Ctrl+Enter para nueva línea)
        this.elements.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Contador de caracteres y validación
        this.elements.messageInput.addEventListener('input', () => {
            this.updateCharCounter();
            this.validateInput();
            this.updateInputState();
            this.updateValidationFeedback();
        });
        
        // Selectores de idioma con feedback visual
        this.elements.langEs.addEventListener('click', (e) => {
            this.addClickFeedback(e.target);
            this.changeLanguage('es');
        });
        this.elements.langEn.addEventListener('click', (e) => {
            this.addClickFeedback(e.target);
            this.changeLanguage('en');
        });
        
        // Cerrar mensaje de error
        this.elements.errorClose.addEventListener('click', () => this.hideError());
        
        // Auto-resize del textarea
        this.elements.messageInput.addEventListener('input', this.autoResizeTextarea.bind(this));
        
        // Mejorar accesibilidad con focus management
        this.elements.messageInput.addEventListener('focus', () => {
            this.elements.messageInput.classList.add('focused');
        });
        
        this.elements.messageInput.addEventListener('blur', () => {
            this.elements.messageInput.classList.remove('focused');
        });
    }
    
    loadPreferences() {
        try {
            const preferences = localStorage.getItem('coach-estoico-preferences');
            if (preferences) {
                const parsed = JSON.parse(preferences);
                this.currentLanguage = parsed.language || this.detectBrowserLanguage();
            } else {
                this.currentLanguage = this.detectBrowserLanguage();
            }
        } catch (error) {
            this.currentLanguage = this.detectBrowserLanguage();
        }
    }
    
    savePreferences() {
        try {
            const preferences = {
                language: this.currentLanguage,
                lastVisit: Date.now()
            };
            localStorage.setItem('coach-estoico-preferences', JSON.stringify(preferences));
        } catch (error) {
            // Fallar silenciosamente si no se pueden guardar las preferencias
        }
    }
    
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('es') ? 'es' : 'en';
    }
    
    loadTranslations() {
        // Usar traducciones integradas directamente
        this.loadFallbackTranslations();
    }
    
    loadFallbackTranslations() {
        // Traducciones de respaldo en caso de que no se puedan cargar los archivos JSON
        this.translations = {
            es: {
                'app': { 'title': 'Coach Estoico' },
                'welcome': {
                    'title': 'Bienvenido a tu Coach Estoico',
                    'description': 'Describe cómo te sientes y recibe consejos basados en la sabiduría de los grandes filósofos estoicos como Marco Aurelio, Epicteto y Séneca.'
                },
                'input': { 'placeholder': 'Describe cómo te sientes...', 'send': 'Enviar' },
                'loading': { 'message': 'Consultando con los sabios estoicos...' },
                'typing': { 'message': 'Coach Estoico está escribiendo' },
                'error': {
                    'validation': 'Por favor, describe cómo te sientes.',
                    'tooShort': 'Tu mensaje es demasiado corto. Describe un poco más cómo te sientes.',
                    'tooLong': 'Tu mensaje es demasiado largo. Por favor, resume tus sentimientos.',
                    'invalidContent': 'Por favor, escribe un mensaje válido describiendo cómo te sientes.',
                    'unknown': 'Hubo un pequeño problema. Intenta nuevamente.'
                },
                'message': { 'user': 'Tú', 'assistant': 'Coach Estoico' },
                'chat': {
                    'clear': 'Limpiar conversación',
                    'empty': 'Comienza una conversación describiendo cómo te sientes',
                    'confirmClear': '¿Estás seguro de que quieres limpiar la conversación?'
                }
            },
            en: {
                'app': { 'title': 'Stoic Coach' },
                'welcome': {
                    'title': 'Welcome to your Stoic Coach',
                    'description': 'Describe how you feel and receive advice based on the wisdom of great Stoic philosophers like Marcus Aurelius, Epictetus, and Seneca.'
                },
                'input': { 'placeholder': 'Describe how you feel...', 'send': 'Send' },
                'loading': { 'message': 'Consulting with the wise Stoics...' },
                'typing': { 'message': 'Stoic Coach is typing' },
                'error': {
                    'validation': 'Please describe how you feel.',
                    'tooShort': 'Your message is too short. Please describe a bit more how you feel.',
                    'tooLong': 'Your message is too long. Please summarize your feelings.',
                    'invalidContent': 'Please write a valid message describing how you feel.',
                    'unknown': 'There was a small problem. Please try again.'
                },
                'message': { 'user': 'You', 'assistant': 'Stoic Coach' },
                'chat': {
                    'clear': 'Clear conversation',
                    'empty': 'Start a conversation by describing how you feel',
                    'confirmClear': 'Are you sure you want to clear the conversation?'
                }
            }
        };
    }
    
    changeLanguage(lang) {
        if (lang !== this.currentLanguage) {
            this.currentLanguage = lang;
            
            // Las traducciones ya están cargadas
            this.updateUI();
            this.savePreferences();
            
            // Actualizar clases activas de botones de idioma
            this.elements.langEs.classList.toggle('active', lang === 'es');
            this.elements.langEn.classList.toggle('active', lang === 'en');
            
            // Actualizar atributo lang del documento
            document.documentElement.lang = lang;
            
            // Actualizar mensajes existentes si los hay
            this.updateExistingMessages();
        }
    }
    
    updateUI() {
        // Actualizar todos los elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Actualizar títulos
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getTranslation(key);
            if (translation) {
                element.title = translation;
            }
        });
        
        // Actualizar aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            const translation = this.getTranslation(key);
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });
        
        // Actualizar botones de idioma
        this.elements.langEs.classList.toggle('active', this.currentLanguage === 'es');
        this.elements.langEn.classList.toggle('active', this.currentLanguage === 'en');
        
        // Actualizar atributos de accesibilidad del selector de idioma
        this.updateLanguageSelectorAccessibility();
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && typeof translation === 'object') {
                translation = translation[k];
            } else {
                return key; // Retornar la clave si no se encuentra la traducción
            }
        }
        
        return translation || key;
    }
    
    updateExistingMessages() {
        // Actualizar los headers de mensajes existentes
        document.querySelectorAll('.message-author').forEach(element => {
            const messageElement = element.closest('.message');
            if (messageElement.classList.contains('message-user')) {
                element.textContent = this.getTranslation('message.user');
            } else if (messageElement.classList.contains('message-assistant')) {
                element.textContent = this.getTranslation('message.assistant');
            }
        });
        
        // Actualizar botón de limpiar chat si existe
        const clearButton = document.querySelector('.clear-chat-btn span[data-i18n]');
        if (clearButton) {
            clearButton.textContent = this.getTranslation('chat.clear');
        }
    }
    
    updateCharCounter() {
        const message = this.elements.messageInput.value;
        const length = message.length;
        this.elements.charCounter.textContent = `${length}/500`;
        
        // La actualización de clases se maneja en updateInputState
        const validationError = this.getValidationError(message);
        this.updateCharCounterState(length, validationError);
    }
    
    validateInput() {
        const message = this.elements.messageInput.value.trim();
        const isValid = this.isValidMessage(message);
        const shouldEnable = isValid && !this.isLoading;
        
        this.elements.sendButton.disabled = !shouldEnable;
        return isValid;
    }
    
    isValidMessage(message) {
        // Validaciones básicas
        if (!message || typeof message !== 'string') {
            return false;
        }
        
        const trimmed = message.trim();
        
        // Mensaje vacío
        if (trimmed.length === 0) {
            return false;
        }
        
        // Mensaje demasiado corto
        if (trimmed.length < 3) {
            return false;
        }
        
        // Mensaje demasiado largo
        if (trimmed.length > 500) {
            return false;
        }
        
        // Validar que no sea solo espacios o caracteres especiales
        if (!/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]/.test(trimmed)) {
            return false;
        }
        
        return true;
    }
    
    getValidationError(message) {
        if (!message || typeof message !== 'string') {
            return 'error.validation';
        }
        
        const trimmed = message.trim();
        
        if (trimmed.length === 0) {
            return 'error.validation';
        }
        
        if (trimmed.length < 3) {
            return 'error.tooShort';
        }
        
        if (trimmed.length > 500) {
            return 'error.tooLong';
        }
        
        if (!/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]/.test(trimmed)) {
            return 'error.invalidContent';
        }
        
        return null;
    }
    
    autoResizeTextarea() {
        const textarea = this.elements.messageInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
    
    updateInputState() {
        const message = this.elements.messageInput.value.trim();
        const hasContent = message.length > 0;
        const validationError = this.getValidationError(message);
        
        // Actualizar clases del textarea
        this.elements.messageInput.classList.toggle('has-content', hasContent);
        this.elements.messageInput.classList.toggle('error', validationError !== null);
        
        // Actualizar contador de caracteres con estado de error
        this.updateCharCounterState(message.length, validationError);
    }
    
    updateCharCounterState(length, validationError) {
        this.elements.charCounter.classList.remove('warning', 'danger', 'error');
        
        if (validationError) {
            this.elements.charCounter.classList.add('error');
        } else if (length > 450) {
            this.elements.charCounter.classList.add('danger');
        } else if (length > 400) {
            this.elements.charCounter.classList.add('warning');
        }
    }
    
    async sendMessage() {
        if (this.isLoading) return;
        
        const message = this.elements.messageInput.value.trim();
        
        // Validar mensaje y mostrar error específico si es necesario
        const validationError = this.getValidationError(message);
        if (validationError) {
            this.showValidationMessage(validationError);
            this.elements.messageInput.focus();
            return;
        }
        
        // Ocultar mensaje de validación si había uno
        this.hideValidationMessage();
        
        try {
            // Agregar mensaje del usuario
            this.addMessage('user', message);
            
            // Limpiar input y deshabilitar botón
            this.elements.messageInput.value = '';
            this.updateCharCounter();
            this.validateInput();
            this.autoResizeTextarea();
            
            // Ocultar sección de bienvenida si es el primer mensaje con animación
            if (this.messages.length === 1) {
                this.hideWelcomeSection();
            }
            
            // Obtener respuesta del coach estoico
            await this.getStoicAdvice(message);
            
        } catch (error) {
            this.handleApiError(error);
        }
    }
    
    addMessage(type, content) {
        const message = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: Date.now(),
            language: this.currentLanguage
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    
    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${message.type} new`;
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">
                        ${message.type === 'user' ? this.getTranslation('message.user') : this.getTranslation('message.assistant')}
                    </span>
                    <span class="message-time">${this.formatTime(message.timestamp)}</span>
                </div>
                <div class="message-text">${this.escapeHtml(message.content)}</div>
            </div>
        `;
        
        // Agregar el mensaje con animación
        this.elements.messagesArea.appendChild(messageElement);
        
        // Trigger reflow para asegurar que la animación funcione
        messageElement.offsetHeight;
        
        // Remover clase 'new' después de la animación
        setTimeout(() => {
            messageElement.classList.remove('new');
        }, 2000);
        
        // Mostrar acciones de chat si es el primer mensaje
        this.updateChatActions();
        
        // Animar el scroll hacia el nuevo mensaje
        this.animateScrollToMessage(messageElement);
    }
    
    animateScrollToMessage(messageElement) {
        // Scroll suave hacia el nuevo mensaje con mejor timing
        this.elements.messagesArea.classList.add('auto-scrolling');
        
        setTimeout(() => {
            // Scroll hacia el nuevo mensaje
            messageElement.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
            
            // También asegurar que el área de mensajes esté completamente visible
            setTimeout(() => {
                this.elements.messagesArea.scrollTop = this.elements.messagesArea.scrollHeight;
            }, 300);
            
        }, 150);
        
        // Remover clase después de la animación
        setTimeout(() => {
            this.elements.messagesArea.classList.remove('auto-scrolling');
        }, 1000);
    }
    
    scrollToBottom(smooth = true) {
        if (smooth) {
            this.elements.messagesArea.classList.add('auto-scrolling');
            this.elements.messagesArea.scrollTo({
                top: this.elements.messagesArea.scrollHeight,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                this.elements.messagesArea.classList.remove('auto-scrolling');
            }, 500);
        } else {
            this.elements.messagesArea.scrollTop = this.elements.messagesArea.scrollHeight;
        }
    }
    
    async getStoicAdvice(userMessage) {
        let showedTypingIndicator = false;
        
        try {
            // Verificar si el fallback está habilitado y si debemos intentar Gemini
            if (this.geminiConfig.useFallback && (!this.geminiConfig.apiKey || this.geminiConfig.apiKey === 'TU_API_KEY_AQUI')) {
                // No mostrar indicador de escritura para respuestas instantáneas
                const fallbackAdvice = this.selectStoicResponse(userMessage);
                this.addMessage('assistant', fallbackAdvice);
                return;
            }
            
            // Mostrar indicador de escritura solo cuando vamos a llamar a Gemini
            this.showTypingIndicator();
            showedTypingIndicator = true;
            
            // Intentar obtener respuesta de Gemini
            const advice = await this.callGeminiAPI(userMessage);
            
            // Ocultar indicador de escritura antes de mostrar la respuesta
            this.hideTypingIndicator();
            showedTypingIndicator = false;
            
            // Agregar el mensaje de respuesta del asistente
            this.addMessage('assistant', advice);
            
        } catch (error) {
            // Error manejado silenciosamente
            
            // Ocultar indicador de escritura si se mostró
            if (showedTypingIndicator) {
                this.hideTypingIndicator();
                showedTypingIndicator = false;
            }
            
            // Fallback a respuestas predefinidas si Gemini falla
            if (this.geminiConfig.useFallback) {
                // No mostrar indicador para respuestas de fallback (son instantáneas)
                const fallbackAdvice = this.selectStoicResponse(userMessage);
                this.addMessage('assistant', fallbackAdvice);
            } else {
                // Si no hay fallback, mostrar mensaje de error
                this.addErrorMessage();
            }
        } finally {
            // Asegurarse de que el indicador se oculte en cualquier caso
            if (showedTypingIndicator) {
                this.hideTypingIndicator();
            }
        }
    }
    
    async callGeminiAPI(userMessage) {
        // Verificar que tenemos API key
        if (!this.geminiConfig.apiKey || this.geminiConfig.apiKey === 'TU_API_KEY_AQUI') {
            throw new Error('API key de Gemini no configurada');
        }
        
        // Si ya tenemos una configuración que funciona, usarla primero
        if (this.geminiConfig.workingModel && this.geminiConfig.workingVersion) {
            const workingConfig = { 
                model: this.geminiConfig.workingModel, 
                version: this.geminiConfig.workingVersion 
            };
            
            // Usar directamente la configuración que sabemos que funciona
            const apiUrl = `https://generativelanguage.googleapis.com/${workingConfig.version}/models/${workingConfig.model}:generateContent`;
            return await this.tryGeminiRequest(apiUrl, workingConfig, userMessage, true);
        }
        
        // Lista de configuraciones a probar (ordenadas por probabilidad de éxito)
        const configurations = [
            { model: 'gemini-1.5-flash', version: 'v1' },
            { model: window.COACH_CONFIG?.GEMINI_MODEL || 'gemini-pro', version: 'v1beta' },
            { model: 'gemini-pro', version: 'v1beta' },
            { model: 'gemini-1.5-flash-latest', version: 'v1' }
        ];
        
        // Crear el prompt estoico
        const prompt = this.createStoicPrompt(userMessage);
        
        // Configurar la petición base
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: this.geminiConfig.temperature,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: this.geminiConfig.maxTokens,
            }
        };
        
        // Probar cada configuración
        for (let i = 0; i < configurations.length; i++) {
            const config = configurations[i];
            const apiUrl = `https://generativelanguage.googleapis.com/${config.version}/models/${config.model}:generateContent`;
            
            try {
                const result = await this.tryGeminiRequest(apiUrl, config, userMessage, false, i + 1, configurations.length);
                
                // Si llegamos aquí, la petición fue exitosa
                // Guardar la configuración exitosa para futuras llamadas
                this.geminiConfig.workingModel = config.model;
                this.geminiConfig.workingVersion = config.version;
                this.geminiConfig.apiUrl = apiUrl;
                
                // Solo mostrar log de éxito en la primera vez o en modo debug
                if (this.geminiConfig.debugMode || !this.geminiConfig.workingModel) {
                    console.log(`✅ Gemini conectado exitosamente:`, {
                        model: config.model,
                        version: config.version
                    });
                }
                
                return result;
                
            } catch (error) {
                if (this.geminiConfig.debugMode) {
                    console.warn(`⚠️ Configuración ${i + 1} falló:`, error.message);
                }
                
                // Si no es la última configuración, continuar con la siguiente
                if (i < configurations.length - 1) {
                    continue;
                } else {
                    throw error;
                }
            }
        }
    }
    
    async tryGeminiRequest(apiUrl, config, userMessage, isWorkingConfig = false, attemptNumber = 1, totalAttempts = 1) {
        // Crear el prompt estoico
        const prompt = this.createStoicPrompt(userMessage);
        
        // Configurar la petición
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: this.geminiConfig.temperature,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: this.geminiConfig.maxTokens,
            }
        };
        
        if (this.geminiConfig.debugMode && !isWorkingConfig) {
            console.log(`🚀 Probando configuración ${attemptNumber}/${totalAttempts}:`, {
                model: config.model,
                version: config.version
            });
        }
        
        // Hacer la petición a Gemini
        const response = await fetch(`${apiUrl}?key=${this.geminiConfig.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = `${config.model} (${config.version}): ${response.status} - ${errorData.error?.message || response.statusText}`;
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        // Extraer la respuesta
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Formato de respuesta inválido de Gemini API');
        }
    }
    
    createStoicPrompt(userMessage) {
        const prompts = {
            es: `Eres un coach estoico experto basado en las enseñanzas de Marco Aurelio, Epicteto y Séneca. 

El usuario dice: "${userMessage}"

Proporciona un consejo práctico y compasivo basado en principios estoicos auténticos. Tu respuesta debe:
- Ser cálida pero sabia
- Incluir una cita o referencia específica de un filósofo estoico
- Ofrecer una perspectiva práctica que el usuario pueda aplicar
- Mantener un tono esperanzador y empoderador
- Ser concisa (máximo 200 palabras)

Responde en español de manera natural y conversacional.`,

            en: `You are an expert Stoic coach based on the teachings of Marcus Aurelius, Epictetus, and Seneca.

The user says: "${userMessage}"

Provide practical and compassionate advice based on authentic Stoic principles. Your response should:
- Be warm yet wise
- Include a specific quote or reference from a Stoic philosopher
- Offer a practical perspective the user can apply
- Maintain a hopeful and empowering tone
- Be concise (maximum 200 words)

Respond in English in a natural and conversational way.`
        };
        
        return prompts[this.currentLanguage];
    }
    
    selectStoicResponse(userMessage) {
        const responses = this.stoicResponses[this.currentLanguage];
        const message = userMessage.toLowerCase();
        
        // Palabras clave para diferentes tipos de consejos
        const keywords = {
            anxiety: ['ansioso', 'ansiedad', 'preocup', 'nervios', 'miedo', 'anxious', 'anxiety', 'worry', 'nervous', 'fear', 'scared'],
            sadness: ['triste', 'deprim', 'melanc', 'dolor', 'pena', 'sad', 'depress', 'melancholy', 'pain', 'grief', 'sorrow'],
            anger: ['enojado', 'furioso', 'ira', 'rabia', 'molesto', 'angry', 'furious', 'rage', 'mad', 'irritated', 'frustrated'],
            stress: ['estrés', 'estresado', 'agobio', 'presión', 'abrumado', 'stress', 'stressed', 'overwhelmed', 'pressure', 'burden'],
            confusion: ['confund', 'perdido', 'desorient', 'dudas', 'incert', 'confused', 'lost', 'uncertain', 'doubt', 'unclear'],
            change: ['cambio', 'transición', 'nuevo', 'diferente', 'change', 'transition', 'new', 'different', 'transform'],
            relationships: ['relación', 'pareja', 'amigo', 'familia', 'gente', 'relationship', 'partner', 'friend', 'family', 'people'],
            work: ['trabajo', 'laboral', 'jefe', 'empleo', 'carrera', 'work', 'job', 'boss', 'career', 'employment'],
            health: ['salud', 'enferm', 'dolor', 'cansado', 'health', 'sick', 'illness', 'tired', 'pain'],
            general: ['bien', 'mal', 'regular', 'normal', 'good', 'bad', 'okay', 'fine', 'normal']
        };
        
        // Buscar palabras clave en el mensaje
        let selectedResponses = responses;
        
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => message.includes(word))) {
                // Si encontramos palabras clave específicas, podríamos filtrar respuestas
                // Por ahora, usamos todas las respuestas pero podríamos expandir esto
                break;
            }
        }
        
        // Seleccionar respuesta aleatoria
        const randomIndex = Math.floor(Math.random() * selectedResponses.length);
        return selectedResponses[randomIndex];
    }
    

    
    addErrorMessage() {
        // Agregar un mensaje de error amigable en el chat
        const errorMessages = {
            es: "Disculpa, hubo un pequeño problema al generar tu consejo estoico. Como diría Marco Aurelio: 'Los obstáculos en el camino se convierten en el camino.' Intenta nuevamente, y recuerda que incluso los contratiempos son oportunidades para practicar la paciencia estoica.",
            en: "Sorry, there was a small issue generating your Stoic advice. As Marcus Aurelius would say: 'The impediment to action advances action. What stands in the way becomes the way.' Please try again, and remember that even setbacks are opportunities to practice Stoic patience."
        };
        
        this.addMessage('assistant', errorMessages[this.currentLanguage]);
    }
    
    logAppInfo() {
        console.log('🏛️ Coach Estoico - Frontend Only Version');
        console.log('✅ Aplicación cargada correctamente');
        console.log('📚 Respuestas basadas en filosofía estoica clásica');
        console.log('🎯 Filósofos incluidos: Marco Aurelio, Epicteto, Séneca');
        console.log(`🌐 Idioma actual: ${this.currentLanguage}`);
        console.log(`💬 Respuestas disponibles: ${this.stoicResponses[this.currentLanguage].length}`);
    }
    
    setupConnectionDetection() {
        // Esta aplicación funciona completamente offline
        // Solo registramos los eventos para información
        window.addEventListener('online', () => {
            console.log('🌐 Conexión a internet restaurada');
        });
        
        window.addEventListener('offline', () => {
            console.log('📴 Sin conexión a internet (la aplicación sigue funcionando)');
        });
    }
    
    showValidationMessage(errorKey) {
        const message = this.getTranslation(errorKey);
        this.elements.validationMessage.textContent = message;
        this.elements.validationMessage.classList.add('show');
        
        // Auto-hide después de 3 segundos
        setTimeout(() => this.hideValidationMessage(), 3000);
    }
    
    hideValidationMessage() {
        this.elements.validationMessage.classList.remove('show');
    }
    
    updateValidationFeedback() {
        const message = this.elements.messageInput.value;
        const validationError = this.getValidationError(message);
        
        // Solo mostrar validación en tiempo real para errores críticos
        if (validationError === 'error.tooLong') {
            this.showValidationMessage(validationError);
        } else if (message.trim().length > 0) {
            // Ocultar mensaje de validación si el usuario está escribiendo contenido válido
            this.hideValidationMessage();
        }
    }
    
    addClickFeedback(element) {
        // Agregar feedback visual para clicks
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.transition = '';
        }, 150);
    }
    
    setupPerformanceOptimizations() {
        // Optimizar scroll en dispositivos móviles
        if ('ontouchstart' in window) {
            this.elements.messagesArea.style.webkitOverflowScrolling = 'touch';
        }
        
        // Configurar efectos de scroll para el header
        this.setupScrollEffects();
        
        // Configurar interacciones táctiles mejoradas
        this.setupTouchInteractions();
        
        // Debounce para el auto-resize del textarea
        let resizeTimeout;
        const originalAutoResize = this.autoResizeTextarea.bind(this);
        this.autoResizeTextarea = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(originalAutoResize, 100);
        };
        
        // Optimizar animaciones en dispositivos de baja potencia
        this.optimizeAnimationsForDevice();
    }
    
    setupScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        this.elements.messagesArea.addEventListener('scroll', () => {
            const scrollTop = this.elements.messagesArea.scrollTop;
            
            // Agregar clase 'scrolled' al header cuando hay scroll
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupTouchInteractions() {
        // Mejorar feedback táctil para botones
        const touchElements = [
            this.elements.sendButton,
            this.elements.langEs,
            this.elements.langEn
        ];
        
        touchElements.forEach(element => {
            if (element) {
                // Agregar feedback visual para touch start
                element.addEventListener('touchstart', (e) => {
                    element.style.transform = 'scale(0.95)';
                    element.style.transition = 'transform 0.1s ease';
                }, { passive: true });
                
                // Restaurar estado en touch end
                element.addEventListener('touchend', (e) => {
                    setTimeout(() => {
                        element.style.transform = '';
                        element.style.transition = '';
                    }, 150);
                }, { passive: true });
                
                // Manejar touch cancel
                element.addEventListener('touchcancel', (e) => {
                    element.style.transform = '';
                    element.style.transition = '';
                }, { passive: true });
            }
        });
        
        // Mejorar el comportamiento del textarea en móviles
        if ('ontouchstart' in window) {
            this.elements.messageInput.addEventListener('touchstart', () => {
                // Prevenir zoom en iOS
                this.elements.messageInput.style.fontSize = '16px';
            });
            
            // Scroll automático cuando el teclado aparece en móviles
            this.elements.messageInput.addEventListener('focus', () => {
                setTimeout(() => {
                    this.elements.messageInput.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            });
        }
    }
    
    optimizeAnimationsForDevice() {
        // Detectar dispositivos de baja potencia y reducir animaciones
        const isLowPowerDevice = this.detectLowPowerDevice();
        
        if (isLowPowerDevice) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            document.documentElement.style.setProperty('--transition-duration', '0.15s');
        }
        
        // Respetar preferencias de movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
            document.documentElement.style.setProperty('--transition-duration', '0.01s');
        }
    }
    
    detectLowPowerDevice() {
        // Heurística simple para detectar dispositivos de baja potencia
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const isOldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        return isSlowConnection || isLowMemory || isOldDevice;
    }
    
    createScrollIndicator() {
        // Crear el botón indicador de scroll
        const scrollIndicator = document.createElement('button');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        scrollIndicator.setAttribute('aria-label', 'Scroll to bottom');
        scrollIndicator.title = 'Ir al final';
        
        // Agregar al área de mensajes
        this.elements.messagesArea.appendChild(scrollIndicator);
        this.elements.scrollIndicator = scrollIndicator;
        
        // Configurar evento click
        scrollIndicator.addEventListener('click', () => {
            this.scrollToBottom(true);
            scrollIndicator.classList.remove('show');
        });
        
        // Configurar detección de scroll para mostrar/ocultar el indicador
        this.setupScrollIndicatorLogic();
    }
    
    setupScrollIndicatorLogic() {
        let scrollTimeout;
        
        this.elements.messagesArea.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                const { scrollTop, scrollHeight, clientHeight } = this.elements.messagesArea;
                const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
                const hasMessages = this.messages.length > 2;
                
                if (!isNearBottom && hasMessages) {
                    this.elements.scrollIndicator.classList.add('show');
                } else {
                    this.elements.scrollIndicator.classList.remove('show');
                }
            }, 100);
        });
    }
    
    hideWelcomeSection() {
        this.elements.welcomeSection.classList.add('fade-out');
        
        setTimeout(() => {
            this.elements.welcomeSection.style.display = 'none';
        }, 500);
    }
    
    showWelcomeSection() {
        this.elements.welcomeSection.style.display = 'block';
        this.elements.welcomeSection.classList.remove('fade-out');
    }
    
    updateChatActions() {
        const chatActions = document.getElementById('chat-actions');
        const clearButton = document.getElementById('clear-chat-btn');
        
        if (this.messages.length > 0) {
            if (!chatActions.classList.contains('show')) {
                chatActions.style.display = 'flex';
                setTimeout(() => chatActions.classList.add('show'), 10);
            }
            
            // Configurar evento del botón limpiar si no está configurado
            if (clearButton && !clearButton.hasAttribute('data-configured')) {
                clearButton.setAttribute('data-configured', 'true');
                clearButton.addEventListener('click', () => this.clearChat());
            }
        } else {
            chatActions.classList.remove('show');
            setTimeout(() => {
                if (!chatActions.classList.contains('show')) {
                    chatActions.style.display = 'none';
                }
            }, 300);
        }
    }
    
    clearChat() {
        const confirmMessage = this.getTranslation('chat.confirmClear');
        
        if (confirm(confirmMessage)) {
            // Animar la eliminación de mensajes
            const messageElements = this.elements.messagesArea.querySelectorAll('.message');
            
            messageElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => element.remove(), 300);
                }, index * 50);
            });
            
            // Limpiar array de mensajes
            setTimeout(() => {
                this.messages = [];
                this.updateChatActions();
                this.showWelcomeSection();
            }, messageElements.length * 50 + 300);
        }
    }
    
    setupPerformanceOptimizations() {
        // Optimizar scroll en dispositivos móviles
        if ('ontouchstart' in window) {
            this.elements.messagesArea.style.webkitOverflowScrolling = 'touch';
        }
        
        // Configurar efectos de scroll para el header
        this.setupScrollEffects();
        
        // Configurar interacciones táctiles mejoradas
        this.setupTouchInteractions();
        
        // Debounce para el auto-resize del textarea
        let resizeTimeout;
        const originalAutoResize = this.autoResizeTextarea.bind(this);
        this.autoResizeTextarea = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(originalAutoResize, 100);
        };
        
        // Optimizar validación en tiempo real
        let validationTimeout;
        const originalUpdateValidation = this.updateValidationFeedback.bind(this);
        this.updateValidationFeedback = () => {
            clearTimeout(validationTimeout);
            validationTimeout = setTimeout(originalUpdateValidation, 300); // 300ms debounce
        };
    }
    
    showAppLoading() {
        document.querySelector('.app-container').classList.add('loading');
    }
    
    hideAppLoading() {
        document.querySelector('.app-container').classList.remove('loading');
    }
    
    showLoading() {
        this.isLoading = true;
        this.elements.loadingOverlay.classList.add('show');
        this.validateInput(); // Actualizar estado del botón
    }
    
    hideLoading() {
        this.isLoading = false;
        this.elements.loadingOverlay.classList.remove('show');
        this.validateInput(); // Actualizar estado del botón
    }
    
    showTypingIndicator() {
        this.isLoading = true;
        this.elements.typingIndicator.classList.add('show');
        this.validateInput(); // Actualizar estado del botón
        
        // Scroll suave hacia el indicador de escritura
        setTimeout(() => {
            this.elements.typingIndicator.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }, 100);
    }
    
    hideTypingIndicator() {
        this.isLoading = false;
        this.elements.typingIndicator.classList.remove('show');
        this.validateInput(); // Actualizar estado del botón
    }
    
    showError(errorKey) {
        const errorMessage = this.getTranslation(errorKey);
        this.elements.errorText.textContent = errorMessage;
        this.elements.errorMessage.classList.add('show');
        
        // Auto-hide después de 5 segundos
        setTimeout(() => this.hideError(), 5000);
    }
    
    hideError() {
        this.elements.errorMessage.classList.remove('show');
    }
    
    scrollToBottom(smooth = true) {
        setTimeout(() => {
            if (smooth && this.elements.messagesArea.scrollTo) {
                this.elements.messagesArea.scrollTo({
                    top: this.elements.messagesArea.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                // Fallback para navegadores que no soportan smooth scroll
                this.elements.messagesArea.scrollTop = this.elements.messagesArea.scrollHeight;
            }
        }, 100);
    }
    
    formatTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString(this.currentLanguage, {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updateChatActions() {
        // Crear o mostrar botón de limpiar chat si hay mensajes
        if (this.messages.length > 0) {
            let chatActions = document.querySelector('.chat-actions');
            if (!chatActions) {
                chatActions = document.createElement('div');
                chatActions.className = 'chat-actions';
                chatActions.innerHTML = `
                    <button class="clear-chat-btn" id="clear-chat-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span data-i18n="chat.clear">${this.getTranslation('chat.clear')}</span>
                    </button>
                `;
                
                // Insertar antes del área de entrada
                const inputArea = document.querySelector('.input-area');
                inputArea.parentNode.insertBefore(chatActions, inputArea);
                
                // Agregar event listener
                document.getElementById('clear-chat-btn').addEventListener('click', () => {
                    this.clearChat();
                });
            }
            
            chatActions.classList.add('show');
        }
    }
    
    clearChat() {
        // Confirmar antes de limpiar
        const confirmMessage = this.getTranslation('chat.confirmClear');
        if (confirm(confirmMessage)) {
            
            this.messages = [];
            this.elements.messagesArea.innerHTML = '';
            this.elements.welcomeSection.style.display = 'block';
            
            // Ocultar acciones de chat
            const chatActions = document.querySelector('.chat-actions');
            if (chatActions) {
                chatActions.classList.remove('show');
            }
        }
    }
    
    addEmptyState() {
        if (this.messages.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M8 16H13M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p data-i18n="chat.empty">${this.getTranslation('chat.empty')}</p>
            `;
            this.elements.messagesArea.appendChild(emptyState);
        }
    }
    
    updateLanguageSelectorAccessibility() {
        // Actualizar aria-labels y títulos del selector de idioma
        if (this.currentLanguage === 'es') {
            this.elements.langEs.setAttribute('aria-label', 'Idioma actual: Español');
            this.elements.langEs.title = 'Español (actual)';
            this.elements.langEn.setAttribute('aria-label', 'Cambiar a inglés');
            this.elements.langEn.title = 'English';
        } else {
            this.elements.langEs.setAttribute('aria-label', 'Cambiar a español');
            this.elements.langEs.title = 'Español';
            this.elements.langEn.setAttribute('aria-label', 'Current language: English');
            this.elements.langEn.title = 'English (current)';
        }
        
        // Actualizar aria-label del contenedor
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            const label = this.currentLanguage === 'es' ? 'Selector de idioma' : 'Language selector';
            languageSelector.setAttribute('aria-label', label);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que los elementos críticos existan
    const criticalElements = [
        'message-input',
        'send-button',
        'char-counter'
    ];
    
    const missingElements = criticalElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        alert(`Error: No se encontraron los elementos: ${missingElements.join(', ')}`);
        return;
    }
    
    window.coachEstoico = new CoachEstoico();
    window.coachEstoico.init();
});

// Limpiar datos de sesión al cerrar la ventana
window.addEventListener('beforeunload', () => {
    // Solo mantener preferencias, limpiar datos de sesión
    try {
        const preferences = localStorage.getItem('coach-estoico-preferences');
        localStorage.clear();
        if (preferences) {
            localStorage.setItem('coach-estoico-preferences', preferences);
        }
    } catch (error) {
        // Fallar silenciosamente al limpiar datos de sesión
    }
});

// Funciones para controlar el indicador de escritura
CoachEstoico.prototype.showTypingIndicator = function() {
    if (this.elements.typingIndicator) {
        this.elements.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }
};

CoachEstoico.prototype.hideTypingIndicator = function() {
    if (this.elements.typingIndicator) {
        this.elements.typingIndicator.classList.remove('show');
    }
};