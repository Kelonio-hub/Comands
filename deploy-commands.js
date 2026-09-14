require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const comandos = require('./comandos.json');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
  throw new Error(
    'Faltan TOKEN o CLIENT_ID. En GitHub deben existir como Repository secrets con esos nombres exactos.'
  );
}

// Discord exige nombres de slash commands en minúsculas.
// Normalizamos también por seguridad para evitar que una mayúscula rompa el despliegue.
const commands = Object.entries(comandos).map(([nombre]) => {
  const commandName = nombre.toLowerCase();
  if (!/^[a-z0-9_-]{1,32}$/.test(commandName)) {
    throw new Error(`Nombre de comando no válido para Discord: ${nombre}`);
  }

  return new SlashCommandBuilder()
    .setName(commandName)
    .setDescription(`Obtén el enlace para la guía/recurso de ${commandName}`)
    .toJSON();
});

if (commands.length > 100) {
  throw new Error(`Hay ${commands.length} comandos. Discord permite un máximo de 100 comandos slash.`);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Registrando ${commands.length} comandos slash en Discord...`);

    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log(`✅ ${data.length} comandos registrados correctamente.`);
    console.log('Comandos disponibles:', data.map(command => `/${command.name}`).join(', '));
  } catch (error) {
    console.error('❌ Error registrando los comandos:', error);
    process.exitCode = 1;
  }
})();
