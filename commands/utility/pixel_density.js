const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('stats_resolution')
	.setDescription('Calculate screen stats from resolution, size, and viewing distance')
	.addNumberOption(option =>
		option.setName('res_x')
			.setDescription('resolution X. example: 1920')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('res_y')
			.setDescription('resolution Y. example: 1080')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('size')
			.setDescription('screen diagonal size. example: 24')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('distance')
			.setDescription('viewing distance. example: 30')
			.setRequired(true))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
function Round3(num){
	return Math.round(num * 1000) / 1000;
}
module.exports = {
	data: command,
	async execute(interaction) {
		//gather input
		const resX = interaction.options.getNumber('res_x');
		const resY = interaction.options.getNumber('res_y');
		const screen_size = interaction.options.getNumber('size');
		const viewing_dist = interaction.options.getNumber('distance');
		//calculate ppx
		const angle = Math.atan( resY / resX )
		const lenY = Math.sin(angle) * screen_size;
		const lenX = Math.cos(angle) * screen_size;
		const ppx = resY / lenY;
		//calculate ppd
		const viewableLen = Math.tan(1/(180/Math.PI)) * viewing_dist;
		const ppd = ppx * viewableLen;
		//calculate angular size of pixel
		var degrees = 1/ppd;
		var arcminutes = degrees;
		degrees = Math.floor(degrees);
		arcminutes -= degrees;
		arcminutes *= 60;
		var arcseconds = arcminutes;
		arcminutes = Math.floor(arcminutes);
		arcseconds -= arcminutes;
		arcseconds *= 60;
		const angular_size = degrees + "°" + arcminutes + "'" + arcseconds + '"';
		//vision needed to see pixel
		const VA = Math.floor((1/ppd) * 60 * 20);
		//additional stuff
		const total_pixels = resX * resY;
		const total_subpixels = total_pixels * 3;
		
		//output message
		await interaction.reply({ content: 
		"## Screen statistics" +
		"\n>>> **Resolution:** " + resX + " x " + resY + 
		"\n**Total pixels:** " + total_pixels +
		"\n**Size:** " + Round3(lenX) + " x " + Round3(lenY) + 
		"\n**Diagonal size:** " + screen_size +
		"\n**PPX:** " + Round3(ppx) +
		"\n**PPD:** " + Round3(ppd) +
		"\n**Pixel angular size:** " + degrees + "° " + arcminutes + "' " + Round3(arcseconds) + '"' +
		"\n**Human vision equivalent:** 20/" + VA
		, ephemeral: false });
	},
};
