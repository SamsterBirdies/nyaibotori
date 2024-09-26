const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('1v1')
	.setDescription('PvP someone!')
	.addStringOption(option =>
		option.setName('p1')
			.setDescription('gamer 1')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('p2')
			.setDescription('gamer 2')
			.setRequired(true))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const p1 = interaction.options.getString('p1');
		const p2 = interaction.options.getString('p2');
		let winner = p1;
		let loser = p2;
		if (Math.random() > 0.5) 
		{ 
			winner = p2;
			loser = p1;
		};
		const death_messages =
		[
			loser + ' was blown up by ' + winner,
			loser + ' was doomed to fall by ' + winner,
			loser + ' tried to swim in lava to escape ' + winner,
			loser + ' was fireballed by ' + winner,
			loser + ' was killed while trying to hurt ' + winner,
			loser + ' was impaled by ' + winner,
			loser + ' was shot by ' + winner,
			loser + ' was slain by ' + winner,
			loser + ' was burned to a crisp while fighting ' + winner,
			loser + ' hit the ground too hard while trying to escape ' + winner,
			loser + ' walked into a cactus while trying to escape ' + winner,
			loser + ' was killed by ' + winner + ' using magic',
		];
		await interaction.reply({ content: death_messages[Math.floor(Math.random() * death_messages.length)], ephemeral: false });
	},
};
