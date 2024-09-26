const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};
