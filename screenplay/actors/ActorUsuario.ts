import { actorCalled } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';

export const Usuario = actorCalled('Usuario del sistema').whoCan(
  CallAnApi.at('https://apiv2-test.coordinadora.com/guias/cm-guias-ms')
);