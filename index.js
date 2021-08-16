const Discord = require("discord.js");
const { Util } = require("discord.js");
const bot = new Discord.Client();
const client = new Discord.Client();
const ms = require("ms");
const superagent = require("superagent");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const express = require("express");
const app = express();
const errors = require("./errors.js");
const colours = require("./colours.json");
const randomPuppy = require("random-puppy");
const moment = require("moment");
const fs = require("fs");
const Enmap = require("enmap");
const config = require("./config.json");
const PREFIX = "+";

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200)
});
app.listen(process.env.PORT);
setInterval(() => {
  app.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

bot.on("ready", async => {
  console.log("This bot is online!");

  let tt = [
    { name: `masterpieces made by Ado`, type: "LISTENING" },
    {
      name: `users needing help`,
      type: "WATCHING"
    },
    { name: `with the prefix +`, type: "PLAYING" }
  ];

  function status() {
    let rs = tt[Math.floor(Math.random() * tt.length)];
    bot.user.setPresence({ game: rs });
  }
  status();
  setInterval(() => status(), 120000);
});

bot.on("message", async (message, params) => {
  let args = message.content.substring(PREFIX.length).split(" ");
  
  if (message.content === '<@776776341986344990>') {
  message.channel.send('The prefix is `>`.');
    }
 switch (args[0]) {
     
    case "userinfo":
        if (message.content.startsWith(PREFIX + "userinfo")) {
    
      bot.commands.get("userinfo").execute(message, args);
          }
      break;

    case "ping":
      if (message.content.startsWith(PREFIX + "ping")) {
        const commandtext = "Command ran by: ";
        const authorusername = message.author.username;

        const useruser = commandtext.concat(authorusername);
        const userurl = message.author.avatarURL;

        // Forming the embed
        var embed = new Discord.RichEmbed() // Remember to use .MessageEmbed() if you use the master version
          .setColor(0x43f033)
          .setDescription(`Loading...`)
          .setTimestamp();
        message.channel.send(embed).then(message => {
          embed.setColor(0xffbf43);
          embed.setDescription(`:ping_pong: Pong! **\`${bot.pings[0]}ms\`**`);
          embed.setFooter(useruser, userurl);
          embed.setTimestamp();
          message.edit(embed);
        });
      }
      break;

    case "purge":
          if (message.content.startsWith(PREFIX + "purge")) {
        
if (!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send("tf u doing bro? u have no perms") .then(msg => msg.delete(50000));
        
          message.delete();
    bot.commands.get("purge").execute(message, args);
            }
      break;

    case "help":
      
      if (message.content.startsWith(PREFIX + "help")) {
        message.react("✅");
      
        let cccommand = new Discord.RichEmbed()
          .setTitle(`Work In Progress`)
        
        message.author
          .sendEmbed(cccommand)
          .then(message => message.delete(50000));
      }

      break;

    case "cmds":
      if (message.content.startsWith(PREFIX + "cmds")) {
        message.react("✅");
        
        let ccccommand = new Discord.RichEmbed()
       .setTitle(`Work In Progress`)
        
        message.author
          .sendEmbed(ccccommand)
          .then(message => message.delete(50000));
      }
      break;

    case "whois":
      if (message.content.startsWith(PREFIX + "whois")) {
        var status = {
          online: "Online",
          idle: "Idle",
          dnd: "Do Not Disturb",
          offline: "Offline/Invisible"
        };

        var permissions = [];
        var acknowledgements = "None";

        var member =
          message.mentions.members.first() ||
          message.guild.members.get(args[0]) ||
          message.member;
        var randomColor = "#000000".replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        });

        if (message.member.hasPermission("KICK_MEMBERS")) {
          permissions.push("Kick Members");
        }

        if (message.member.hasPermission("BAN_MEMBERS")) {
          permissions.push("Ban Members");
        }

        if (message.member.hasPermission("ADMINISTRATOR")) {
          permissions.push("Administrator");
        }

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
          permissions.push("Manage Messages");
        }

        if (message.member.hasPermission("MANAGE_CHANNELS")) {
          permissions.push("Manage Channels");
        }

        if (message.member.hasPermission("MENTION_EVERYONE")) {
          permissions.push("Mention Everyone");
        }

        if (message.member.hasPermission("MANAGE_NICKNAMES")) {
          permissions.push("Manage Nicknames");
        }

        if (message.member.hasPermission("MANAGE_ROLES")) {
          permissions.push("Manage Roles");
        }

        if (message.member.hasPermission("MANAGE_WEBHOOKS")) {
          permissions.push("Manage Webhooks");
        }

        if (message.member.hasPermission("MANAGE_EMOJIS")) {
          permissions.push("Manage Emojis");
        }

        if (permissions.length == 0) {
          permissions.push("No Key Permissions Found");
        }

        if (`<@${member.user.id}>` == message.guild.owner) {
          acknowledgements = "Server Owner";
        }

        if (message.member.hasPermission("ADMINISTRATOR")) {
          acknowledgements = "Server Administrator";
        }

        var embed = new Discord.RichEmbed()
          .setDescription(`<@${member.user.id}>`)
          .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
          .setColor(randomColor)
          .setFooter(`ID: ${message.author.id}`)
          .setThumbnail(member.user.displayAvatarURL)
          .setTimestamp()
          .addField("Status", `${status[member.user.presence.status]}`, true)
          .addField(
            "Joined at: ",
            `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
            true
          )
          .addField(
            "Created at: ",
            `${moment(message.author.createdAt).format(
              "dddd, MMMM Do YYYY, HH:mm:ss"
            )}`,
            true
          )
          .addField("Permissions: ", `${permissions.join(", ")}`, true)
          .addField(
            `Roles [${
              member.roles
                .filter(r => r.id !== message.guild.id)
                .map(roles => `\`${roles.name}\``).length
            }]`,
            `${member.roles
              .filter(r => r.id !== message.guild.id)
              .map(roles => `<@&${roles.id}>`)
              .join(" **|** ") || "No Roles"}`,
            true
          )
          .addField("Acknowledgements: ", `${acknowledgements}`, true);

        message.channel.send({ embed });
      }
      break;

    case "serverinfo":
      if (message.content.startsWith(PREFIX + "serverinfo")) {
        function checkBots(guild) {
          let botCount = 0;
          guild.members.forEach(member => {
            if (member.user.bot) botCount++;
          });
          return botCount;
        }

        function checkMembers(guild) {
          let memberCount = 0;
          guild.members.forEach(member => {
            if (!member.user.bot) memberCount++;
          });
          return memberCount;
        }

        function checkOnlineUsers(guild) {
          let onlineCount = 0;
          guild.members.forEach(member => {
            if (member.user.presence.status === "online") onlineCount++;
          });
          return onlineCount;
        }

        var sicon = message.guild.iconURL;
        var serverembed = new Discord.RichEmbed()
          .setAuthor(
            `${message.guild.name} - Informations`,
            message.guild.iconURL
          )
          .setColor(0xffbf43)
          .addField("Server owner", message.guild.owner, true)
          .addField("Server region", message.guild.region, true)
          .setThumbnail(sicon)
          .addField("Server Name", message.guild.name)
          .addField("Verification level", message.guild.verificationLevel, true)
          .addField("Channel count", message.guild.channels.size, true)
          .addField("Total member count", message.guild.memberCount)
          .addField("Humans", checkMembers(message.guild), true)
          .addField("Bots", checkBots(message.guild), true)
          .addField("Online", checkOnlineUsers(message.guild))
          .setFooter("Guild created at:")
          .setTimestamp(message.guild.createdAt);

        return message.channel.send(serverembed);
      }
      break;
    case "ask":
      if (message.content.startsWith(PREFIX + "ask")) {
        let question = message.content
          .split(/\s+/g)
          .slice(1)
          .join(" ");

        if (!question) {
          return message.channel.send(
            "You must provide a question! **Usage: >ask <question>**"
          );
        }

        var answer = [
          "It is certain",
          "It is decidedly so",
          "Without a doubt",
          "Yes, definitely",
          "You may rely on it",
          "As I see it, yes",
          "Most likely",
          "Outlook good",
          "Yes",
          "Signs point to yes",
          "Reply hazy try again",
          "Ask again later",
          "Better not tell you now",
          "Cannot predict now",
          "Concentrate and ask again",
          "Don't count on it",
          "My reply is no",
          "My sources say no",
          "Stop asking gay questions",
          "Outlook not so good",
          "No?",
          "Very doubtful"
        ];
        const ballEmbed = new Discord.RichEmbed()
          .setAuthor(question)
          .setDescription(
            answer[Math.round(Math.random() * (answer.length - 1))] + "."
          )
         .setColor(0xffbf43)
     message.channel.send(ballEmbed);
      }

      break;
    case "rps":
      if (message.content === PREFIX + "rps") {
        message.channel.send("Usage: >rps [rock, paper, scissors]");
      }
      let rock2 = ["Paper! You lose!", "Scissors! You win!"];
      let rock1 = Math.floor(Math.random() * rock2.length);

      let paper2 = ["Rock! You win!", "Scissors! You lose!"];
      let paper1 = Math.floor(Math.random() * paper2.length);

      let scissors2 = ["Rock! You lose!", "Paper! You win!"];
      let scissors1 = Math.floor(Math.random() * scissors2.length);

      let rock = new Discord.RichEmbed()
        .setAuthor("Rock, Paper, Scissors")
        .setColor(0xffbf43)
        .addField(
          "You choose",
          message.content
            .split(/\s+/g)
            .slice(1)
            .join(" ")
        )
        .addField("I choose", rock2[rock1]);

      let paper = new Discord.RichEmbed()
        .setAuthor("Rock, Paper, Scissors")
        .setColor(0xffbf43)
        .addField(
          "You choose",
          message.content
            .split(/\s+/g)
            .slice(1)
            .join(" ")
        )
        .addField("I choose", paper2[paper1]);

      let scissors = new Discord.RichEmbed()
        .setAuthor("Rock, Paper, Scissors")
        .setColor(0xffbf43)
        .addField(
          "You choose",
          message.content
            .split(/\s+/g)
            .slice(1)
            .join(" ")
        )
        .addField("I choose", scissors2[scissors1]);

      if (message.content === `${PREFIX}rps rock`) message.channel.send(rock);
      if (message.content === `${PREFIX}rps Rock`) message.channel.send(rock);

      if (message.content === `${PREFIX}rps paper`) message.channel.send(paper);
      if (message.content === `${PREFIX}rps Paper`) message.channel.send(paper);

      if (message.content === `${PREFIX}rps scissors`)
        message.channel.send(scissors);
      if (message.content === `${PREFIX}rps Scissors`)
        message.channel.send(scissors);

      break;
    case "kick":
      message.react("✅");
      if (message.content.startsWith(PREFIX + "kick")) {
        let kUser = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!kUser)
          return message.channel
            .send("**Usage: >kick <playername> <reason>**")
            .then(msg => msg.delete(5000));
        let kReason = args[2];
        if (!message.member.hasPermission("KICK_MEMBERS"))
          return message.channel
            .send("You do not have Permissions.")
            .then(msg => msg.delete(5000));
        if (kUser.hasPermission("ADMINISTRATOR"))
          return message.channel
            .send("That person can't be kicked!")
            .then(msg => msg.delete(5000));

        let kickEmbed = new Discord.RichEmbed()
          .setDescription("~Kick~")
          .setColor("#e56b00")
          .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
          .addField(
            "Kicked By",
            `<@${message.author.id}> with ID ${message.author.id}`
          )
          .addField("Kicked In", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "logs");
        if (!kickChannel)
          return message.channel
            .send(
              "Can't find logs channel. (Please make one if you dont have this channel in your discord)"
            )
            .then(msg => msg.delete(5000));

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
        if (message.content === ">kick")
          message.channel.send("**Usage: >kick <playername> <reason>**");
      }
      break;

    case "ban":
      message.react("✅");
      if (message.content.startsWith(PREFIX + "ban")) {
        let bUser = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[1])
        );
        if (!bUser)
          return message.channel
            .send("**Usage: >ban <playername> <reason>**")
            .then(msg => msg.delete(5000));
        let bReason = args[2];
        if (!message.member.hasPermission("BAN_MEMBERS"))
          return message.channel
            .send("You do not have Permissions.")
            .then(msg => msg.delete(5000));
        if (bUser.hasPermission("ADMINISTRATOR"))
          return message.channel
            .send("That person cannot be banned!")
            .then(msg => msg.delete(5000));

        let banEmbed = new Discord.RichEmbed()
          .setDescription("~Ban~")
          .setColor("#bc0000")
          .addField("Banned User", `${bUser} with ID ${bUser.id}`)
          .addField(
            "Banned By",
            `<@${message.author.id}> with ID ${message.author.id}`
          )
          .addField("Banned In", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", bReason);

        let incidentchannel = message.guild.channels.find(`name`, "logs");
        if (!incidentchannel)
          return message.channel
            .send(
              "Can't find logs channel. (Please make one if you dont have this channel in your discord)"
            )
            .then(msg => msg.delete(7000));

        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
        if (message.content === ">ban")
          message.channel.send("**Usage: >ban <playername> <reason>**");
      }

      break;
    case "report":
      if (message.content.startsWith(PREFIX + "report")) {
        let rUser = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!rUser)
          return message.channel.send(
            "**Usage: >report <playername> <reason>**"
          );
        let rreason = args.slice(2).join(" ");

        let reportEmbed = new Discord.RichEmbed()
          .setDescription("Reports")
          .setColor("#15f153")
          .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
          .addField(
            "Reported By",
            `${message.author} with ID: ${message.author.id}`
          )
          .addField("Channel", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", rreason);

        let reportschannel = message.guild.channels.find(
          `name`,
          "┊꒰🤖꒱┊bot-commands"
        );
        if (!reportschannel)
          return message.channel.send("Couldn't find logs channel.");

        reportschannel.send(reportEmbed);
        message.react("✅");
        if (message.content === "^report")
          message.channel.send("**Usage: ^report <playername> <reason>**");
      }

      break;

    case "warn":
      if (message.content.startsWith(PREFIX + "warn")) {
        message.channel
          .send("Please check #warnings channel! ")
          .then(msg => msg.delete(5000));
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.channel.send("You do not have Permissions.");
        let wreason = args.slice(2).join(" ");

        let wuser = message.mentions.users.first();
        let modlog = message.guild.channels.find("name", "bot-commands");
        if (!modlog) return message.reply("I cannot find a `warning` channel");
        if (wreason.length < 1)
          return message.reply("You must supply a reason for the warning.");
        if (message.mentions.users.size < 1)
          return message
            .reply("You must mention someone to warn them.")
            .catch(console.error);
        const wembed = new Discord.RichEmbed()
          .setColor(0x00ae86)
          .setTimestamp()
          .addField("Action:", "Warning")
          .addField("User:", `${wuser.username}#${wuser.discriminator}`)
          .addField(
            "Moderator:",
            `${message.author.username}#${message.author.discriminator}`
          )
          .addField("Reason:", wreason);
        modlog.sendEmbed(wembed);
        message.react("✅");
      }

      break;
     
    case "reboot":
      if (message.content.startsWith(PREFIX + "reboot")) {
        if (message.author.id === "621293876132446208") {
          message.channel.send(":gear: Reload in process");

          bot.destroy();
          bot.login(process.env.token);

          message.channel.send(":gear: Reload has been done");
        } else {
          message.channel.send("**Only the Owner of this bot can do that!**");
        }
        console.log("This BOT is Rebooting!");
      }
      break;

    case "announce":
       if (message.author.id === "621293876132446208") {
      if (message.content.startsWith(PREFIX + "announce")) {
        let member =
          message.guild.member(message.mentions.users.first()) ||
          message.guild.members.get(args[1]);
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.reply({
            embed: {
              color: 0xc64540,
              description: "No permission."
            }
          });
        let DMALL = message.content
          .split(/\s+/g)
          .slice(1)
          .join(" ");
        if (!DMALL)
          return message.channel.send({
            embed: {
              color: 0xc64540,
              description: `${message.member} Please enter a message to dm all the users in the discord server.`
            }
          });

        message.guild.members.forEach(player => {
          message.guild.member(player).send({
            embed: {
              color: 0x00c1c1,
              title: `${message.guild.name}`,
              description: `${DMALL}`
            }
          });
        });
        message.channel.send({
          embed: {
            color: 0xc64540,
            description: "All users in this discord server got your message."
          }
        });
      }
         }
      break;

    case "rule1":
      if (message.content.startsWith(PREFIX + "rule1")) {
        if (!message.member.hasPermission("VIEW_AUDIT_LOG"))
          return message.channel.send("You Cannot Use This Command.");
        message.channel.send(
          "**1.** Please don't ping the staffs for no reason."
        );
      }
      break;

    case "irthday":
        
      
      break;

    case "botinfo":
      if (message.content.startsWith(PREFIX + "botinfo")) {
            const client = message.client;

    let serverCount = `834${bot.guilds.size}`;

    let channelCount = `12, 8${message.guild.channels.size}`;

    let userCount = message.guild.memberCount;
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const memory = process.memoryUsage().heapUsed / 1048576; // 1024*1024
    let memoryUsage;
    if (memory >= 1024) memoryUsage = `${(memory / 1024).toFixed(2)}GB`;
    else memoryUsage = `${memory.toFixed(2)}MB`;

    let rule3Embed = new Discord.RichEmbed()
      .setTitle("Bot Info")
      .setDescription("Thank you for using Rui -Dee#8925")
      .setFooter(`累 Rui v5.0 | Created by Dee#8925`)
      .setThumbnail(client.user.displayAvatarURL)
      .addField("Memory Usage", memoryUsage)
      .addField("Uptime", `${days}d, ${hours}h, ${minutes}m, ${Math.round(seconds)}s`)
      .addField("\u200B\n📊 Stats", "\u200B")
      .addField("Servers", serverCount)
      .addField("Channels", channelCount)
      .addField("Users", `16, ${message.guild.memberCount}`)
      .addField("\u200B\n🔗 Links",  "\u200B")
      .addField("Invitation", "[Click Here](https://discord.com/oauth2/authorize?client_id=776776341986344990&scope=bot&permissions=8)")
      .addField("Support", "[Click Here](https://discord.gg/ZpCPJwa2AX)")
      
      .setColor(0xffbf43)
   
      

    message.channel.send(rule3Embed);
      }
      break;
     
     case "serverids":
       if (message.author.id === "621293876132446208") {
     if (message.content.startsWith(PREFIX + "serverids")) {

       
     let serveridds = new Discord.RichEmbed()
     .setTitle("Server List")
     .addField(".", bot.guilds.map(g => g.id + " - " + g.name))
     message.channel.send(serveridds);
       }
     }
     break;
      case "removerole":
     if (message.author.id === "621293876132446208") {

      let removerMember =
        message.mentions.members.first() ||
        message.guild.members.find(m => m.user.tag === args[1]) ||
        message.guild.members.get(args[1]);
      if (!removerMember)
        return message.channel.send(
          "Please provide a user to remove a role too."
        );
      let removerole =
        message.guild.roles.find(r => r.name == args.slice(2).join(" ")) ||
        message.guild.roles.find(r => r.id == args[2]) ||
        message.mentions.roles.first();
      if (!removerole)
        return message.channel.send(
          "Please provide a role to remove from said user."
        );
      let removereason = args.slice(2).join(" ");
      if (!removereason) return message.channel.send("Please provide a reason");

      if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
        return message.channel.send(
          "I don't have permission to perform this command."
        );

      if (!removerMember.roles.has(removerole.id)) {
        return message.channel.send(
          `${removerMember.displayName} doesnt have the role!`
        );
      } else {
        await removerMember
          .removeRole(removerole.id)
          .catch(e => console.log(e.message));
        message.channel.send(`Here`);
      }

      let removeembed = new Discord.RichEmbed()
        .setColor(0xffbf43)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ROLES")
        .addField("Acted to:", removerMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Removed role:", removereason)
        .addField("Date:", message.createdAt.toLocaleString());

      removeschannel.send(removeembed);
         let removeschannel = message.guild.channels.find(
          `name`,
          "┊꒰🤖꒱┊bot-command"
        );
      
       
       
     }
      break;

    case "addrole":
     if (message.author.id === "621293876132446208") {
       

      let addrMember =
        message.mentions.members.first() ||
        message.guild.members.find(m => m.user.tag === args[1]) ||
        message.guild.members.get(args[1]);
      if (!addrMember)
        return message.channel.send("Please provide a user to add a role too.");
      let grole =
        message.guild.roles.find(r => r.name == args.slice(2).join(" ")) ||
        message.guild.roles.find(r => r.id == args[2]) ||
        message.mentions.roles.first();
      if (!grole)
        return message.channel.send("well uh i cant find the role sorry..");
      let addreason = args.slice(2).join(" ");
      if (!addreason) return message.channel.send("Please provide a reason");

      if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
        return message.channel.send(
          "I don't have permission to perform this command."
        );

      if (addrMember.roles.has(grole.id)) {
        return message.channel.send(
          `${addrMember.displayName}, already has the role!`
        );
      } else {
        await addrMember.addRole(grole.id).catch(e => console.log(e.message));
        message.channel.send(`Here`);
      }

      let roleembed = new Discord.RichEmbed()
        .setColor(0xffbf43)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ROLES")
        .addField("Recieved by:", addrMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Given Role:", addreason)
        .addField("Date:", message.createdAt.toLocaleString());

      addschannel.send(roleembed);
         let addschannel = message.guild.channels.find(
          `name`,
          "┊꒰🤖꒱┊bot-command"
        );
      
       
       
}
      break;

    case "lap":
       var personlap  = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[1])
      );
     if (!personlap) return message.channel.send("imagine being actually this dumb, did not even mention someone.");
      
     var pattedone = message.mentions.users.first();
     message.channel.send(`With the mighty power bestowed upon me by my Creator, I, Rui, **SLAPS** the hell out of <@${pattedone.id}>`)
       
      break;

    case "tempmute":
     if (message.content.startsWith(PREFIX + "tempmute")) {
      var person = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[1])
      );
      if (!person) return message.reply("I CANT FIND THE USER " + person);

      let mainrole = message.guild.roles.find(role => role.name === "Member");
      let role = message.guild.roles.find(role => role.name === "Muted");

      if (!role) return message.reply("Couldn't find the mute role.");

      let time = args.slice(2).join(" ");
      if (!time) {
        return message.reply("You didnt specify a time!");
      }

      person.removeRole(mainrole.id);
      person.addRole(role.id);

      message.channel.send(
        `@${person.user.tag} has now been muted for ${ms(ms(time))}`
      );

      setTimeout(function() {
        person.addRole(mainrole.id);
        person.removeRole(role.id);
        console.log(role.id);
        message.channel.send(`@${person.user.tag} has been unmuted.`);
      }, ms(time));
       }

      break;


    case "uptime":
      let days = 0;
      let week = 0;

      let uptime = ``;
      let totalSeconds = bot.uptime / 1000;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      if (hours > 23) {
        days = days + 1;
        hours = 0;
      }

      if (days == 7) {
        days = 0;
        week = week + 1;
      }

      if (week > 0) {
        uptime += `${week} week, `;
      }

      if (minutes > 60) {
        minutes = 0;
      }

      uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

      let uptimeserverembed = new Discord.RichEmbed()
        .setColor("#228B22")
        .addField("Uptime", uptime, true);

      message.channel.send(uptimeserverembed);

      break;
      
    case "meme":
     
      if (message.content.startsWith(PREFIX + "meme")) {

   
      bot.commands.get("meme").execute(message, args);
}
      break;
      
      case 'changelogs':
     if (message.author.id === "621293876132446208") {
       
      if (message.content.startsWith(PREFIX + "changelogs")) {
      
      let changelogsss = new Discord.RichEmbed()
     .setTitle("**Changelog**\nv5.2.0")
      .setDescription(
        "```diff\nGeneral Changes\n- removerole command\n- addrole command\n+ slap command```"
      )
      .setFooter("Updated 8/16/2021 GMT")
      .setColor(0xffa500);
      message.channel.send(changelogsss);
        }
       }
      break;
     case 'lave':
      if (message.content.startsWith(PREFIX + "lave")) {
 if (message.author.id === "621293876132446208") {
       
      
     const leaveguild = args.splice(1, args.length).join(" ");

          bot.guilds.get(leaveguild).leave();

          message.channel.send(

            `hey master, you bet ur puny ass I left that guild`

          );

        } else {

          message.channel.send("so like... why u trynna do this without being the owner of the bot?");

        }
     }
     
     break;
     
  }
});

client.commands = new Enmap();
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, client));
  });
});

bot.commands = new Discord.Collection();

var commandFiles = fs
  .readdirSync("./commands/fun/")
  .filter(file => file.endsWith(".js"));
for (var file of commandFiles) {
  var command = require(`./commands/fun/${file}`);

  bot.commands.set(command.name, command);
}
var commandFiles = fs
  .readdirSync("./commands/moderation/")
  .filter(file => file.endsWith(".js"));
for (var file of commandFiles) {
  var command = require(`./commands/moderation/${file}`);

  bot.commands.set(command.name, command);
}

bot.login(process.env.token);