
const { RichEmbed } = require("discord.js");

function generateXP() { //algo evo xp
	let min = 20; let max = 30;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCoins() { //algo evo coins
	let value = 0.05;
	return Math.floor(Math.random() + (value));
}
function initial(){
	let init = 200;
	return init;
}

module.exports.run = async (bot, message, args, connection) => {
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de donner ou de retirer de l'argent à autrui :p").then(m => m.delete(5000));
	let target = message.mentions.members.first() || message.guild.members.get(args[1]);
	if(!target) return message.channel.send("Veuillez mentionner quelqu'un à qui donner ou retirer de l'argent").then(m => m.delete(5000));
	let remove = parseInt(args[1]); //récup valeur
	if(!remove) return message.channel.send("Veuillez donner une somme à donner ou à retirer").then(m => m.delete(5000));
	const timeout = 1500;
	let msg = await message.channel.send("Transaction en cours....");
	
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql;
		
		if(rows.length < 1) {
			return;
		}else {
			let acoins = rows[0].coins;
			sql = `UPDATE user SET coins = ${acoins - remove} WHERE id = '${target.id}'`;
		}
		connection.query(sql);
	});
	setTimeout(function(){
		connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
			if(rows.length < 1) { msg.delete(); return message.channel.send("Cet utilisateur n'est pas enregistré.")};
			let bcoins = rows[0].coins;
			msg.delete();
			message.channel.send(new RichEmbed().setDescription(target + " **" + remove + "** Coin(s) vous on était retirée. \n Vous avez maintenant **" + bcoins + "** Coin(s) ! :moneybag:").setColor("#daa520"));
		});
	 }, timeout);

}

module.exports.help = {
	name: "pay-"
}
