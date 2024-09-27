const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('help')
	.setDescription("Provides additonal information about a command.")
	.addStringOption(option =>
		option.setName('command')
			.setDescription('Which command do you need help with?')
			.setAutocomplete(true)
			.setRequired(true)
		)

command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
const command_list =
[
	'1v1',
	'24',
	'base_num_convert',
	'forts_links',
	'forts_pivots',
	'genshin_character',
	'insult',
	'ping',
	'stats_resolution',
	'random_commander',
	'random_GI_character',
	'random_weapon',
	'solve24',
	'stats',
];

module.exports = {
	data: command,
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused();
		const choices = command_list;
		const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.toLowerCase()));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		const selected_command = interaction.options.getString('command');
		const command_map = new Map([
			['1v1', 
				"Duel someone! A random winner will be selected and a Minecraft death message will display.\n"+
				"**Example usage:** `/1v1 p1:Alex p2:Sam`"
			],
			['24',
				"Play the 24 game.\n"+
				"Optionally, you can use `digits:` to specify the amount of digits to use (Valid amounts: 4 through 24).\n"+
				"**Example usage:** `/24` or `/24 digits:8`"
			],
			['base_num_convert',
				"Converts a number from one base to another.\n"+
				"- Valid base number range is from 2 to 36.\n"+
				"- Accepts the following characters as input: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`\n"+
				"**Example usage:** `/base_num_convert number:128 base_in:10 base_out:16`"
			],
			['forts_links',
				"Links a helpful link. Good for modding advice or something idk.\n" +
				"**Example usage:** `/forts_links type:Modding Steam Guide`"
			],
			['forts_pivots',
				"Calculate Forts Pivots from image size and pixel coordinate to rotate on.\n" +
				"*This tool can also be found at https://www.samsterbirdies.com/tools/fortspivots* \n" +
				"- Pivot adjusts the point where the component rotates on its parent component. (You would use the image size and pixel coordinate for the parent sprite).\n" +
				"- PivotOffset adjusts the point where the component rotates on itself. (You would use the image size and pixel coordinate for the component's own sprite).\n" +
				"- Component \"Hardpoint0\" marks the start of the barrel. The weapon has a BarrelLength property that defines the length in units from hardpoint0 where the projectile will spawn. Each pixel is 0.375 units.\n" +
				"**Example usage:** `/forts_pivots pivot_type:Pivot image_width:512 image_height:256 pivot_x:176 pivot_y:119` (for rotating at pixel 176x119 on the parent image whose size is 512x256).\n" +
				"For more help, see attached image: https://www.samsterbirdies.com/tools/assets/fortspivotguide.webp"
			],
			['genshin_character',
				"Links a genshin character's wiki page. Good for telling someone who Kirara is.\n" +
				"**Example usage:** `/genshin_character character:Kirara`"
			],
			['insult',
				"Spews out a random insult into the chat.\n" +
				"This shows up under someones profile context menu > Apps."
			],
			['ping',
				"Replies with 'Pong!'. Useful for checking if the bot is online and operational.\n"+
				"**Example usage:** `/ping`"
			],
			['stats_resolution',
				"Calculate screen statistics from resolution, size, and viewing distance.\n" +
				"This is useful for seeing how sharp a screen actually appears, because resolution is only one factor.\n"+
				"For distance measurements, use any unit you wish (inches, centimeters, football fields, etc). Just keep the usage consistent.\n" +
				"- PPX is Pixels Per X distance unit. This would be PPI (Pixels Per Inch) if youre using inches as your unit. This tells you how small the pixels are (more accurately how many would fit on the length of the specified unit)\n" +
				"- PPD is Pixels Per Degree of your Field of View. This is similar to PPX but more accurately shows how it would appear to your vision since it takes the viewing distance into account.\n"+
				"- Pixel angular size is basically the inverse of PPD. It's the size of each pixel in degrees, arcminutes, and arcseconds.\n" +
				"- Human vision equivalent shows what visual acuity score is required to see each pixel. This assumes that 20/20 vision is equivalent to 1 arcminute of resolution.\n" +
				"**Example usage:** `/stats_resolution res_x:1920 res_y:1080 size:24 distance:30` (for 1920x1080 screen that is 24\" diagonal size being viewed from 30\" away)."
			],
			['random_commander',
				"Picks a random Forts commander for you. Good if you feel like picking random commanders in ranked or something.\n"+
				"The ephemeral option is optional. ephemeral:true = visible only to yourself. ephemeral:false = visible to everyone.\n"+
				"**Example usage:** `/random_commander`"
			],
			['random_genshin_character',
				"Picks a random genshin impact character and links their wiki page.\n"+
				"The ephemeral option is optional. ephemeral:true = visible only to yourself. ephemeral:false = visible to everyone.\n"+
				"**Example usage:** `/random_genshin_character`"
			],
			['random_weapon',
				"Picks a random Forts weapon for you. Good trying random strats or memes.\n"+
				"The ephemeral option is optional. ephemeral:true = visible only to yourself. ephemeral:false = visible to everyone.\n"+
				"**Example usage:** `/random_weapon`"
			],
			['solve24',
				"Solves a 24 game. More info here: https://en.wikipedia.org/wiki/24_(puzzle) \n"+
				"Use num1: num2: num3: and num4: to input numbers\n"+
				"**Example usage:** `/solve24 num1:7 num2:4 num3:7 num4:7`"
			],
			['stats',
				"Prints statistics about the discord bot. Mostly for debugging. Prints bot start date, ps, and neofetch."+
				"**Example usage:** `/stats`"
			],
		]);
		
		if (command_list.includes(selected_command)){
			await interaction.reply({ content: "## " + selected_command + "\n" + command_map.get(selected_command), ephemeral: true });
		} else {
			await interaction.reply({ content: "Error: command not found.", ephemeral: true });
		}
	},
};
