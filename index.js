const Discord = require('discord.js');
const client = new Discord.Client();

const pasto = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if(!msg.guild) return

  if(msg.content.startsWith('!gado')) {
    const user = msg.mentions.users.first()

    if(user) {
      const member = msg.guild.member(user)
      const dataAtual = new Date()
    
      if(member) {
        pasto.push({
          nick: member.user.username,
          entrada: formataData(dataAtual),
          saida: calculaSaida(dataAtual)
        })
      }
    }
  }

  if(msg.content === '!pasto') {
    msg.channel.send('Pastando no momento:')
    pasto.map((gado) => {
      msg.channel.send(`Boi: ${gado.tag}`)
      msg.channel.send(`Entrou no pasto em ${gado.entrada}`)
      msg.channel.send(`Pastando até ${gado.saida}`)
      msg.channel.send(`--------------------`)
    })
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