# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Smart Finance Tracker Pro! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Guía de Estilo](#guía-de-estilo)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)

## 🤝 Código de Conducta

Este proyecto adhiere al código de conducta [Contributor Covenant](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código.

## 💡 ¿Cómo Puedo Contribuir?

### Reportar Bugs

Los bugs son rastreados como [GitHub issues](https://github.com/Gabigol-10/smart-finance-tracker-pro/issues). Antes de crear un reporte:

1. Verifica que el bug no haya sido reportado antes
2. Asegúrate de usar la última versión
3. Recopila información sobre el problema

**Incluye en tu reporte:**
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Capturas de pantalla (si aplica)
- Información del entorno (navegador, OS, etc.)

### Sugerir Mejoras

Las sugerencias de mejoras también usan GitHub issues. Cuando sugieras una mejora:

1. Usa un título claro y descriptivo
2. Proporciona una descripción paso a paso de la mejora sugerida
3. Explica por qué esta mejora sería útil
4. Adjunta mockups o ejemplos si es posible

### Tu Primera Contribución de Código

¿No sabes por dónde empezar? Busca issues etiquetados como:
- `good-first-issue` - issues que deberían requerir solo unas pocas líneas de código
- `help-wanted` - issues que requieren un poco más de experiencia

## 🔧 Proceso de Desarrollo

### 1. Fork y Clona

```bash
# Fork el repo en GitHub, luego:
git clone https://github.com/tu-usuario/smart-finance-tracker-pro.git
cd smart-finance-tracker-pro
```

### 2. Configura el Entorno

```bash
# Instala dependencias
npm install

# Crea una rama para tu feature
git checkout -b feature/nombre-descriptivo
```

### 3. Desarrolla

- Escribe código limpio y mantenible
- Sigue las guías de estilo del proyecto
- Agrega comentarios donde sea necesario
- Asegúrate de que el código funcione

### 4. Testing

```bash
# Ejecuta el linter
npm run lint

# Prueba tu código
npm run dev
```

### 5. Commit

```bash
# Agrega tus cambios
git add .

# Commit con mensaje descriptivo
git commit -m "Add: nueva característica X"
```

### 6. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Abre un Pull Request en GitHub
```

## 🎨 Guía de Estilo

### JavaScript/React

- Usa componentes funcionales con hooks
- Prefiere arrow functions
- Usa destructuring cuando sea posible
- Mantén componentes pequeños y enfocados
- Usa PropTypes o TypeScript para type checking

**Ejemplo:**

```jsx
import React from 'react';

const MyComponent = ({ title, onClick }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default MyComponent;
```

### CSS

- Usa variables CSS para temas
- Prefiere clases sobre estilos inline
- Usa nombres de clases descriptivos
- Sigue la convención BEM cuando sea apropiado

**Ejemplo:**

```css
.card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.card__header {
  margin-bottom: var(--space-md);
}

.card__title {
  font-size: 1.5rem;
  font-weight: 600;
}
```

### Estructura de Archivos

```
src/
├── components/
│   ├── ui/              # Componentes reutilizables
│   ├── premium/         # Componentes específicos
│   └── ...
├── pages/               # Componentes de página
├── context/             # Context providers
├── utils/               # Funciones utilitarias
├── styles/              # Estilos globales
└── hooks/               # Custom hooks
```

## 📝 Commit Messages

Usa mensajes de commit claros y descriptivos siguiendo este formato:

```
<tipo>: <descripción corta>

<descripción larga opcional>

<footer opcional>
```

**Tipos:**
- `Add`: Nueva característica
- `Fix`: Corrección de bug
- `Update`: Actualización de característica existente
- `Remove`: Eliminación de código/característica
- `Refactor`: Refactorización de código
- `Style`: Cambios de formato (espacios, etc.)
- `Docs`: Cambios en documentación
- `Test`: Agregar o modificar tests
- `Chore`: Cambios en build process, dependencias, etc.

**Ejemplos:**

```bash
Add: implementar sistema de notificaciones

Fix: corregir cálculo de balance en dashboard

Update: mejorar diseño de tarjetas KPI

Docs: actualizar README con instrucciones de instalación
```

## 🔄 Pull Requests

### Antes de Enviar

- [ ] El código sigue las guías de estilo del proyecto
- [ ] Has realizado una revisión de tu propio código
- [ ] Has comentado el código, particularmente en áreas complejas
- [ ] Has actualizado la documentación si es necesario
- [ ] Tus cambios no generan nuevos warnings
- [ ] Has verificado que funciona en diferentes navegadores

### Template de Pull Request

```markdown
## Descripción
Descripción clara de los cambios

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva característica
- [ ] Breaking change
- [ ] Actualización de documentación

## ¿Cómo se ha probado?
Describe las pruebas que realizaste

## Checklist
- [ ] Mi código sigue las guías de estilo
- [ ] He revisado mi propio código
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] No genera nuevos warnings

## Capturas de Pantalla
Si aplica, agrega capturas de pantalla
```

## 🎯 Áreas Prioritarias

Actualmente buscamos contribuciones en:

1. **Testing**: Implementar tests unitarios y de integración
2. **Accesibilidad**: Mejorar a11y en todos los componentes
3. **Performance**: Optimizaciones de rendimiento
4. **Internacionalización**: Soporte multi-idioma
5. **Documentación**: Mejorar y expandir la documentación

## ❓ Preguntas

Si tienes preguntas, puedes:
- Abrir un issue con la etiqueta `question`
- Contactar a los mantenedores
- Unirte a nuestro canal de Discord

## 🙏 Reconocimientos

Todos los contribuidores serán agregados al archivo [CONTRIBUTORS.md](CONTRIBUTORS.md)

---

¡Gracias por contribuir a Smart Finance Tracker Pro! 🎉
