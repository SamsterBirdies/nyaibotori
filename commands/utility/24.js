const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('24')
	.setDescription('Play the 24 game.')
	.addNumberOption(option =>
		option.setName('digits')
		.setDescription('How many digits? (4-24)'))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		var digit_count = Math.floor(interaction.options.getNumber('digits')) ?? 4;
		if (digit_count > 24) {digit_count = 24}
		if (digit_count < 4) {digit_count = 4};
		const timer = 60000 * 60;
		const userid = interaction.user;
		//create the stuffs
		var digits = GenerateNumbers24(digit_count);
		var message = "";
		if (digit_count != 4){
			message = `24 game but with ${digit_count} digits. Good luck!\n`;
		}
		for (let digit of digits){
			message += `:number_${digit}:`;
		}
		//passes the numbers into the modalId
		var modalid = 'game24_';
		for (let digit of digits){
			modalid += digit;
		}
		//submit button
		const submit_btn = new ButtonBuilder()
			.setCustomId(modalid)
			.setLabel('Submit')
			.setStyle(ButtonStyle.Primary);
			
		const action_row = new ActionRowBuilder()
			.addComponents(submit_btn);
			
		const response = await interaction.reply({ 
			content: message, 
			components: [action_row],
			ephemeral: false,
		});
		//modal builder
		/*
		const modal = new ModalBuilder()
			.setCustomId(modalid)
			.setTitle('Submit solution');
		// Add components to modal

		// Create the text input components
		const solution_input = new TextInputBuilder()
			.setCustomId('game24_solution_entry')
		    // The label is the prompt the user sees for this input
			.setLabel("Solution:")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
		
		const firstActionRow = new ActionRowBuilder().addComponents(solution_input);
		modal.addComponents(firstActionRow);
		
		const collector = response.createMessageComponentCollector({ time: timer });
		collector.on('collect', async interaction2 => {
			//gets processed at events/interactionCreate.js
			await interaction2.showModal(modal);
		});
		setTimeout(End24, timer);
		function End24(){
			interaction.editReply({ content: message + "\nTime's up!", components: [] });
		}
		*/
		//helper functions
		function GenerateNumbers24(size) {
			var numbers = [];
			for (let i = 0; i < size; i++) {
				numbers.push(i);
			}
			return numbers.map(function() {
				return Math.floor(Math.random() * 8 + 1);
			});
		}
	}
}