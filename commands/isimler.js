const { MessageEmbed, Discord } = require('discord.js')
const config = require(`../config.json`)
const moment = require("moment");
const db = require("inflames.db");

module.exports = {
    name: "isimler",
    aliases: [ "profil" ],
    async run(client, message, args){
if (!message.member.roles.cache.has(config.kayıtyt) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yetkiniz Yeterli Değil")

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send("Lütfen Bir Kullanıcı Etiketleyin.")
let isimler = db.get(`isimler.${member.id}`) || ["Bu üyenin isim verisi yok"]



var i = 1
const isimless = new MessageEmbed()
.setColor(config.embedcolor)
.setDescription(`**${member} Kişisinin Geçmiş İsimleri Listelendi!**

${isimler.map(list => `**${i++}-** ${list}`).join("\n")}

`)
message.channel.send({ embeds: [isimless] })
}
}
