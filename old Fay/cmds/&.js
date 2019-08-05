const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, connection) => {
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;
		if(rows.length < 1) return message.channel.send("Cet utilisateur n'est pas enregistré.");
		var xp = rows[0].xp;
		message.channel.send(new RichEmbed().setDescription(target + " has : **" + xp + "** XP \n" + 
		target + " has :** " + rows[0].coins + "** Coin(s) ! :moneybag:").setColor("#daa520"));
	});
}

module.exports.help = {
    name: "&"
}