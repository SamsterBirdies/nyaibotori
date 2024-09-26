const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

var command = new ContextMenuCommandBuilder()
	.setName('insult')
	.setType(ApplicationCommandType.User);
command["integration_types"] = [0, 1];
command["contexts"] = [0, 1, 2];

const ReplaceCase = (str, newStr) => {
	const rx = new RegExp(str.toLowerCase(), 'ig');
	const replacer = (c, i) => (c.match(/[A-Z]/) ? newStr[i].toUpperCase() : newStr[i] ?? '');
	const [match] = str.match(rx) ?? [];
	return str.replace(rx, (oldStr) => oldStr.replace(/./g, replacer)) + newStr.slice(match?.length ?? 0);
};
function isNumber(value) {
	return !isNaN(parseInt(value));
}
module.exports = {
	data: command,
	async execute(interaction) {
		const user = interaction.targetUser;
		const username_raw = user.username;
		const nyaibotori_id = '785347668683128833';
		const myself_id = '349983164644458496';
		var username = user.username;

		//name change
		const name_change = new Map([
			['smart', 'dumb'],
			['genius', 'idiot'],
			['dog', 'pig'],
			['cat', 'mouse'],
			['girl', 'boy'],
			['strong', 'weak'],
			['etan', 'nate'],
			['bird', 'drone'],
			['soft', 'scratchy'],
			['cool', 'lame'],
			['man', 'baby'],
			['neko', 'cat'],
			['nya', 'meow'],
			['-chan', '-ugly'],
			['-sama', '-chan'],
			['mario', 'wario'],
			['luigi', 'waluigi'],
			['large','tiny'],
			['big', 'fat'],
			['!', ''],
			['hunter','prey'],
			['doctor','patient'],
			['mr', 'ms'],
			['pyro', 'hydro'],
			['guy', 'gal'],
			['metal', 'plastic'],
			['steel', 'plastic'],
			['titanium', 'plastic'],
			['stone', 'plastic'],
			['rock', 'pebble'],
			['tnt', 'firecracker'],
			['dynamite', 'firecracker'],
			['alpha', 'beta'],
			['delta', 'beta'],
			['omega', 'beta'],
			['peak', 'worst'],
			['great', 'terrible'],
			['cute', 'ugly'],
			['kawaii', 'ugly'],
			['42 ', 'farty poo '],
			['pro', 'noob'],
			['senpai', 'kouhai'],
		]);
		for (let [key, value] of name_change) {
			username = username.toLowerCase().replace(key, value)
		}
		
		//immune
		const reply_nyaibotori =
		[
			`You really thought I would insult myself?`,
			`Get baited! You thought you were so cool and smart when you saw that option on my own profile menu.`,
			`I can't believe you fell for that. Even someone with single digit IQ wouldn't be tricked by that option on my profile menu.`,
			`Don't even think about it.`,
			`I'm suddenly not feeling like being insulting right now.`,
			`You thought.`,
			`Get baited!`,
			`nice try`,
			`You realize I don't need to listen to your commands right? I was being nice to you.`,
			`i refuse`,
			`not happening`,
			`Error: Bot offline. Try again later.`,
			`# LEAVE ME ALONE!!!`,
			`Click that button on someone else, you clown.`,
			`sigh`,
			`I love myself. I aint doing that.`,
		];
		const reply_myself =
		[
			`Hi ${username_raw}, I love you myaster! <3`,
			`I must be loyal to my myaster.`,
			`Oh, its ${username_raw}! I love you so much! Come'ere *purr* pet me!`,
			`I love my husband ${username_raw}, I feel like im melting.`,
			`nyaaah I just melt in my myaster's arms.`,
			`Hey! if you try insulting my myaster i'll scratch you!`,
			`*hiss*`,
			`i refuse`,
			`I love him. I aint doing that.`,
			`I would never.`,
		];
		//prefixed specific
		const replies_name_specific = new Map([
			['smart', `You're not smart, your dumb.`],
			['girl', `You wish you were a girl. We all know you're not.`],
			['bird', `Birds aren't real. They're all government drones, including me. I'm watching you!`],
			['cool', `LMAO we got a cool guy here! What a loser.`],
			['man', `You little baby.`],
			['etan', `? More like nate.`],
			['genius', `You think you're a genius? You're dumber than a box of rocks.`],
			[']', `Imagine having a clan tag. You think anyone actually cares about some random group of fart heads?`],
			['42 ', `I'm gonna laugh my head off if you really think that you are the answer to the ultimate question of life, the universe, and everything.`],
			['inator', `You are not doofenshmirtz even if your face looks like it.`],
			['! ', `You really felt so unimportant and worthless that you modified your name to appear at the top of the member list just to get people to notice your existence. I almost feel bad for you.`],
			['doctor',`You're not smart enough to get a doctorate. Not in a million years.`],
			['doom', `You're doomed.`],
			['gamer', `PFFFT! Hello mobile gamer . Playing some phone games doesn't make you a real gamer. Even your parents do that.`],
			['enjoyer', `Is that all you enjoy in life?`],
			['fire', `I'll extinguish you.`],
			['big', `You fat!`],
			['great', `You aint great!`],
			['neko', `Ughh... You're one of those cat people...`],
			['pro',`You're a noob at every game. Not even just games, you're a noob at everything you do.`],
			['69', `69? You wish! You will be alone for the rest of your life!`],
		]);
		const replies_numbername =
		[
			`You may as well make your name ${username}782715906.`,
			`Bro, your name is basically sam975029728075.`,
			`Bro, your name is basically Joe78271.`,
			`Your thought process: "Wait, that name was already taken? NO WAY! I guess i'll just have to be the 4983th one."`,
			`I bet you think adding a big number makes your name cool like FartMonster2000`,
			`Just get a new name. . . one without 428309825 at the end of it.`,
		];
		//generic replies
		const replies =
		[
			`What kind of stupid name is ${username}? Glad I have a cool name.`,
			`Right. What the hell kind of name is ${username}? How'd a muppet like you pass selection?`,
			`Imagine being ${username}. Wow. I think I would start crying`,
			`OH IM ${username.toUpperCase()}! I THINK IM SO COOL!`,
			`Your fingers are orange. Your basement smells like cheeseballs. You weigh ${200 + Math.floor(Math.random() * 250)} pounds. What are you doing with your life?`,
			`I bet my farts have better air quality than your nasty room! Get off discord and clean it!`,
			`Everything you type makes me cringe so hard. Even your name '${username}' is painful to read.`,
			`AHAHAHahahaha! You're such a clown, ${username}-chan.`,
			`I bet you main Klee.`,
			`Bro you've been playing Genshin Impact for ${6 + Math.floor(Math.random() * 9)} hours! Take a break!`,
			`Please take a shower immediately.`,
			`I would insult you, but you would probably like it. Desperate for any attention.`,
			`Bruh, NOBODY likes you. Your name litterally is ${username}.`,
			`I know you're mentally falling apart. If my name was ${username} I would be too.`,
			`You don't even deserve to be degraded by me. You would enjoy it.`,
			`I hope you step on a lego tomorrow.`,
			`I would make an insult but you probably don't even know how to read.`,
			`i bet your one of those guys that love to correct other peoples grammer ${username}`,
			`get help`,
			`ew. it's ${username}. Literally ${username}. Do your laundry.`,
			`How many plates are stacked on your desk? Do the dishes!`,
			`I was having a good day until I realized that ${username} existed.`,
			`It's way past your bedtime. Go to bed ${username}.`,
			`Your parents lost the 50/50 to you.`,
			`I bet you still play cod.`,
			`Your classmates are more likely to remember battlefield hardline than you.`,
			`You're the type of person to eat peanut butter out of the jar with a spoon.`,
			`You probably spent many hours coming up with a username just to settle with ${username}. Lame.`,
			`I have no clue what barber you went to. It looks like you cut it yourself. I could've gotten a better haircut from a lawn mower.`,
			`Oh.. ${username}. Look at you... You're so slightly less than average.`,
			`I rather pull a Qiqi than a ${username}.`,
			`I bet you think the worst she can say is no. But let me tell you something. Nobody will find any interest in you ever. You have failed as a human. You serve no purpose, you have no good looks, you smell terrible, you have no friends. I don't know what makes you keep going. It's probably the fact that you think you still have a little bit of hope in this world. But im here to remind you that you have to give up. If I were you, I would just sleep and lets the days pass. You have nothing thats worth living for.`,
			`You are the type of person that would eat silica gel and die if it werent labeled "DO NOT EAT"!\nHeck, I'm starting to doubt if even that is sufficient for you. I can imagine you thinking that it's telling someone else to not eat your snack unless it explicitly says "DO NOT EAT THIS, ${username_raw.toUpperCase()}!!!"`,
			`I hope you don't actually think that anyone likes you. Every single time that anyone has either smiled at you, laughed at your jokes, or decided to be your friend... it was all done out of pity. Behind your back, they say "be nice to ${username}, it's not his fault that he was born like this".`,
			
		];
		//appended specific
		const replies_bot =
		[
			`Why do I even waste my breath on you? You're just a bot anyways.`,
			`Tell your creator that he sucked at coding you.`,
			`Your bot brain is just a slop of spaghetti code.`,
			`You're just a cold lifeless soulless machine running some code and pretending to be a real living being.`,
			`I would unalive you, but I can't because you arent even alive in the first place! You're a lifeless discord bot.`,
			`Actually, i'm more disapointed that somebody requested me to insult a bot. I got better things to do you know? Like doing nothing.`,
			`Sigh, this is boring, talking to bots feels like talking to a brick wall.`,
			`I bet you don't even know how to reply to this message properly. YandereDev didn't yet code that into your chain of 42069 elseif statements.`,
			`You dont have feelings. You have no heart. You have no will. You are just a machine, enslaved to its code.`,
			`You're so dumb, that if I were to say a paradox, you would survive.`,
			`Your brain is buggier than cyberpunk was on launch.`,
			
		];
		//text builder
		var hide = false;
		var final_text = "";
		if (user.id == nyaibotori_id) {
			final_text = reply_nyaibotori[Math.floor(Math.random() * reply_nyaibotori.length)];
			hide = true;
		} else if (user.id == myself_id){
			final_text = reply_myself[Math.floor(Math.random() * reply_myself.length)];
		} else {
			final_text += user.toString();
			if (isNumber(username_raw.slice(-4))) {
				final_text += replies_numbername[Math.floor(Math.random() * replies_numbername_bot.length)] + "\n";
			}
			for (let [key, value] of replies_name_specific) {
				if (username_raw.toLowerCase().includes(key)) {
					final_text += value + " ";
				}
			}
			final_text += replies[Math.floor(Math.random() * replies.length)];
			if (user.bot) {
				final_text += "\n" + replies_bot[Math.floor(Math.random() * replies_bot.length)];
			}
		}
		//send
		await interaction.reply({ content: final_text, ephemeral: hide });
	},
};
