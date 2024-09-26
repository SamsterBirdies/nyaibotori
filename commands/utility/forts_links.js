const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('forts_links')
	.setDescription('Sends a helpful forts link.')
	.addStringOption(option =>
			option.setName('type')
				.setDescription('Pick a link')
				.setRequired(true)
				.addChoices(
					{ name: 'Modding Steam Guide', value: 'steam_modding' },
					{ name: 'HS Modding Steam Guide', value: 'steam_modding_hs' },
					{ name: 'Map Editor Steam Guide', value: 'steam_map' },
					{ name: 'Capture Points Steam Guide', value: 'steam_map_cp' },
					{ name: 'FMOD Steam Guide', value: 'steam_fmod' },
					{ name: 'Map Editor Video Guide', value: 'video_map' },
					{ name: 'FMOD Project Template', value: 'fmod_template' },
					{ name: 'Forts Scripting API Reference', value: 'modding_api' },
					{ name: 'Lua Tutorial Directory', value: 'lua' },
					{ name: 'Debug Magic', value: 'debug_magic' },
					{ name: 'Modding Video Guide', value: 'video_modding' },
					{ name: 'Pivot Calculator', value: 'pivot_calculator' },
					{ name: 'HUD Icon Generator', value: 'hud_icon' },
					{ name: 'Better Log', value: 'better_log' },
					{ name: 'SSEParams', value: 'sseparams' },
				))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const selection = interaction.options.getString('type');
		const links = new Map([
			['steam_modding',`https://steamcommunity.com/sharedfiles/filedetails/?id=1296612027`],
			['steam_modding_hs',`https://steamcommunity.com/sharedfiles/filedetails/?id=2790119314`],
			['steam_map',`https://steamcommunity.com/sharedfiles/filedetails/?id=870883350`],
			['steam_map_cp',`https://steamcommunity.com/sharedfiles/filedetails/?id=1776840476`],
			['steam_fmod',`https://steamcommunity.com/sharedfiles/filedetails/?id=2908458032`],
			['video_map',`https://youtu.be/OguUDDFpbdY?si=c9v7tz6Uh-wmU4-k`],
			['fmod_template',`https://discord.com/channels/304892363359256576/876359029625094184/1279945553857478777`],
			['modding_api',`https://www.earthworkgames.com/content/docs/FortsAPI.html`],
			['lua',`http://lua-users.org/wiki/TutorialDirectory`],
			['debug_magic',`https://discord.com/channels/304892363359256576/382043528877965315/1074399932624142406`],
			['video_modding',`https://youtu.be/cmF7Dykw4mA?si=kwDB4nA9F_DKpnNj`],
			['pivot_calculator',`https://www.samsterbirdies.com/tools/fortspivots \nAlternatively, use my command \`/forts_pivots\`!`],
			['hud_icon',`https://github.com/SamsterBirdies/forts-modding-tools/blob/main/make_HUD_icon/make_HUD_icon.py`],
			['better_log', `https://discord.com/channels/304892363359256576/382043528877965315/1031958772534493194`],
			['sseparams',`https://discord.com/channels/304892363359256576/382043528877965315/1210546852735352862`],
		]);
		const final_message = links.get(selection);
		await interaction.reply({ content: final_message, ephemeral: false });
	},
};
