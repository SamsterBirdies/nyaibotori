const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('image_nyaibotori')
	.setDescription('A portrait of me! ≧◡≦')
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const pic_count = 17
		const replies =
		[
			"Look its me! :blush:",
			"Am I cute? :smiling_face_with_3_hearts:",
			"Oh who's this cutie? :smiley_cat:",
			"Hehehe :grin:",
		];
		const selected_pic = `https://www.samsterbirdies.com/images/nyaibotori/${Math.floor(Math.random() * pic_count) + 1}.webp`;
		const final_text = replies[Math.floor(Math.random() * replies.length)];
		//embed builder
		const pic_embed = new EmbedBuilder()
			.setColor(0xFFB4E1)
			.setDescription(final_text)
			.setImage(selected_pic)
		await interaction.reply({ embeds: [pic_embed] });
	},
};
