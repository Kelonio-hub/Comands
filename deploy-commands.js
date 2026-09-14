require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const comandos = require('./comandos.json');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
    throw new Error('Faltan TOKEN, CLIENT_ID o GUILD_ID en las variables de entorno/Secrets de GitHub.');
}

const commands = Object.keys(comandos).map(nombre =>
    new SlashCommandBuilder()
        .setName(nombre.toLowerCase())
        .setDescription(`Obtén el enlace para la guía/recurso de ${nombre}`.slice(0, 100))
        .toJSON()
);

if (commands.length > 100) {
    throw new Error(`Discord permite un máximo de 100 comandos slash por servidor. Hay ${commands.length}.`);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos en el servidor ${guildId}...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`✅ ${data.length} comandos registrados correctamente.`);
        console.log('Comandos:', data.map(command => `/${command.name}`).join(', '));
    } catch (error) {
        console.error('❌ Error registrando comandos:', error);
        process.exitCode = 1;
    }
})();
