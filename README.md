# Proyecto de Automatización Guía RCE

## Requisitos

- Node.js >= 18
- NPM

## Instalación

```bash
npm install
```

## Ejecutar pruebas

```bash
npx playwright test
```

## Ver reporte

```bash
npx playwright show-report
```

## CI/CD con GitHub Actions

Este proyecto incluye configuración de CI/CD automático:

### 🚀 **Workflows configurados:**

1. **Playwright Tests**: Ejecuta automáticamente las pruebas en:
   - Ubuntu (Linux)
   - Windows
   - Se activa en push a `main`/`develop` y pull requests

2. **Allure Report**: Genera y publica reportes automáticamente en GitHub Pages

### 📊 **Ver resultados:**
- **GitHub Actions**: Ve el estado de las pruebas en la pestaña "Actions"
- **Reportes**: Los reportes de Allure se publican automáticamente en GitHub Pages
- **Artifacts**: Descarga reportes detallados desde la pestaña "Actions"

### 🔧 **Configuración:**
- Los workflows están en `.github/workflows/`
- Se ejecutan automáticamente en cada push
- Incluyen cache de dependencias para mayor velocidad

## Estructura

- `/screenplay`: lógica de actores, tareas, y datos
- `/tests`: contiene los specs de pruebas automatizadas
- `.github/workflows/`: configuración de CI/CD