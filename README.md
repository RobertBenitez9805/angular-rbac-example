# RBAC en Angular

Incluye módulo de autenticación en Angular.

## Uso
Copiar la carpeta auth a su proyecto, en app.module.ts añadir AuthModule a imports y authTokeninterceptorProvider a los providers

... y listo!!

## Protegiendo las rutas
Utiliza la directiva *showForRoles("['YOU', 'ROLES']")

Utiliza los guardias canActivate, canLoad para asegurar las rutas.
