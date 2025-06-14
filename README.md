# Frontend Application for RAG System

Esta aplicación frontend proporciona una interfaz moderna y responsiva para interactuar con el sistema RAG (Retrieval-Augmented Generation). Construida con Next.js y Tailwind CSS, ofrece una experiencia de usuario fluida para cargar documentos, realizar consultas y visualizar respuestas del modelo de lenguaje.

---

## 🎨 Características clave

- **Interfaz moderna**: Diseño limpio y profesional utilizando Tailwind CSS y componentes de shadcn/ui
- **Experiencia responsiva**: Adaptable a diferentes dispositivos y tamaños de pantalla
- **Gestión de estado**: Implementación eficiente de estado global con React Context
- **Formularios avanzados**: Validación robusta con React Hook Form y Zod
- **Notificaciones**: Sistema de notificaciones en tiempo real con react-hot-toast
- **Tema oscuro/claro**: Soporte para múltiples temas con next-themes
- **Componentes reutilizables**: Biblioteca extensa de componentes UI accesibles

---

## 📋 Tabla de Contenidos

1. [Requisitos previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Scripts disponibles](#scripts-disponibles)
5. [Componentes principales](#componentes-principales)
6. [Configuración](#configuración)
7. [Desarrollo](#desarrollo)
8. [Despliegue](#despliegue)

---

## Requisitos previos

- Node.js 18.x o superior
- npm o yarn
- Git

---

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/esarmiem/rag-ollama3-nextjs.git
cd rag-ollama3-nextjs
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Estructura del proyecto

```
exp-ai-frontend/
├── app/                 # Rutas y páginas de la aplicación
├── components/          # Componentes reutilizables
├── context/            # Contextos de React
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── public/             # Archivos estáticos
├── styles/             # Estilos globales
└── types/              # Definiciones de TypeScript
```

---

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta el linter para verificar el código

---

## Componentes principales

### UI Components
La aplicación utiliza una extensa colección de componentes de shadcn/ui, incluyendo:
- Acordeones
- Diálogos
- Menús desplegables
- Formularios
- Notificaciones
- Paneles redimensionables
- Y muchos más...

### Layout Components
- `Header`: Navegación principal
- `Sidebar`: Menú lateral
- `Footer`: Pie de página

### Feature Components
- `DocumentUploader`: Gestión de carga de documentos
- `ChatInterface`: Interfaz de chat con el modelo
- `ResponseViewer`: Visualización de respuestas

---

## Configuración

### Tailwind CSS
La aplicación utiliza Tailwind CSS para estilos. La configuración se encuentra en `tailwind.config.js`.

### Next.js
La configuración de Next.js está en `next.config.mjs`.

### TypeScript
Configuración de TypeScript en `tsconfig.json`.

---

## Desarrollo

1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

2. La aplicación estará disponible en `http://localhost:3000`

3. Para desarrollo con hot-reload:
- Los cambios en los archivos se reflejarán automáticamente
- El linter verificará el código en tiempo real
- Los errores se mostrarán en la consola y en el navegador

---

## Despliegue

### Construcción para producción
```bash
npm run build
```

### Iniciar en producción
```bash
npm run start
```

### Despliegue en Vercel
1. Conectar el repositorio con Vercel
2. Configurar las variables de entorno
3. Desplegar automáticamente desde la rama principal

---

## 🛠️ Tecnologías principales

- **Framework**: Next.js 15.2.4
- **UI**: Tailwind CSS + shadcn/ui
- **Estado**: React Context
- **Formularios**: React Hook Form + Zod
- **Notificaciones**: react-hot-toast
- **Gráficos**: Recharts
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

---

## 🔧 Solución de problemas

### Problemas comunes

1. **Error de compilación**: Verificar versiones de Node.js y dependencias
2. **Problemas de estilo**: Limpiar caché de Tailwind
3. **Errores de TypeScript**: Ejecutar `npm run lint` para verificar tipos

### Comandos útiles

```bash
# Limpiar caché
npm run clean

# Verificar tipos
npm run type-check

# Actualizar dependencias
npm update
```

---

## 👨‍💻 Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Autores

**By:** [Elder Sarmiento](https://www.linkedin.com/in/elder-sarmiento/)

---

¡Gracias por usar nuestra aplicación! 😊
