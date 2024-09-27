const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('base_num_convert')
	.setDescription('Convert the base of a number.')
	.addStringOption(option =>
		option.setName('number')
			.setDescription('Number to convert')
			.setRequired(true))
	.addIntegerOption(option =>
		option.setName('base_in')
			.setDescription('Base of the previous given number. (2-36)')
			.setRequired(true))
	.addIntegerOption(option =>
		option.setName('base_out')
			.setDescription('Base to convert the number to. (2-36)')
			.setRequired(true))

command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];

module.exports = {
	data: command,
	async execute(interaction) {
		//gather input
		const input_number = interaction.options.getString('number');
		const input_base_in = interaction.options.getInteger('base_in');
		const input_base_out = interaction.options.getInteger('base_out');
		const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		//functions
		function ConvertToTen(input,base){
			var output = 0;
			for (x of input){
				output *= base;
				output += characters.indexOf(x);
			}
			return output;
		}
		function ConvertTenToBase(input,base){
			var output = "";
			var remainder = input;
			var temp;
			var remainderold;
			for (var i = 0;i<999;i++){
				if (remainder < base){
					output = characters[remainder]+output;
					break
				} else {
					remainderold = remainder;
					remainder = Math.floor(remainder / base);
					output = characters[remainderold%base]+output;
				}
			}
			return output;
		}
		function Convert(input, basein, baseout){
			//test to make sure all inputs are valid.
			var c=0;
			for (x of input){
				if (characters.indexOf(x) <= basein - 1 && characters.indexOf(x) >= 0){
					c++;
				}
			}
			//Choosing a conversion process.
			if (basein > 36 || basein < 2 || baseout > 36 || baseout < 2){
				return { content: "Error: Base must be within 2-36", ephemeral: true};
			} else if (c == input.length){ //Valid inputs, Do conversion.
				var baseTen = ConvertToTen(input,basein);
				var output = ConvertTenToBase(baseTen,baseout);
				return { content: `Base${basein} \`${input}\`  :arrow_right:  Base${baseout} \`${output}\``, ephemeral: false};
			} else if (c <= input.length){
				var validcharacters = `Error: Invalid characters. Valid characters for base ${basein} are: \``;
				var i = 0;
				for (x of characters){
					if (i <= basein - 1){
						validcharacters += x;
						i++;
					}
				}
				validcharacters += `\``;
				return { content: validcharacters, ephemeral: true};
			} else {
				return { content: "Error: Unknown error", ephemeral: true};
			}
		}
		//output message
		await interaction.reply(Convert(input_number.toUpperCase(), input_base_in, input_base_out));
	},
};
