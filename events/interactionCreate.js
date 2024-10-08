const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand()){
			//commands
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
	
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		
		} else if (interaction.isAutocomplete()){
			//auto complete
			const command = interaction.client.commands.get(interaction.commandName);
			try {
				await command.autocomplete(interaction);
			} catch (error) {
			}
		
		} else if (interaction.isButton()) {
			//button callback
			try {
				//24 game
				if (interaction.customId.startsWith("game24_")) {
					const modal = new ModalBuilder()
						.setCustomId(interaction.customId)
						.setTitle(`24 Game`);
					const solution_input = new TextInputBuilder()
						.setCustomId('game24_solution_entry')
						// Label with numbers
						.setLabel(`Solution for ${interaction.customId.slice(7)}:`)
						.setStyle(TextInputStyle.Short);
					const firstActionRow = new ActionRowBuilder().addComponents(solution_input);
					modal.addComponents(firstActionRow);
					await interaction.showModal(modal);
				}
			} catch (error) {
				console.log(error);
				await interaction.reply({ content: 'There was an error with this button!', ephemeral: true });
			}
				
		} else if (interaction.isModalSubmit()) {
			//modal submit callback
			try {
				//24 game
				if (interaction.customId.startsWith("game24_")) {
					let numbers = interaction.customId.slice(7).split(""); //get numbers
					let i = 0;
					for (let number of numbers){
						numbers[i] = Number(number);
						i++;
					}
					const userid = interaction.user.id;
					const uinput = interaction.fields.getTextInputValue('game24_solution_entry');
					await interaction.reply({ content: TestAnswer24(numbers, uinput, userid) });
				}
			} catch (error) {
				console.log(error);
				await interaction.reply({ content: 'There was an error processing this modal!', ephemeral: true });
			}
		}
	},
};

//24 game
function TestAnswer24(numbers, input, userid) {
	//courtesy of https://rosettacode.org/wiki/24_game#JavaScript
	const invalidChars = /[^\d\+\*\/\s-\(\)]/;
	const responses_win = [
		`Here, have a cookie.`,
		`Here's a cookie!`,
		`*headpats you*`,
		`*gives you headrubs*`,
		`Wow, you're so smart!`,
		`You're an absolute genius!`,
		`You're a pro!`,
		`You make this look easy!`,
		`You destroyed this game!`,
		`Want a reward?`,
	];
	const responses_lose = [
		`C'mon it aint that hard...`,
		`Litterally just do it right...`,
		`Maybe you should just give up...`,
		`That's kind of embarrasing...`,
		`*sigh* ... I'm so tempted to just give you the answer.`,
		`I already solved it... Hurry up!`,
	];
	var validNums = function(str) {
		// Create a duplicate of our input numbers, so that
		// both lists will be sorted.
		var mnums = numbers.slice();
		mnums.sort();

		// Sort after mapping to numbers, to make comparisons valid.
		return str.replace(/[^\d\s]/g, " ")
			.trim()
			.split(/\s+/)
			.map(function(n) { return parseInt(n, 10); })
			.sort()
			.every(function(v, i) { return v === mnums[i]; });
	};

	var validEval = function(input) {
		try {
			return eval(input);
		} catch (e) {
			return {error: e.toString()};
		}
	};

	if (input.trim() === "") return `:x:<@${userid}>` + ` You must enter a value. ` + responses_lose[Math.floor(Math.random() * responses_lose.length)];
	if (input.match(invalidChars)) return `:x:<@${userid}>` + ` Input:\`${input}\`\n` + "Invalid chars used, try again. Use only:\n `+` `-` `*` `/` `(` `)`.\n" + responses_lose[Math.floor(Math.random() * responses_lose.length)];
	if (!validNums(input)) return `:x:<@${userid}>` + ` Input:\`${input}\`\nWrong numbers used, try again. ` + responses_lose[Math.floor(Math.random() * responses_lose.length)];
	var calc = validEval(input);
	if (typeof calc !== 'number') return `:x:<@${userid}>` + ` Input:\`${input}\`\nThat is not a valid input; please try again. ` + responses_lose[Math.floor(Math.random() * responses_lose.length)];
	if (calc !== 24) return `:x:<@${userid}>` + ` Whoops, \`${input} = ${String(calc)}\`. ` + responses_lose[Math.floor(Math.random() * responses_lose.length)];
	return `:white_check_mark:<@${userid}>` + " Valid solution! " + responses_win[Math.floor(Math.random() * responses_win.length)] + `\nInput:||\`${input}\`||`;
}