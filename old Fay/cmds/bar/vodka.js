const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, connection) => {
    let prix = 4;
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(message.author + " Mentionner quelqu'un à qui acheter un verre de vodka | `!vodka <user>` :tumbler_glass: ");
    
    if (target == message.author) {
        connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) return console.log(err); //arrête le programme en cas d'erreur
            let user_coins = rows[0].coins;
            connection.query(`UPDATE user SET coins = ${user_coins - prix} WHERE id = '${message.author.id}'`);
        });
        message.channel.send(new RichEmbed().setDescription("**Vodka ! :tumbler_glass: **\n" + message.author + " s'est acheter pour **" + prix + " coins** un verre de vodka ! :tumbler_glass: ").setColor(1752220))
    } else {
        connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
            if(err) return console.log(err); //arrête le programme en cas d'erreur
            let users_coins = rows[0].coins;
            connection.query(`UPDATE user SET coins = ${users_coins - prix} WHERE id = '${message.author.id}'`);
        });
        message.channel.send(new RichEmbed().setDescription("**Vodka ! :tumbler_glass: **\n" + message.author + " a acheter pour **" + prix + " coins** à " + target + " un verre de vodka ! :tumbler_glass:").setColor(1752220));
    }
}

module.exports.help = {
	name: "vodka"
}