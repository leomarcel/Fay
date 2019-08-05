const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, connection) => {
	let target = message.mentions.users.first() || message.author;
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;

		if(!rows[0].coins) return message.channel.send(new RichEmbed().
		setDescription("Ton porte monaie est vide ! :moneybag:").setColor("#daa520"));
		
		let coins = rows[0].coins;

		message.channel.send(new RichEmbed().
		setDescription(target + " has : **" + coins + "** coin(s) ! :moneybag:")
		.setColor("#daa520"));
	});
}

module.exports.help = {
	name: "coins"
}