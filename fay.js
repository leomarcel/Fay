//To my futur self, don't try to understand it, I didn't either
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = ";";
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

function osef(){
	console.log("rip");
	return;
}

bot.on ("message", message => { //PREFIX
	if (message.author.equals(bot.user)) return;
	if (!message.content.startsWith(PREFIX)) return;

	const command = message.content.split(" ")[0];
	const commandPREFIX = command.slice(PREFIX.length);

	if (commandPREFIX == "ty") {
		message.reply(":blush:");
		return;
	}

	if (commandPREFIX == "dev") {
		message.channel.send( {
			embed: {
				color: 1752220,
				description:"**Ce bot n'est plus en développement (Quoi..que..)**"
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
					PREFIX + "`dev`\n" +
					PREFIX + "`ty`\n" +
					PREFIX + "`info`\n" +
					PREFIX + "`sondage`\n" +
					PREFIX + "`help`\n" +
					PREFIX + "`modo` (desactiver actuellement)\n"
			}
		});
		return;
	}
	if(commandPREFIX === 'info') {
		var embed = new Discord.RichEmbed()
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
			var args = message.content.split(" ").slice(1);
			var thingToEcho = args.join(" ");
			var embed = new Discord.RichEmbed()
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

bot.on("message", message => { //cmd spec
	if (message.author.equals(bot.user)) return;
	var args = message.content.split(" ").slice(1);
	var  command = message.content.split(" ")[0];
	var commandPREFIX = command.slice(PREFIX.length);
	var user = bot.users.get(FAY);
	var Hylia = bot.users.get(Hylia);

	/////////////CMD SPEC//////////
	if (message.content.startsWith(`Je t\'aime ${user}`) || message.content.startsWith(`je t\'aime ${user}`)) {
		if (message.author.id == user_Hylia) {
			//message.reply("Je t'aime aussi ma Déesse du temps et de l'espace ! :heart:");
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
			message.reply("Va voir Hadalia toi :smile:");
			return;
		}	
		else return;
	}
	//cmd spe
});

bot.on("message", message => { //cmd spec
	if (message.author.equals(bot.user)) return;
	var args = message.content.split(" ").slice(1);
	var command = message.content.split(" ")[0];
	var commandPREFIX = command.slice(PREFIX.length);
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

//BOT ROLES
const yourID = "208138749228351488";
const setupCMD = PREFIX + "createrolemessage";
let initialMessage = `**Réagissez aux messages ci-dessous pour recevoir le rôle associé. Si vous souhaitez supprimer le rôle, supprimez simplement votre réaction !**`;
const roles = ["Spectateur", "ping rp"];
const reactions = ["😃", "🆕"];

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "La liste des rôles et la liste des réactions ne sont pas de la même longueur !";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Réagissez ci-dessous pour obtenir le rôle **"${role}"** !`); //DONT CHANGE THIS
    return messages;
}

bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
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