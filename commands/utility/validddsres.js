const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('bc_valid_dimensions')
	.setDescription('valid BC (dds) image dimensions (use /help for more info)')
	.addNumberOption(option =>
		option.setName('mipmap_levels')
			.setDescription('mipmap level. example: 4')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('width')
			.setDescription('width. example: 300')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('height')
			.setDescription('height. example: 300')
			.setRequired(true))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		//gather input
		const m_level = interaction.options.getNumber('mipmap_level');
		const w_source = interaction.options.getNumber('width');
		const h_source = interaction.options.getNumber('height');
		
		const w_divided = w_source / (2 ** m_level);
		const h_divided = h_source / (2 ** m_level);
		let w_divided_l = Math.floor(w_divided);
		let w_divided_h = Math.ceil(w_divided); 
		let h_divided_l = Math.floor(h_divided);
		let h_divided_h = Math.ceil(h_divided);
		w_divided_l = Math.floor(w_divided_l / 4) * 4;
		w_divided_h = Math.ceil(w_divided_h / 4) * 4;
		h_divided_l = Math.floor(h_divided_l / 4) * 4;
		h_divided_h = Math.ceil(h_divided_h / 4) * 4;
		w_divided_l *= 2 ** m_level;
		w_divided_h *= 2 ** m_level;
		h_divided_l *= 2 ** m_level;
		h_divided_h *= 2 ** m_level;
		let final_text = `Valid BC dimensions closest to ${w_source}x${h_source} that can support ${m_level} mipmap levels:\n`;
		if (w_divided >= 4 || h_divided >= 4){
			final_text += "Lower: " + w_divided_l + " x " + h_divided_l;
		} else {
			final_text += "Lower: N/A (image not large enough).";
		}
		final_text += "\nHigher: " + w_divided_h + " x " + h_divided_h;
		//output message
		await interaction.reply({ content: 
		final_text
		, ephemeral: false });
	},
};
