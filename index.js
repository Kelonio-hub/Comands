require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const comandos = require('./comandos.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`¡Bot encendido y conectado como ${readyClient.user.tag}!`);
    console.log(`Listo para responder a ${Object.keys(comandos).length} comandos distintos.`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    // Busca si el comando escrito existe en nuestro JSON
    if (comandos[commandName]) {
        await interaction.reply({
            content: `Aquí tienes la información que solicitaste: \n🔗 ${comandos[commandName]}`,
            // Opcional: ephemeral: true // Si quieres que el enlace solo lo vea quien lo pidió
        });
    } else {
        await interaction.reply({ content: 'Lo siento, no encontré la guía para ese comando.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);

const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Online');
}).listen(process.env.PORT || 3000, () => {
    console.log('Servidor web falso listo para Render.');
});