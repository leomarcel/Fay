module.exports.run = (bot, message, args) => {
	let str = args.join(" ");
    if(!str) return message.channel.send("Please écrivez votre demande | `!demande <demande>`");
    var modo = "447315673610452992"; //modo origins
    //var modo ="385201181158277133"; //general
	/*
	message.channel.send(new RichEmbed().setDescription(str).setColor("#daa520"));
	*/
    bot.channels.get(modo).send("Demande de " + message.author + " : " + str);
    message.reply("Votre demande à était envoyer.");
}

module.exports.help = {
	name: "demande"
}