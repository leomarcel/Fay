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
	let target = message.mentions.members.first(); //|| message.guild.members.get(args[1]);
	if(!target) return message.channel.send("Veuillez mentionner quelqu'un à qui transferer de l'argent").then(m => m.delete(5000));
	let add = parseInt(args[1]); //récup valeur
	if(!add) return message.channel.send("Veuillez donner une somme à donner / payer").then(m => m.delete(5000));
	if (target.id == message.author.id) return message.channel.send("Non, tu ne te transféras pas de l'argent à toi-même :rolling_eyes:");
	let remove = add;
	const timeout = 1500;
	let msg = await message.channel.send("Transaction en cours....");
	
	connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql;
		
		if(rows.length < 1) {
			return;
		}else {
			let acoins = rows[0].coins;
			sql = `UPDATE user SET coins = ${acoins - remove} WHERE id = '${message.author.id}'`;
		}
		connection.query(sql);
	});
	connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur
		let sql; let sq1;
		
		if(rows.length < 1) {
			return;
		}else {
			let bcoins = rows[0].coins;
			sql = `UPDATE user SET coins = ${bcoins + add} WHERE id = '${target.id}'`;
		}
		//connection.query(sql, sql);
		connection.query(sql);
	});
	setTimeout(function(){
		connection.query(`SELECT * FROM user WHERE id = '${target.id}'`, (err, rows) => {
			if(rows.length < 1) { msg.delete(); return message.channel.send("Cet utilisateur n'est pas enregistré.")};
			let bcoins = rows[0].coins;
			msg.delete();
			message.channel.send(new RichEmbed().setDescription(target + " Vous avez obtenu **" + add + "** Coin(s) de la part de " + message.author + "\n Vous avez maintenant **" + bcoins + "** Coin(s) ! :moneybag:").setColor("#daa520"));
		});
		connection.query(`SELECT * FROM user WHERE id = ${message.author.id}`, (err, rows) => {
			if(rows.length < 1) { return message.channel.send("Cet utilisateur n'est pas enregistré.")};
			let ccoins = rows[0].coins;
			message.channel.send(new RichEmbed().setDescription(message.author + " Il vous reste **" + ccoins + "** Coin(s) ! :moneybag:").setColor("#daa520"));
		});
	 }, timeout);
}

module.exports.help = {
	name: "pay"
}