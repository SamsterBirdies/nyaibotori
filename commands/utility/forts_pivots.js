const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('forts_pivots')
	.setDescription('Calculate Forts Pivots from image size and pixel coordinate to rotate on.')
	.addStringOption(option =>
		option.setName('pivot_type')
			.setDescription('Pivot rotates on parent sprite. PivotOffset rotates on itself.')
			.setRequired(true)
			.addChoices(
				{ name: 'Pivot', value: 'pivot' },
				{ name: 'PivotOffset', value: 'pivotoffset' },
			))
	.addNumberOption(option =>
		option.setName('image_width')
			.setDescription('With Pivot, this is the parent image. With PivotOffset, it is itself.')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('image_height')
			.setDescription('With Pivot, this is the parent image. With PivotOffset, it is itself.')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('pivot_x')
			.setDescription('Pixel X coordinate to rotate on.')
			.setRequired(true))
	.addNumberOption(option =>
		option.setName('pivot_y')
			.setDescription('Pixel Y coordinate to rotate on.')
			.setRequired(true))

command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
function Round5(num){
	return Math.round(num * 100000) / 100000;
}
module.exports = {
	data: command,
	async execute(interaction) {
		//gather input
		const pivot_type = interaction.options.getString('pivot_type');
		const size_x = interaction.options.getNumber('image_width');
		const size_y = interaction.options.getNumber('image_height');
		const pivot_x = interaction.options.getNumber('pivot_x');
		const pivot_y = interaction.options.getNumber('pivot_y');
		//start calculations
		var outputPivot = [0,0];
		outputPivot[0] = Round5((pivot_x-(size_x/2))/size_x); //width
		outputPivot[1] = Round5((pivot_y-(size_y/2))/size_y); //height
		//start output
		var output = "Pivot";
		if (pivot_type == "pivotoffset")
		{
			output += "Offset";
			outputPivot[0] *= -1;
			outputPivot[1] *= -1;
		}
		output += " = {" + outputPivot[0] + ", " + outputPivot[1] + "}";
		//output message
		await interaction.reply({ content: output, ephemeral: false });
	},
};
