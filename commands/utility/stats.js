const { SlashCommandBuilder } = require('discord.js');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var command = new SlashCommandBuilder()
	.setName('stats')
	.setDescription('Prints bot statistics. Mostly for debugging.')

command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];

fetchtype = 'fastfetch'; //select the one you want to use

fetchtypes = {
	neofetch: `neofetch --color_blocks --off|sed 's/\x1B\[[0-9;\?]*[a-zA-Z]//g'`,
	fastfetch: `fastfetch --logo none | sed 's/\x1B\[[0-9;\?]*[a-zA-Z]//g'`,
	screenfetch: `screenfetch -L -n | sed 's/\x1B\[[0-9;\?]*[a-zA-Z]//g'`,
};


module.exports = {
	data: command,
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		
		//gather terminal
		var { stdout, stderr0 } = await exec('ps -C node');
		const ps_stat = stdout;
		
		var { stdout, stderr1 } = await exec(fetchtypes[fetchtype]);
		const fetch = String(stdout);
		//console.log(ps_stat);
		//console.log(neofetch);
		//output message
		var message = "";
		message += `**Last bot restart:\n**${start_date}\n`;
		//message += `**Errors since restart:** ${err_count}\n`;
		message += `**ps -C node**\n\`\`\`${ps_stat}\`\`\`\n`;
		message += `**${fetchtype}**\n\`\`\`${fetch}\`\`\`\n`;
		await interaction.editReply({ content: message,
		ephemeral: false });
	},
};
