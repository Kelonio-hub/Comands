# Configuración de comandos de Discord desde GitHub

Este repositorio registra automáticamente los comandos slash al hacer `push` en la rama `main`.

## Secrets necesarios en GitHub

En **Settings → Secrets and variables → Actions** crea estos tres secretos:

- `DISCORD_TOKEN` → token del bot.
- `DISCORD_CLIENT_ID` → Application ID de la aplicación de Discord.
- `DISCORD_GUILD_ID` → ID del servidor de Discord donde quieres que aparezcan inmediatamente los comandos.

Después de guardar los tres secretos, cualquier cambio en `comandos.json` y posterior `push` a `main` ejecutará el registro automáticamente.

También se puede ejecutar manualmente desde **Actions → Registrar comandos de Discord → Run workflow**.

## Comandos incluidos

Se normalizan a minúsculas automáticamente, por lo que `Ronin` pasa a ser `/ronin`.

Actualmente se incluyen `broken`, `ronin` y `speculum`, entre los 91 comandos del archivo.
