const Discord = require('discord.js');
const client = new Discord.Client();

const pasto = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg  => {
  try {
    if(!msg.guild) return

    // Coloca boi no pasto
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
        msg.channel.send(`O boi **${member.user.username}** foi pastar`)
      } else {
          msg.reply('Um bot não pode pastar seu jão');
      }
    }
  } catch(e) {
    msg.reply('Chama o vaqueiro que o zéGado ta sem permissão')
    console.log('Erro:', e)
  }

  // Mostra informações do boi
  if(msg.content.startsWith('!boi')) {
    const user = msg.mentions.users.first()
    if(user && !user.bot){
      const member = msg.guild.member(user)
      try {
        if(member) {
          const gado = pasto.find(user => user.id === member.user.id)
          msg.channel.send(`Boi: **${gado.nick}**`) // Trocar por marcação
          msg.channel.send(`Entrou no pasto em **${gado.entrada}**`)
          msg.channel.send(`A Saida será em **${gado.saida}**`)
        }
      } catch (e) {
        msg.reply('Esse boi ai não ta no pasto')
        console.log('Erro:', e)
      }
    }
  }

  // mostra quem está pastando
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

  //Mostra comandos principais
  if(msg.content === '!help') {
    msg.channel.send('Comece os comandos com ❕')
    msg.channel.send('**gado** @jagunço -> coloca no pasto')
    msg.channel.send('**boi** @jagunço -> Mostra quando jagunço sai do pasto')
    msg.channel.send('**pasto** -> Mostra quem tá pastando')
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
