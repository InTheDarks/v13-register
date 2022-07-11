const { MessageEmbed, Discord } = require('discord.js')
const config = require(`../config.json`)
const moment = require("moment");
const db = require("inflames.db");

module.exports = {
    name: "isim",
    aliases: [],
    async run(client, message, args){
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let Name = args[1]
let Age = args[2]
let log = client.channels.cache.find(kanal => kanal.name === config.logisim);
let embed = new MessageEmbed()
.setColor(config.embedcolor)
      
if (!message.member.roles.cache.has(config.kayıtyt) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yetkiniz Yeterli Değil")     
if (!member || !Age || !Name) return message.reply({ embeds: [embed.setDescription(`:x: **[HATA]** Yanlış Kullanım \`Örnek: .isim <@Kullanıcı/ID> Isim Yaş\` `)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
if (!Age || isNaN(Age)) return message.reply({ embeds: [embed.setDescription("Geçerli Bir Yaş Belirleyin!")] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
if (Name.lenght > 12) return message.reply(`Uzunluk 12 den Fazla Olamaz!`).then(msg => {setTimeout(() => msg.delete(), 5000);});
if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`Bu Kullanıcı Senden Üstte/Aynı Permde.`)] }).then(msg => {setTimeout(() => msg.delete(), 5000);});
let isimler = db.get(`isimler.${member.id}`) || ["Bu üyenin isim verisi yok"]
var i = 1
let embedgenel = new MessageEmbed()
.setColor(config.embedcolor)
.setDescription(`Üyenin İsmini \`${config.tag} ${Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}${Age ? ` | ${Age}` : ``}\` Olarak Degiştirdim. Eger Bu Üye Daha Önce Kaydolduysa Eski İsimleri Altta Çıkacaktır. 

${isimler.map(list => `**${i++}-** ${list}`).join("\n")}

`)
message.reply({ embeds: [embedgenel] })
      
db.push(`isimler.${member.id}`,`${config.tag} ${Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}${Age ? ` | ${Age}` : ``}`) 
member.setNickname(`${config.tag} ${Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}${Age ? ` | ${Age}` : ``}`).catch(e => { })
  

let logembed = new MessageEmbed()
.setColor(config.embedcolor)
.setDescription(`**Bir Üyenin İsmi Degiştirildi!**

**İsim Degiştirilen:** ${member} - (${member.id})
**İsim Degiştiren:** ${message.author} - (${message.author.id})
**Tarih:** ${moment(Date.now()).format("LLL")}
`)
log.send({ embeds: [logembed] })
}
}
