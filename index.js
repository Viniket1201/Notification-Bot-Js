const Discord = require("discord.js");
const Database = require("@replit/database");
const keepAlive = require("./server");
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});
const db = new Database();
const PREFIX = "$";

client.on("ready",() => {
  console.log(`logged in ${client.user.tag}`)
})

client.on("messageCreate",(msg) => {
  if(msg.author.bot) return;
  if(msg.content === "hello" || msg.content === "Hello"){
    msg.reply("welcome to the server");
  }
  if(msg.content === "hi" || msg.content === "Hi"){
    msg.channel.send("welcome user");
  }
  if(msg.content.startsWith(PREFIX)){
    const [cmd,...arg] = msg.content.trim().substring(PREFIX.length).split(/\s+/);
    if(cmd === "kick"){
      if(arg.length === 0) return;
      const member = msg.guild.members.cache.get(arg[0]);
      if(member){
        member.kick();
      }else{
        msg.channel.send('not a user');
      }
    }

  }
})

client.on("channelCreated",(channels) => {
  channels.guild.members.cache.get(channels.id).send('Hello here!');
})
keepAlive()
client.login(process.env.TOKEN);