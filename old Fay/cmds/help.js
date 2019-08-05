const { RichEmbed } = require("discord.js");
const PREFIX = "!";
/*
module.exports.run = async (bot, message, args, con) => {
	try {
		await message.author.send(`Commands: \n\n${bot.commands.map(cmd => `\`${cmd.help.name}\``).join(", ")}`);
		message.channel.send("Help sent.");
	} catch(e) {
		message.channel.send("Could not send you a DM.");
	}
}
*/
module.exports.run = async (bot, message, args, connection) => {
	message.channel.send( {
		embed: {
			color: 1752220,
			description: "**Commands List**\n" +
				"Server prefix: " +PREFIX+ "\n" +
				"\n**:stuck_out_tongue_winking_eye: General**\n" +
				"\n" +
				PREFIX + "`avatar`: Affiche ton Avatar\n" +
				PREFIX + "`userinfo`: Information utilisateur\n" +
				PREFIX + "`sondage` *sondage*: Crée un Sondage\n" +
				PREFIX + "`icon`: Affiche l'icone du serveur\n" +
				PREFIX + "`cookie`: Offrer un cookie à quelqu'un\n" +
				PREFIX + "`demande`: Faite une demande / proposition au modo !\n" +
				PREFIX + "`help`: Affiche l'aide\n" +
				PREFIX + "`modo`: Commande modo\n" +
				PREFIX + "`bar`: Articles des bars (bière, whyski, etc)\n" +
				"\n**:money_mouth: Economie**\n \n" +
				PREFIX + "`pay+`: Ajouter des coins (mod only)\n" +
				PREFIX + "`pay-`: Retirer des coins (mod only)\n" +
				PREFIX + "`pay`: Payer quelqu'un (tranfert d'argent)\n" +
				PREFIX + "`coins`: Afficher ses Coin(s)\n" +
				PREFIX + "`xp`: Afficher ses Xp\n" +
				PREFIX + "`coins`: Afficher ses Xp et ses Coin(s)\n" +
				PREFIX + "`top`: Afficher les gens les plus actifs (en dév)\n" +
				"\n**Exemple : " + PREFIX + "pay @user 100**\n" +
				"\n Un système d'inventaire arrivera prochainement.\n"
		}
	});
}
module.exports.help = {
	name: "help"
}