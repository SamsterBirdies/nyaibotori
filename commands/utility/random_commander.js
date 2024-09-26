const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('random_commander')
	.setDescription('Replies with a random Forts commander.')
	.addBooleanOption(option =>
		option.setName('ephemeral')
		.setDescription('Whether or not the echo should be ephemeral'))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const visible = interaction.options.getBoolean('ephemeral') ?? 'true';
		const commanders =
		[
			'ScatterShot','Seep','Shockenaugh',
			'Buster','Moonshine','Phantom',
			'Firebird','Warthog','Eagle Eye',
			'Hurricane','Overdrive','Architect',
			'Pinchfist','Spook','Armourdillo'
		];
		
		await interaction.reply({ content: commanders[Math.floor(Math.random() * commanders.length)], ephemeral: visible });
	},
};
