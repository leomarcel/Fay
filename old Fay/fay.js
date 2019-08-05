/////////////////////////////////////////////////////////////////////////
//To my futur self, don't try to understand it, I didn't either
//npm install -g nodemon / nodemon index.js
//////////////////////////////////////////////////////////////////kiradtn
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var prefix = "!";
const mysql = require("mysql");
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");


connection.connect(err => { 
	if(err) {
		console.log("Deconnected to database");
		throw err;
	} 
	console.log("Connected to database !")
});

function generateXP() { //algo evo xp
	let min = 0; let max = 5;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initial(){
	let init = 200;
	return init;
}

function generateCoins() { //algo evo coins
	let value = 0.05;
	return Math.floor(Math.random() + (value));
}
bot.on("message", async message => {
	connection.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err; //arrête le programme en cas d'erreur

		let sql;
        if(rows.length < 1) {
			sql = `INSERT INTO user (id, xp, coins) VALUES ('${message.author.id}', ${generateXP()}, ${initial()})`;
			connection.query(sql);
			return;
		}else {
			let xp = rows[0].xp;
			let coins = rows[0].coins;
			sql = `UPDATE user SET xp = '${xp + generateXP()}', coins = '${coins + generateCoins()}' WHERE id = '${message.author.id}'`
			connection.query(sql);
		}
	});
});

fs.readdir("Fay/cmds/", (err, files) => { //chargement fs js
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in cmds/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("Fay/cmds/bar", (err, files) => { //chargement fs js
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in /bar/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/bar/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("Fay/cmds/modo", (err, files) => { //chargement fs js
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in /modo/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/modo/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("Fay/cmds/pay", (err, files) => { //chargement fs js
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in /pay/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/pay/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

fs.readdir("Fay/cmds/utils", (err, files) => { //chargement fs js
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands in /utils/ !`);

	jsfiles.forEach((f, i) => { //pour chaque ft, i = *
		let props = require(`./cmds/utils/${f}`); //f = function
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", () => { //mute (json)
	bot.setInterval(() => {
		for(let i in bot.mutes) {
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			let guild = bot.guilds.get(guildId);
			let member = guild.members.get(i);
			let mutedRole = guild.roles.find(r => r.name === "SADB Muted");
			if(!mutedRole) continue;

			if(Date.now() > time) {
				console.log(`${i} is now able to be unmuted!`);

				member.removeRole(mutedRole);
				delete bot.mutes[i];

				fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
					if(err) throw err;
					console.log(`I have unmuted ${member.user.tag}.`);
				});
			}
		}
	}, 5000)
});

bot.on("message", async message => { //execution commande fs js
	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = messageArray.slice(1);
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	if(!command.startsWith(prefix)) return;
	
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args, connection, prefix);
});

bot.on("message", message => { //cmd spec
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	var args = message.content.split(" ").slice(1);
	
	var user = bot.users.get(bot.user.username);
	var Hylia = bot.users.get(Hylia);

	if (message.content.startsWith(`Je t\'aime ${user}`) || message.content.startsWith(`je t\'aime ${user}`)) {
		if (message.author.id == user_Hylia) return message.reply("Je t'aime aussi ma Déesse du temps et de l'espace ! :heart:");
		if (message.author.id == user_Lussade) return message.reply(`J'aime déjà ta soeur, Hylia :smile:`);
		else message.reply("bah pas moi! :yum:");
	}
	if ((message.content.startsWith(`Fay mon amour`) || message.content.startsWith(`fay mon amour`))) {
		if (message.author.id == user_Hylia) return message.reply("Oui ma Déesse ? :heart:");
		if (message.author.id == user_Lussade) return message.reply(`Va voir Hadalia toi :smile:`);
	}
	//cmd spe
});
/*
bot.on("guildMemberAdd", member => { //msg bienvenue + role
	
	console.log(`User ` + member.user.username + ` has joined the server !`);
	var role = member.guild.roles.find('name', 'Membre');
	member.addRole(role);
	let hors_rp = "389532201575907329"; //Origins
	let hrp = "450734126010466326"; //Origins Beta

	bot.channels.get(hors_rp).send(`Bienvenue sur Origins ${member} !`);
	//bot.channels.get(hrp).send(`Bienvenue sur Origins ${member} !`);
	
	//if (guildId == 447311479788797952) {
	//	bot.channels.get(hors_rp).send(`Bienvenue sur Origins ${member} !`);
	//}
});
*/
bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));

bot.on('ready', () => console.log(`${bot.user.tag} actif !`));

bot.login(TOKEN);
