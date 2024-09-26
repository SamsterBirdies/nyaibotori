const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('genshin_character')
	.setDescription("Links a genshin character's wiki page.")
	.addStringOption(option =>
		option.setName('character')
			.setDescription('Character to link:')
			.setAutocomplete(true)
			.setRequired(true)
		)
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
const characters =
[
	'Albedo','Alhaitham','Aloy','Amber','Arataki Itto','Arlecchino',
	'Baizhu','Barbara','Beidou','Bennett',
	'Candace','Charlotte','Chevreuse','Chiori','Chongyun','Clorinde','Collei','Cyno',
	'Dehya','Diluc','Diona','Dori',
	'Emilie','Eula',
	'Faruzan','Fischl','Freminet','Furina',
	'Gaming','Ganyu','Gorou',
	'Hu Tao',
	'Jean',
	'Kachina','Kaedehara Kazuha','Kaeya','Kamisato Ayaka','Kamisato Ayato','Kaveh','Keqing','Kinich','Kirara','Klee','Kujou Sara','Kuki Shinobu',
	'Layla','Lisa','Lynette','Lyney',
	'Mika','Mona','Mualani',
	'Nahida','Navia','Neuvillette','Nilou','Ningguang','Noelle',
	'Qiqi',
	'Raiden Shogun','Razor','Rosaria',
	'Sangonomiya Kokomi','Sayu','Sethos','Shenhe','Shikanoin Heizou','Sigewinne','Sucrose',
	'Tartaglia','Thoma','Tighnari'
];
module.exports = {
	data: command,
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused();
		const choices = characters;
		const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.toLowerCase()));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		const selected_character = interaction.options.getString('character');
		if (characters.includes(selected_character)){
			await interaction.reply({ content: 'https://genshin-impact.fandom.com/wiki/' + selected_character.replace(" ", "_"), ephemeral: false });
		} else {
			await interaction.reply({ content: "Error: playable character not found.", ephemeral: true });
		}
	},
};
