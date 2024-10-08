const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('image_nyaibotori')
	.setDescription('A portrait of me! ≧◡≦')
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const pics =
		[
			"https://www.samsterbirdies.com/images/nyaibotori/1.webp",
			"https://www.samsterbirdies.com/images/nyaibotori/2.webp",
			"https://www.samsterbirdies.com/images/nyaibotori/3.webp",
			"https://www.samsterbirdies.com/images/nyaibotori/4.webp",
			"https://www.samsterbirdies.com/images/nyaibotori/5.webp",
			"https://www.samsterbirdies.com/images/nyaibotori/6.webp",
			"https://www.samsterbirdies.com/images/nyaibotori/7.webp",
		];
		const replies =
		[
			"Look its me! :blush:",
			"Am I cute? :smiling_face_with_3_hearts:",
			"Oh who's this cutie? :smiley_cat:",
			"Hehehe :grin:",
		];
		const selected_pic = pics[Math.floor(Math.random() * pics.length)];
		const final_text = replies[Math.floor(Math.random() * replies.length)];
		//embed builder
		const pic_embed = new EmbedBuilder()
			.setColor(0xFFB4E1)
			.setDescription(final_text)
			.setImage(selected_pic)
		await interaction.reply({ embeds: [pic_embed] });
	},
};
