const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('random_genshin_character')
	.setDescription('Replies with a random Genshin Impact character.')
	.addBooleanOption(option =>
		option.setName('ephemeral')
		.setDescription('Whether or not the echo should be ephemeral'))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const visible = interaction.options.getBoolean('ephemeral') ?? 'false';
		const characters =
		[
			'Albedo','Alhaitham','Aloy','Amber','Arataki Itto','Arlecchino',
			'Baizhu','Barbara','Beidou','Bennett',
			'Candace','Charlotte','Chevreuse','Chiori','Chongyun','Clorinde','Collei','Cyno','Chasca','Citlali',
			'Dehya','Diluc','Diona','Dori','Dainsleif',
			'Emilie','Eula',
			'Faruzan','Fischl','Freminet','Furina',
			'Gaming','Ganyu','Gorou',
			'Hu Tao',
			'Jean',
			'Kachina','Kaedehara Kazuha','Kaeya','Kamisato Ayaka','Kamisato Ayato','Kaveh','Keqing','Kinich','Kirara','Klee','Kujou Sara','Kuki Shinobu',
			'Layla','Lisa','Lynette','Lyney','Lan Yan',
			'Mika','Mona','Mualani','Mavuika',
			'Nahida','Navia','Neuvillette','Nilou','Ningguang','Noelle',
			'Ororon',
			'Qiqi',
			'Raiden Shogun','Razor','Rosaria',
			'Sangonomiya Kokomi','Sayu','Sethos','Shenhe','Shikanoin Heizou','Sigewinne','Sucrose',
			'Tartaglia','Thoma','Tighnari',
			'Venti',
			'Wanderer','Wriothesley',
			'Xiangling','Xianyun','Xiao','Xilonen','Xingqiu','Xinyan',
			'Yae Miko','Yanfei','Yaoyao','Yelan','Yoimiya','Yun Jin',
			'Zhongli,'
		];
		var selected_character = commanders[Math.floor(Math.random() * commanders.length)]
		await interaction.reply({ content: 'https://genshin-impact.fandom.com/wiki/' + selected_character.replace(" ", "_"), ephemeral: visible });
	},
};
