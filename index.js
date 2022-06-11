const { Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Collection } = require('discord.js')
const { prefix } = require('./config.json')
const client = new Client({ intents: 32767 })
const fs = require('fs')
const config = require("./config.json")
const moment = require("moment");
require("moment-duration-format");





client.files = fs.readdirSync;
client.on('ready', async () => {
    client.user.setPresence({ activities:[{ name: config.durum }], status: config.status })
})
const path = require('path');

client.on('messageCreate', async message => {
    try{
        let client = message.client
        if (message.author.bot) return
        if (message.channel.type == "DM") return
        if (!message.content.startsWith(prefix)) return
        let command = message.content.split(' ')[0].slice(prefix.length)
        let params = message.content.split(' ').slice(1)
        let cmd
        if (client.commands.has(command)) {
            cmd = client.commands.get(command)
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command))
        }
        if (cmd) {
            cmd.run(client, message, params)
        }
    }catch(e){
        message.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Beklenmedik bir hatayla karşılaştık!**`)
        ] })
        console.log(e)
    }
})

const log = message => {
    console.log(`${message}`)
}

client.aliases = new Collection()
client.commands = new Collection()
fs.readdir('./commands/', (err, files) => {
    if(!files) return console.log(`Commands klasörü mevcut degil!`)
    if (err) console.error(err)
    log(`${files.length} komut yüklenecek.`)
    files.forEach(f => {
        let props = require(`./commands/${f}`)
        console.log('\x1b[36m',`[InTheDark] ${props.name}.`)
        client.commands.set(props.name, props)
        props.aliases.forEach(alias => {
            client.aliases.set(alias, props.name)
        })
    })
})

client.login(config.token).then(() => console.log('\x1b[31m%s\x1b[0m',"[InTheDark] Baglanma Başarılı!")).catch(e => {
    console.log(e)
    console.log('\x1b[31m%s\x1b[0m',"[InTheDark] Baglanma Başarısız!")
    process.exit(1)
})


client.on('guildMemberAdd', async member => {



  let embed = new MessageEmbed()
    .setAuthor(member.guild.name)
    .setColor(config.embedcolor)


 const kurulus = new Date().getTime() - member.user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 432000000) kontrol = `Yeni Oluşturulmuş :x:`
  if (kurulus > 432000000) kontrol = `Güvenli :white_check_mark:`

  
    let memberGün = moment(member.user.createdAt).format("DD");
    let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
    let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
  
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-999])/g)
  if (üs) {
    üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
      return {
        "0": `0`,
        "1": `1`,
        "2": `2`,
        "3": `3`,
        "4": `4`,
        "5": `5`,
        "6": `6`,
        "7": `7`, 
        "8": `8`,
        "9": `9`
      }[d];
    })
  }
  const teyitkanali1 = member.guild.channels.cache.get(config.kayıtkanalı)
  const kurallar = member.guild.channels.cache.get(config.kurallar);

    member.setNickname(`${config.tag} ${config.isimyaş}`)
    member.roles.add(config.kayıtsız)

       let embedss = new MessageEmbed()

    teyitkanali1.send({ embeds: [embedss.setDescription(`**-** **${member.guild.name}** Hoş geldin.\n
**-** ${member} Biz de seni bekliyorduk. Sunucumuz seninle birlikte **${member.guild.memberCount}** kişi oldu!\n
**-** Hesabın __${memberGün} ${memberAylar} ${memberTarih}__ tarihinde oluşturulmuş. Hesabın: `+kontrol+`\n
    **-** Sunucu kurallarımız ${kurallar} kurallar kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza-i işlemler kurallarını okuduğunu varsayarak gerçekleştirilecek.\n
    **-** <@&${config.kayıtyt}> Rollerine sahip yetkililer sizinle ilgilenecektir, lütfen sese geçiniz ve seste teyit veriniz. 
`)]})


  
})

          


