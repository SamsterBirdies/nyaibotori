const { SlashCommandBuilder } = require('discord.js');
//const jsdom = require("jsdom");
//var request = require('request');

var command = new SlashCommandBuilder()
	.setName('forts_api')
	.setDescription('Display a function listed on the Forts API site.')
	.addStringOption(option =>
			option.setName('function')
				.setDescription('Pick a function')
				.setRequired(true)
	)
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const selection = interaction.options.getString('forts_api');
		
		await interaction.reply({ content: 'test', ephemeral: false });
	},
};
