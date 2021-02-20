const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const poll = require("./poll")
const welcome = require('./welcome')

client.on('ready', () => {
  console.log('The client is ready!')

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'membercount', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
  const privateMessage = require('./private-message')



  client.users.fetch('').then((user) => {
    user.send('Hello World!')
  })

  client.on("message", function(message){
    if(message.content.startsWith("d!embed")){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have the permissions to make an embed").then(msg=>msg.delete({timeout:"5000"}));
        let content = message.content.split(" ").slice(1).join(" ");
            let embed = new Discord.MessageEmbed()

            .setTitle("Devres Embed")
            .setColor("RED")
            .setDescription(content)
            .setFooter("Devres || Coded by ! Developer  α я ε s  マ.#0001")
            .setTimestamp();

            message.channel.send(embed);
    }





})

command(client, 'serverinfo', (message) => {
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${guild.name}"`)
      .setColor("RED")
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'Members',
          value: memberCount,
        },
        {
          name: 'Owner',
          value: owner.user.tag,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        }
      )

    message.channel.send(embed)
  })
  command(client, 'help', (message) => {

    const embed = new Discord.MessageEmbed()
      .setTitle('//Your help Title')
      .setFooter('Devres || Coded by ! Developer  α я ε s  マ.#0001')
      .setColor('RED')
      .addFields(
        {
          name: 'd!help',
          value: 'Displays Help menu',
          inline: true,
        },
        {
          name: 'd!embed',
          value: 'Sends you text that is behind the command',
          inline: true,
        },
        {
          name: 'd!serverinfo',
          value: 'displays the Serverinfo',
          inline: true,
        },
        {
          name: 'd!cc or d!clearchannel',
          value: 'clears the whole channel',
        }
      )

    message.channel.send(embed)
  })

  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been banned`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} That user has been kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  poll(client)
  welcome(client)
})



client.login(config.token)
