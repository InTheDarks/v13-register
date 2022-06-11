const { MessageEmbed, Discord } = require('discord.js')
const config = require(`../config.json`)
const moment = require("moment");
const db = require("inflames.db");

module.exports = {
    name: "unreg",
    aliases: ["kayıtsız"],
    async run(client, message, args){
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let log = client.channels.cache.find(kanal => kanal.name === config.logisim);
let embed = new MessageEmbed()
.setColor(config.embedcolor)
      
if (!message.member.roles.cache.has(config.kayıtyt) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yetkiniz Yeterli Değil")
if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`Bu Kullanıcı Senden Üstte/Aynı Permde.`)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});

let embedgenel = new MessageEmbed()
.setColor(config.embedcolor)
.setDescription(`Üye Kayıtsıza Atıldı!`)
message.reply({ embeds: [embedgenel] })
      
member.setNickname(`${config.tag} ${config.isimyaş}`).catch(e => { })
if(member.roles.cache.get(config.erkek)) {member.roles.remove(config.erkek)}
if(member.roles.cache.get(config.kız)) {member.roles.remove(config.kız)}
if(!member.roles.cache.get(config.kayıtsız)) {member.roles.add(config.kayıtsız)}

      
let logembed = new MessageEmbed()
.setColor(config.embedcolor)
.setDescription(`**Bir Üye Kayıtsıza Atıldı!**

**Kayıtsıza Atılan:** ${member} - (${member.id})
**Kayıtsıza Atan:** ${message.author} - (${message.author.id})
**Tarih:** ${moment(Date.now()).format("LLL")}
`)
log.send({ embeds: [logembed] })
}
}