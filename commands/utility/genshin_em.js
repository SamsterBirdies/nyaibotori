const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('genshin_em')
	.setDescription('Elemental Mastery damage bonus calculator.')
	.addIntegerOption(option =>
		option.setName('em')
			.setDescription('Amount of EM')
			.setRequired(true))

command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
function Round2(num){
	return Math.round(num * 100) / 100;
}
module.exports = {
	data: command,
	async execute(interaction) {
		//gather input
		const em = interaction.options.getInteger('em');
		
		const type1 = 2.78 * (em / (em + 1400)) * 100;
		const type2 = 16 * (em / (em + 2000)) * 100;
		const type3 = 5 * (em / (em + 1200)) * 100;
		const type4 = 4.44 * (em / (em + 1400)) * 100;
		//output message
		await interaction.reply( { content:
		`**__With ${em} Elemental Mastery:__**\n` +
		`* **${ Round2(type1)}%** increase to vaporize and melt.\n`+
		`* **${ Round2(type2)}%** increase to overload, superconduct, electro-charged, burning, shattered, swirl, bloom, hyperbloom, and burgeon.\n`+
		`* **${ Round2(type3)}%** increase to aggravate and spread.\n`+
		`* **${ Round2(type4)}%** increased damage absorption of shields created by crystallize.\n`
		});
	},
};
