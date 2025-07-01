import { Task } from '@serenity-js/core';
import { PostRequest, Send } from '@serenity-js/rest';
import { Usuario } from '../actors/ActorUsuario';

export class CrearGuia {
  static conDatos = (datos: object) =>
    Task.where(`#actor crea una guía`,
      Send.a(PostRequest.to('/guia').with(datos))
    );
}