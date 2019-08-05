//To my futur self, don't try to understand it, I didn't either
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIXMODO = "=";
const PREFIX = "!";
//const PREFIX = "1";
const FAY = "392425512494170112";
const fs = require("fs");
var roller = require('roller');

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);	
	return Math.floor(Math.random() * (max - min +1)) + min;
}

module.exports.roll = function(dice, sides) {
	var rolls = [];
   
	for(var i = 0; i < dice; i++) {
	  // Get a random dice roll capped at the number of sides.
	  rolls[i] = Math.floor(Math.random() * sides) + 1;
	}
  
	return(rolls);
  }

bot.on ("message", message => { //PREFIX
	if (message.author.equals(bot.user)) return;
	if (!message.content.startsWith(PREFIX)) return;

	let command = message.content.split(" ")[0];
	commandPREFIX = command.slice(PREFIX.length);

	if (commandPREFIX == "ty") {
		message.reply(":blush:");
		return;
	}
	//if ((commandPREFIX == "fay") || (commandPREFIX == "Fay")) {
	//	message.reply("hello");
	//	return;
	//}
	if (commandPREFIX == "dev") {
		message.channel.send( {
			embed: {
				color: 1752220,
				description:"**Ce bot n'est plus en développement**"
			}
		});
		return;
	}
	if ((commandPREFIX == "Fay") || (commandPREFIX == "fay")) {
		message.channel.send( {
			embed: {
				color: 1752220,
				description: '**FAY s\'ocuppe de :**\n' +
				'\n- Apporté des commandes spécifiques à certains utilisateurs\n' +
				'- Gestion du serveur Origines pour les modos\n' +
				'- Animation de Origines\n' +
				'- Commande disponible (!help)\n' +
				'- Gestion de la météo pour les lieux extérieurs\n' +
				'- Gestions des bars (en stand bye parce que pas d\'idée)\n' +
				'- Gestions de l\'inventaire (en dev)\n' +
				'\n' +
				'**Amusez-vous bien !! :blush:**'
			}
		});
		return;
	}
	if ((commandPREFIX == "help") || (commandPREFIX == "Fay")) {
		message.channel.send( {
			embed: {
				color: 1752220,
				description: "**Commands List**\n" +
					"Server prefix: " +PREFIX+ "\n" +
					"\n**:stuck_out_tongue_winking_eye: General**\n" +
					"\n" +
					PREFIX + "`Fay`\n" +
					PREFIX + "`dev`\n" +
					PREFIX + "`ty`\n" +
					PREFIX + "`info`\n" +
					PREFIX + "`sondage`\n" +
					PREFIX + "`help`\n" +
					PREFIXMODO + "`modo`\n"
			}
		});
		return;
	}
	if(commandPREFIX === 'info') {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setDescription("Information Utilisateur")
			.addField("Nom", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Crée le ", message.author.createdAt)
			.addField("Tu es le", message.guild.memberCount)
			.setColor("#9B59B6")

		message.channel.send(embed)
	}
	if(commandPREFIX === 'sondage') {
		if(commandPREFIX === 'sondage') {
			let args = message.content.split(" ").slice(1);
			let thingToEcho = args.join(" ");
			let embed = new Discord.RichEmbed()
				.setDescription("Sondage")
				.addField(thingToEcho, "répondre avec :white_check_mark: ou :x:")
				.setColor("0xB40404")
				.setTimestamp()

			message.channel.send(embed)
			.then(function (message) {
				message.react("❌")
				message.react("✅")
			});
			} else { message.reply ("Tu n'as pas la permission.") }
		}
	
	//
});

bot.on("message", message => { //PERFIXMODO
	if (message.author.equals(bot.user)) return;
	if (!message.content.startsWith(PREFIXMODO)) return;
	var args = message.content.split(" ").slice(1);
	
	let command = message.content.split(" ")[0];
	let commandPREFIXMODO = command.slice(PREFIXMODO.length);
	let commandPREFIX = command.slice(PREFIX.length);

	var modRole = message.guild.roles.find("name", "Administrateur");

	if (commandPREFIXMODO === "modo") { // || (commandPREFIX == "Modo")) { //HELP
		if(message.member.roles.has(modRole.id)) {	
			message.channel.send( {
				embed: {
					color: 1752220,
					description: "**Modo Commands List**\n" +
						"Modo prefix: " +PREFIXMODO+ "\n" +
						PREFIXMODO + "`kick @user`: Kick un utilisateur\n" +
						PREFIXMODO + "`purge`: Combien  de message FAY doit supprimer pour vous ?\n" +
						PREFIXMODO + "`meteo`: Active la météo (réservé au développeur)\n" +
						PREFIXMODO + "`say *texte*`: Say pour parler avec FAY\n" +
						PREFIXMODO + "`modo` : Affiche l'aide pour les modérateurs\n" +
						PREFIXMODO + "`StopFay!` : Arrête Fay (à n'utiliser qu'en cas de problème avec celui ci.)\n"
				}
			});
		} else {
			message.reply("Commande Help réservé au modo");
		}
	}
	if (commandPREFIXMODO == "StopFay!") {
		if(message.member.roles.has(modRole.id)) {
			message.reply("Extinction de l'humanité.....");
			console.log("Extinction de l'humanité.....");
			var interval = setInterval (function () {
				process.exit(0);
			}, 1 * 2000);
		}else {
			message.reply("You don't have the permission to use this command.").catch(console.error);
		}
	}
	if (commandPREFIXMODO == "kick") {
		let modRole = message.guild.roles.find("name", "Administrateur");
		if(!message.member.roles.has(modRole.id)) {
		return message.reply("You don't have the permission to use this command.").catch(console.error);
		}
		if(message.mentions.users.size === 0) {
		return message.reply("Please mention a user to kick").catch(console.error);
		}
		let kickMember = message.guild.member(message.mentions.users.first());
		if(!kickMember) {
		return message.reply("That user does not seem valid");
		}
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
		return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
		}
		kickMember.kick().then(member => {
		message.reply(`${member.user.username} was succesfully kicked.`).catch(console.error);
		console.log(`${member.user.username} was succesfully kicked by ${message.author}.`);
		}).catch(console.error)
	}
	if(commandPREFIX === "say") {
		const sayMessage = args.join(" ");
		message.delete();
		message.channel.send(sayMessage);
	}
	//cmd modo
	if(commandPREFIXMODO === "purge") {
		if(message.member.roles.has(modRole.id)) {
			let messagecount = parseInt(args.join(' '));
			
			//Check if message is higher or lower then the limits
			if (!messagecount) {
				return message.reply('Combien de messages ?');
			}
			if (messagecount > 100) {
				return message.reply(`La purge à des limites: vous ne pouvez supprimer que 100 messages par purge.`).then(m => {
					m.delete(2000);
					})
			}
			let ms;
			if (messagecount === 1) {
				ms = 2;
			} else {
				ms = messagecount;
			}
			message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(ms))
			.catch(err => {
				message.channel.send('Je ne peux supprimer que les messages datant de moins de 14 jours\n' +
				'Et non, l\'Api ne laissera aucun bot faire ça!').then(m => {
					m.delete(2000);
					})
			})
			message.reply(`Vous avez supprimé \`${messagecount} Messages!\``).then(m => {
			m.delete(2000);
			})
			.catch(e => logger.error(e));
			console.log(`${messagecount} messages supprimer !`);
		}else {
			message.reply("You don't have the permission to use this command.").catch(console.error);
		}
	}
});

bot.on("message", message => { //cmd spec
	if (message.author.equals(bot.user)) return;
	var args = message.content.split(" ").slice(1);
	
	const user_Hylia = "483362978855387157";
	const user_Lussade = "263972703562629120";
	const user_Kira = "208138749228351488";
	var user = bot.users.get(FAY);
	var Hylia = bot.users.get(Hylia);

	/////////////CMD SPEC//////////
	if (message.content.startsWith(`Je t\'aime ${user}`) || message.content.startsWith(`je t\'aime ${user}`)) {
		if (message.author.id == user_Hylia) {
			//message.reply("Je t'aime aussi ma Déesse du temps et de l'espace ! :heart:");
            //message.reply("Je t'aimais aussi avant... mais vu que je suis ton plan cul... on va baisé ? je te veux :3 :smirk:");
            message.reply("Je t'aime aussi ma Hylia :heart:");
			return;
		}
		if (message.author.id == user_Lussade) {
			message.reply(`J'aime déjà ta soeur, Hylia :smile:`);
			return;
		}
		else
			message.reply("bah pas moi! :yum:");
	}
	if ((message.content.startsWith(`Fay mon amour`) || message.content.startsWith(`fay mon amour`))) {
		if (message.author.id == user_Hylia) {
			message.reply("Oui ma Déesse ? :heart:");
			return;
		}
		if (message.author.id == user_Lussade) {
			message.reply(`Va voir Hadalia toi :smile:`);
			return;
		}	
		else return;
	}
	//cmd spe
});

process.on('unhandledRejection', err => console.error(`Uncaught Promise Rejection: \n${err.stack}`));

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));

bot.on('ready', function () {
	console.log(bot.user.username + ' actif !');
});

bot.login(TOKEN);