const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, connection) => {
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;

		if(!rows[0].xp) return message.channel.send("This user has no XP on record.");
		
		let xp = rows[0].xp;
		message.channel.send(new RichEmbed().setDescription(target + " has : " + xp + " XP")
		.setColor("#daa520"));
	});
}

module.exports.help = {
	name: "xp"
}