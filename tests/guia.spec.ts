import { test, expect } from '@playwright/test';
import datosValidos from '../screenplay/data/guia_valida.json';

test('TC01 - Crear una guía con datos completamente válidos.', async ({ page }) => {
  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datosValidos });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  expect(response.status(), `Detalle del error: ${responseText}`).toBe(200);

  if (response.status() === 200) {
    const body = JSON.parse(responseText);
    expect(body.data).toHaveProperty('codigo_remision');
  }
});

test('TC02 - Crear una guía con valorRecaudar igual a 1.', async ({ page }) => {
 
  const datos = { ...datosValidos, valorRecaudar: "1" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

 
  expect(response.status(), `Detalle del error: ${responseText}`).toBe(200);

  if (response.status() === 200) {
    const body = JSON.parse(responseText);
    expect(body.data).toHaveProperty('codigo_remision');
  }
});

test('TC03 - Crear una guía con valorRecaudar igual a 16000000.', async ({ page }) => {
 
  const datos = { ...datosValidos, valorRecaudar: "16000000" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  
  expect(response.status(), `Detalle del error: ${responseText}`).toBe(200);

  if (response.status() === 200) {
    const body = JSON.parse(responseText);
    expect(body.data).toHaveProperty('codigo_remision');
  }
});

test('TC04 - BUG: Crear una guía con valorRecaudar igual a 0 (debería ser rechazado).', async ({ page }) => {
 
  const datos = { ...datosValidos, valorRecaudar: "0" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  // BUG: La API debería rechazar valorRecaudar = 0, pero lo acepta
  // TODO: Reportar bug - falta validación de límite mínimo
  expect(response.status(), `BUG: La API acepta valorRecaudar = 0 cuando debería rechazarlo`).toBe(400);
  expect(responseText).toContain('El campo valorRecaudar no puede ser 0');

});

test('TC05 - BUG: Crear una guía con valorRecaudar mayor al máximo (debería ser rechazado).', async ({ page }) => {
 
  const datos = { ...datosValidos, valorRecaudar: "16000001" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  // BUG: La API debería rechazar valorRecaudar > 16000000, pero lo acepta
  // TODO: Reportar bug - falta validación de límite máximo
  expect(response.status(), `BUG: La API acepta valorRecaudar > 16000000 cuando debería rechazarlo`).toBe(400);
  expect(responseText).toContain('El campo valorRecaudar no puede ser mayor a 15999999');

});

test('TC06 - Error por referencia de recaudo vacía', async ({ page }) => {

  const datos = { ...datosValidos, referenciaRecaudo: "" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  // Esperamos un error (por ejemplo, 400)
  expect(response.status(), `Detalle del error: ${responseText}`).toBe(400);
  expect(responseText).toContain('El campo referenciaRecaudo no puede estar vacío'); // Ajusta según el mensaje real del backend
});

test('TC07 - Crear una guía sin valorRecaudar', async ({ page }) => {

  const datos = { ...datosValidos, valorRecaudar: "" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  expect(response.status(), `Detalle del error: ${responseText}`).toBe(400);
  expect(responseText).toContain('El campo valorRecaudar debe ser un número');

});

test('TC08 - Crear una guía con caracteres especiales seguros en referenciaRecaudo', async ({ page }) => {

  const datos = { ...datosValidos, referenciaRecaudo: "!@#$%^&*()_+" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  expect(response.status(), `Detalle del error: ${responseText}`).toBe(200);

  if (response.status() === 200) {
    const body = JSON.parse(responseText);
    expect(body.data).toHaveProperty('codigo_remision');
  }
});

test('TC09 - BUG: Crear una guía con caracteres peligrosos (debería ser rechazado).', async ({ page }) => {
  const datos = { ...datosValidos, referenciaRecaudo: "<script>alert('XSS');</script>" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  // BUG: La API debería rechazar caracteres peligrosos, pero los acepta
  // TODO: Reportar bug - falta validación de seguridad XSS
  expect(response.status(), `BUG: La API acepta caracteres peligrosos cuando debería rechazarlos`).toBe(400);
  expect(responseText).toContain('El campo referenciaRecaudo no puede contener caracteres maliciosos');

}); 

test('TC10 - Crear una guía sin el campo observaciones', async ({ page }) => {

  const datos = { ...datosValidos, observaciones: "" };

  const response = await page.request.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
    data: datos
  });

  const responseText = await response.text();
  console.log('Status:', response.status());
  console.log('Response Body:', responseText);

  expect(response.status(), `Detalle del error: ${responseText}`).toBe(200);

  if (response.status() === 200) {
    const body = JSON.parse(responseText);
    expect(body.data).toHaveProperty('codigo_remision');
  }

});


