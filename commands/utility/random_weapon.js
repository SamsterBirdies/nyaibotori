const { SlashCommandBuilder } = require('discord.js');
var command = new SlashCommandBuilder()
	.setName('random_weapon')
	.setDescription('Replies with a random Forts weapon.')
	.addBooleanOption(option =>
		option.setName('ephemeral')
		.setDescription('Whether or not the echo should be ephemeral'))
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];
module.exports = {
	data: command,
	async execute(interaction) {
		const visible = interaction.options.getBoolean('ephemeral') ?? 'true';
		const commanders =
		[
			'Machinegun','Minigun','Sniper','AP Sniper','AP Minigun', //no tech or upgrade
			'Incendiary Mortar','Heavy Mortar','Buzzsaw','Swarm Missiles','Warhead', //workshop
			'Flak','Shotgun','EMP Rocket','Rocket','Smoke Bomb','Decoy','Control Ammo', //armory
			'20mm Cannnon','Cannon','Howitzer','Deckgun','Thunderbolt', //munitions
			'Firebeam','Magnabeam','Plasma Laser','Orbital Sweep','Orbital Focus','Nighthawk' //factory
		];
		
		await interaction.reply({ content: commanders[Math.floor(Math.random() * commanders.length)], ephemeral: visible });
	},
};
