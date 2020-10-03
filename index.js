const Discord = require('discord.js');
const client = new Discord.Client();

const pasto = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg  => {
  try {
    if(!msg.guild) return

    if(msg.content.startsWith('!gado')) {
      const user = msg.mentions.users.first()
      if(user && !user.bot) {
        const member = msg.guild.member(user)
        const dataAtual = new Date()

        if(member) {
          const cargoGado = msg.guild.roles.cache.find(role => role.id === '648574586702528561')
          member.roles.add(cargoGado)

          member._roles.map(role => {
            member.roles.remove(role)
          })

          pasto.push({
            id: member.user.id,
            nick: member.user.username,
            entrada: formataData(dataAtual),
            saida: calculaSaida(dataAtual),
            roles: member._roles
          })
        }
      } else {
        msg.reply('Um bot não pode pastar seu jão');
      }
    }
  } catch(e) {
    console.log('Erro:', e)
  }

  if(msg.content.startsWith('!boi')) {
    const user = msg.mentions.users.first()
    if(user && !user.bot){
      const member = msg.guild.member(user)
      if(member) {
        const gado = pasto.find(user => user.id === member.user.id)
        if(gado) {
          msg.channel.send(`Boi: **${gado.nick}**`) // Trocar por marcação
          msg.channel.send(`Entrou no pasto em **${gado.entrada}**`)
          msg.channel.send(`A Saida será em **${gado.saida}**`)
        }
      }
    }
  }

  if(msg.content === '!pasto') {
    if(pasto.length > 0) {
      msg.channel.send('Pastando no momento:')
      pasto.map((gado) => {
        msg.channel.send(`🐮 ${gado.nick}`)
      })
    } else {
      msg.reply('Pasto vazio 🎉')
    }
  }
});

function formataData(data) {
  return `${data.getDate()}.${data.getMonth()+1}.${data.getFullYear()}`
}

function calculaSaida(dataEntrada){
  dataEntrada.setDate(dataEntrada.getDate()+7)
  const dataSaidaFormatada = formataData(dataEntrada)
  return dataSaidaFormatada
}

client.login(process.env.BOT_TOKEN)
