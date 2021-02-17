module.exports = (client) => {
    const channelId = '811355120918462467' // welcome channel
    const targetChannelId = '811317438876614747' // rules and info
  
    client.on('guildMemberAdd', (member) => {
      const message = `Please welcome <@${
        member.id
      }> to the server! Please read ${member.guild.channels.cache
        .get(targetChannelId)
        .toString()}`
  
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
    })
}