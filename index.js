const Discord = require('discord.js');
const client = new Discord.Client();

const pasto = [
  {
    nick: 'Aurigod',
  },
  {
    nick: 'Kevin',
  }
]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(!msg.guild) return

  if(msg.content === '!pasto') {
    msg.reply('Pastando no momento:')
    pasto.map((gado) => {
      msg.channel.send(`${gado.nick}`)
    })
  }
});

client.login(process.env.BOT_TOKEN);