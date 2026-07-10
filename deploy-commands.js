require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const comandos = require('./comandos.json');
const MAX_COMMANDS = 100;

// Convertimos el JSON en un formato que Discord entienda
const entries = Object.entries(comandos);
const commands = [];

for (const [nombre] of entries.slice(0, MAX_COMMANDS)) {
    commands.push(
        new SlashCommandBuilder()
            .setName(nombre)
            .setDescription(`Obtén el enlace para la guía/recurso de ${nombre}`)
            .toJSON()
    );
}

if (entries.length > MAX_COMMANDS) {
    console.warn(`Se encontraron ${entries.length} comandos en comandos.json, pero Discord solo permite ${MAX_COMMANDS}. Se registrarán solo los primeros ${MAX_COMMANDS}.`);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Iniciando actualización de ${commands.length} comandos (/) de la aplicación.`);

        // Subimos todos los comandos a Discord de golpe
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`¡Éxito! Se han recargado ${data.length} comandos correctamente.`);
    } catch (error) {
        console.error(error);
    }
})();