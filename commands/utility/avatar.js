const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');

var command = new ContextMenuCommandBuilder()
	.setName('avatar')
	.setType(ApplicationCommandType.User);
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];

module.exports = {
	data: command,
	async execute(interaction) {
		//constants
		const user = interaction.targetUser;
		const nyaibotori_id = '785347668683128833';
		const myself_id = '349983164644458496';
		const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=4096`;
		
		//replies
		let final_text = "";
		const replies =
		[
			`Caught in 4K! :camera_with_flash:`,
			`What even is this?`,
			`You might wanna change this...`,
			`Feeling photogenic today?`,
		];
		if (user.id == nyaibotori_id) {
			final_text += "Who's this cutie? Oh its me!";
		} else if (user.id == myself_id) {
			final_text += "It's my birb! I won't ever eat him.";
		} else {
			final_text += user.toString() + " " + replies[Math.floor(Math.random() * replies.length)];
		}
		//embed builder
		const avatar_embed = new EmbedBuilder()
			.setColor(0x78FF78)
			.setDescription(final_text)
			.setImage(avatar)
		//send
		await interaction.reply({ embeds: [avatar_embed] });
	},
};
