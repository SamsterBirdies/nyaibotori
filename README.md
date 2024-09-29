# nyaibotori
Niche purpose Discord bot.

Mostly just a bot for me to play around with.
Nya AI aibō bot tori laboratory.

Build instructions:

Bot is currently running on discord.js v14.6.2

Requires node and discord.js

Use `npm install discordjs`

Requires a config.json with your proper ids 
```
{
	"clientId": "1234567890",
	"guildId": "1234567890",
	"token": "abcdefghijklmnopqrstuvwxyz"
}
```

You can refresh global and guild commands by running `node deploy-commands.js` and `node deploy-commands-local.js`

Run bot with `node .`

Some commands may have additional requirements. For example, /stats requires specific console commands.

For more help on setting up the bot visit https://discordjs.guide/preparations/
