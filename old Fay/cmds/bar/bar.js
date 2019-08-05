const { RichEmbed } = require("discord.js");
const PREFIX = "!";

module.exports.run = async (bot, message, args, connection) => {
	message.channel.send( {
		embed: {
			color: 1752220,
			description: "\n**:beers: Bar**\n" +
				"\n" +
				PREFIX + ":beer: `bière`= 5 coins\n" +
				PREFIX + ":tumbler_glass: `hydromel`= 6 coins\n" +
				PREFIX + ":tumbler_glass: `whisky` = 5 coins\n" +
				PREFIX + ":tumbler_glass:`vodka` = 4 coins\n" +
				PREFIX + ":wine_glass:`vin` = 3 coins\n" +
				PREFIX + ":milk::strawberry: `sirop` = 2 coins\n" +
				PREFIX + ":milk:`eau` = gratuit\n" +
				"\n**Exemple : " + PREFIX + "bière @user**\n" +
				"\n ps : L'alcool est dangereux pour la santé, à consommer avec modération ~~ou pas~~ !!\n" +
				"\n Si vous souhaiter avoir de nouvelle boisson, dites le nous ou faite une **!demande** !!\n"
		}
	});
}
module.exports.help = {
	name: "bar"
}