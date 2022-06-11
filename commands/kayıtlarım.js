const { MessageEmbed, Discord } = require('discord.js')
const config = require(`../config.json`)
const moment = require("moment");
const db = require("inflames.db");

module.exports = {
    name: "kayıtlarım",
    aliases: [ "profilim" ],
    async run(client, message, args){
  
if (!message.member.roles.cache.has(config.kayıtyt) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yetkiniz Yeterli Değil")

db.add(`erkek.${message.author.id}`, 1)
db.add(`toplam.${message.author.id}`, 1)
db.add(`erkek`, 1)            
db.add(`toplam`, 1)   

const erkek = db.get(`erkek.${message.author.id}`) || "0"
const kız = db.get(`kız.${message.author.id}`) || "0"
const toplam = db.get(`toplam.${message.author.id}`) || "0"
 
let kayıtlarım = new MessageEmbed()
.setColor(config.embedcolor)
.setDescription(`**Bir Üye ERKEK Olarak Kaydedildi!**

**Toplam:** ${toplam}
**Erkek:** ${erkek}
**Kız:** ${kız}
`)
message.channel.send({ embeds: [kayıtlarım] })
}
}