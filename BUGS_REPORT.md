# 🐛 Reporte de Bugs - API Guías Coordinadora

## Resumen
Se han identificado **3 bugs críticos** en la API de creación de guías que requieren atención inmediata.

---

## 🔴 BUG #1: Falta de validación de límite mínimo en valorRecaudar

### **Descripción**
La API acepta `valorRecaudar: "0"` cuando debería rechazarlo con un error 400.

### **Pasos para reproducir**
1. Enviar petición POST a `/guia`
2. Incluir `valorRecaudar: "0"`
3. La API responde con 200 (éxito) en lugar de 400 (error)

### **Comportamiento esperado**
- **Status**: 400 Bad Request
- **Mensaje**: "El campo valorRecaudar no puede ser 0"

### **Comportamiento actual**
- **Status**: 200 OK
- **Respuesta**: Guía creada exitosamente

### **Impacto**
- Posibles problemas de negocio
- Lógica de validación inconsistente

---

## 🔴 BUG #2: Falta de validación de límite máximo en valorRecaudar

### **Descripción**
La API acepta `valorRecaudar: "16000001"` cuando debería rechazarlo con un error 400.

### **Pasos para reproducir**
1. Enviar petición POST a `/guia`
2. Incluir `valorRecaudar: "16000001"`
3. La API responde con 200 (éxito) en lugar de 400 (error)

### **Comportamiento esperado**
- **Status**: 400 Bad Request
- **Mensaje**: "El campo valorRecaudar no puede ser mayor a 15999999"

### **Comportamiento actual**
- **Status**: 200 OK
- **Respuesta**: Guía creada exitosamente

### **Impacto**
- Posibles problemas de negocio
- Lógica de validación inconsistente

---

## 🔴 BUG #3: Falta de validación de seguridad XSS

### **Descripción**
La API acepta caracteres peligrosos como `<script>alert('XSS');</script>` en el campo `referenciaRecaudo`.

### **Pasos para reproducir**
1. Enviar petición POST a `/guia`
2. Incluir `referenciaRecaudo: "<script>alert('XSS');</script>"`
3. La API responde con 200 (éxito) en lugar de 400 (error)

### **Comportamiento esperado**
- **Status**: 400 Bad Request
- **Mensaje**: "El campo referenciaRecaudo no puede contener caracteres maliciosos"

### **Comportamiento actual**
- **Status**: 200 OK (o timeout)
- **Respuesta**: Guía creada exitosamente

### **Impacto**
- **Vulnerabilidad de seguridad XSS**
- Posible inyección de scripts maliciosos
- Riesgo de seguridad crítico

---

## 📋 Información adicional

### **Ambiente de prueba**
- **URL**: `https://apiv2-test.coordinadora.com/guias/cm-guias-ms`
- **Método**: POST
- **Endpoint**: `/guia`

### **Casos de prueba afectados**
- TC04: Validación de límite mínimo
- TC05: Validación de límite máximo  
- TC09: Validación de seguridad XSS

### **Prioridad**
- **BUG #3**: CRÍTICA (seguridad)
- **BUG #1 y #2**: ALTA (lógica de negocio)

---

## 🚀 Recomendaciones

1. **Implementar validaciones de límites** en el backend
2. **Agregar filtros de seguridad** para prevenir XSS
3. **Actualizar documentación** de la API
4. **Revisar otros endpoints** en busca de vulnerabilidades similares

---

*Reporte generado automáticamente por las pruebas de automatización* 