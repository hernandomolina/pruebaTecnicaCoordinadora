# Proyecto de Automatización Guía RCE

## Descripción general

Este proyecto automatiza la validación de la API de creación de guías de Coordinadora utilizando Playwright y SerenityJS bajo el patrón Screenplay. Incluye pruebas automatizadas que cubren casos positivos, negativos y de seguridad, así como integración continua (CI) y generación de reportes profesionales con Allure. El objetivo es asegurar la calidad, robustez y seguridad del servicio de guías.

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

## Cómo ver el reporte Allure online

Cada vez que se ejecutan las pruebas en GitHub Actions, se genera y publica automáticamente un reporte Allure en GitHub Pages. Puedes acceder al reporte más reciente en:

```
https://https://hernandomolina.github.io/pruebaTecnicaCoordinadora/
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

## 🐛 Bugs Identificados

Durante las pruebas se han identificado **3 bugs críticos** en la API:

### **Bugs de Validación:**
- **TC04**: La API no valida el límite mínimo de `valorRecaudar`
- **TC05**: La API no valida el límite máximo de `valorRecaudar`

### **Bug de Seguridad:**
- **TC09**: La API no valida caracteres peligrosos (vulnerabilidad XSS)

### **Documentación:**
Ver `BUGS_REPORT.md` para detalles completos de cada bug.

> **Nota**: Las pruebas están configuradas para fallar intencionalmente hasta que se corrijan estos bugs.