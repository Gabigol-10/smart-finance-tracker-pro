# 💰 Smart Finance Tracker Pro

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

Una aplicación fintech profesional para gestión financiera personal con diseño moderno y experiencia de usuario premium.

[Ver Proyecto](https://github.com/Gabigol-10/smart-finance-tracker-pro) · [Reportar Bug](https://github.com/Gabigol-10/smart-finance-tracker-pro/issues) · [Solicitar Feature](https://github.com/Gabigol-10/smart-finance-tracker-pro/issues)

</div>

---

## ✨ Características Principales

### 📊 Dashboard Ejecutivo
- **KPIs en Tiempo Real**: Balance total, ingresos, gastos y tasa de ahorro
- **Gráficos Interactivos**: Visualización de flujo de efectivo con Chart.js
- **Análisis de Distribución**: Gráficos de torta para categorías de gastos
- **Transacciones Recientes**: Vista rápida de últimas operaciones

### 💵 Gestión de Finanzas
- **Control de Ingresos**: Registro y seguimiento de todas las fuentes de ingreso
- **Gestión de Gastos**: Categorización inteligente de gastos
- **Metas de Ahorro**: Sistema de objetivos con seguimiento de progreso
- **Calendario Financiero**: Vista temporal de transacciones

### 📈 Análisis Avanzado
- **Panel de Analíticas**: Insights automáticos sobre patrones financieros
- **Reportes Exportables**: Generación de PDFs y Excel
- **Comparativas Mensuales**: Tendencias y proyecciones
- **Alertas Inteligentes**: Notificaciones de gastos elevados

### 🎨 Diseño Premium
- **Glassmorphism**: Efectos de vidrio esmerilado modernos
- **Tema Oscuro/Claro**: Sistema de temas con transiciones suaves
- **Animaciones Fluidas**: Framer Motion para microinteracciones
- **Diseño Responsivo**: Adaptado a todos los dispositivos
- **UI/UX Profesional**: Inspirado en Revolut, Nubank y Stripe

---

## 🚀 Tecnologías

### Frontend
- **React 19** - Framework principal
- **React Router DOM** - Navegación SPA
- **Framer Motion** - Animaciones y transiciones
- **Bootstrap 5** - Sistema de grillas y utilidades

### Visualización de Datos
- **Chart.js** - Gráficos principales
- **React Chart.js 2** - Integración con React
- **Recharts** - Gráficos adicionales

### Íconos y UI
- **React Icons** - Biblioteca de íconos
- **SweetAlert 2** - Alertas y modales elegantes

### Utilidades
- **jsPDF** - Generación de reportes PDF
- **jsPDF AutoTable** - Tablas en PDF
- **XLSX** - Exportación a Excel

### DevTools
- **Vite** - Build tool y dev server
- **ESLint** - Linting y calidad de código

---

## 📦 Instalación

### Prerrequisitos
- Node.js >= 18.x
- npm >= 9.x o yarn >= 1.22.x

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/Gabigol-10/smart-finance-tracker-pro.git

# Navegar al directorio
cd smart-finance-tracker-pro

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 🎯 Estructura del Proyecto

```
smart-finance-tracker/
├── src/
│   ├── components/
│   │   ├── premium/           # Componentes premium renovados
│   │   │   ├── PremiumSidebar.jsx
│   │   │   ├── PremiumNavbar.jsx
│   │   │   └── PremiumDashboard.jsx
│   │   ├── ui/                # Sistema de componentes reutilizables
│   │   │   ├── Card.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProgressBar.jsx
│   │   └── ...                # Otros componentes
│   ├── context/
│   │   └── FinanceContext.jsx # Estado global
│   ├── pages/
│   │   ├── ProfilePage.jsx    # Página de perfil
│   │   ├── SettingsPage.jsx   # Configuración
│   │   └── NotFoundPage.jsx   # 404 personalizado
│   ├── styles/
│   │   ├── theme.css          # Variables de tema
│   │   ├── components.css     # Estilos de componentes
│   │   └── layout.css         # Sistema de layout
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

#### Modo Claro
- **Background**: `#F8FAFC`
- **Primary**: `#2563EB`
- **Success**: `#10B981`
- **Danger**: `#EF4444`

#### Modo Oscuro
- **Background**: `#0F172A`
- **Cards**: `#1E293B`
- **Primary**: `#3B82F6`
- **Text**: `#F8FAFC`

### Tipografía
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

---

## 🌟 Características Destacadas

### 1. KPI Cards Animados
```jsx
<KPICard
  icon={<FiDollarSign />}
  label="Balance Total"
  value="$15,234"
  change="+12.5%"
  changeType="positive"
/>
```

### 2. Glassmorphism Effects
- Fondos translúcidos con blur
- Bordes sutiles
- Sombras profesionales

### 3. Microinteracciones
- Hover effects
- Loading states
- Transiciones suaves
- Animaciones de entrada

### 4. Skeleton Loading
- Estados de carga elegantes
- Mejora UX percibida
- Shimmer effects

---

## 📱 Responsive Design

- **Desktop**: 1920px - Experiencia completa
- **Laptop**: 1366px - Layout optimizado
- **Tablet**: 768px - Sidebar colapsable
- **Mobile**: 375px - Stack vertical

---

## 🔧 Configuración

### Variables de Entorno (Opcional)
```env
VITE_APP_TITLE=Smart Finance Tracker Pro
VITE_API_URL=http://localhost:3000/api
```

### Personalización de Tema
Edita `src/styles/theme.css` para ajustar:
- Colores primarios
- Espaciado
- Sombras
- Transiciones

---

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Test con cobertura
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 📈 Roadmap

- [x] Dashboard Premium con KPIs
- [x] Sistema de temas Dark/Light
- [x] Páginas de Profile y Settings
- [x] Animaciones con Framer Motion
- [ ] Autenticación con JWT
- [ ] Backend API con Node.js
- [ ] Base de datos PostgreSQL
- [ ] Integración con bancos (Plaid API)
- [ ] App móvil con React Native
- [ ] Machine Learning para insights

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

## 👨‍💻 Autor

**Gabigol-10**
- GitHub: [@Gabigol-10](https://github.com/Gabigol-10)
- Proyecto: [Smart Finance Tracker Pro](https://github.com/Gabigol-10/smart-finance-tracker-pro)

---

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Diseño inspirado en: Revolut, Nubank, Stripe, Linear, Vercel

---

<div align="center">

### ⭐ Si este proyecto te fue útil, considera darle una estrella!

Made with ❤️ and ☕

</div>
