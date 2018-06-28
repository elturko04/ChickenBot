const Discord = require("discord.js");
const client = new Discord.Client()
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("database.json")
const db = low(adapter);


var prefix = ("*");
var info_embed = new Discord.RichEmbed()

client.on("ready", () => {
    client.user.setPresence({ game: { name: " Regarde [*aide] ChickenBot" , type: 0} });
    console.log("ChickenBot activer !");
});

client.login("NDU5NzQ4ODM1MTExOTkzMzQ1.DhDHtQ.Ng0gx_OMn62CZR2AcX8s76MgRWw");

client.on("message", message => {
    if (message.content === "Chicken"){
        message.reply("J'aime bien le KFC https://cdn.discordapp.com/attachments/461018288034414592/461468584535785482/image.jpg");
        console.log("chicken kfc ");
             
    }
        if (message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
            .setColor("#D9F200")
            .setTitle("Voici mes commandes d'aide :D")
            .setThumbnail(message.author.avatarURL)
            .setDescription("je suis un bot POULET :D Voici mes commandes ! ")
            .addField("*aide", "Affiche les commandes du bot !")
            .addField("Chicken", "Le bot Répond (J'aime bien le KFC) !")
            .addField( "*stats", "Le bot vous envoie vos informations sur votre profil !")
            .addField("*info", "Le bot envoie les infos du serveur")
            .addField("MODERATION-ADMINISTRATION")
            .addField("*kick", "Permet de kick un membre du serveur")
            .addField("*Ban", "Permet de ban un membre du serveur")
            .addField("*clear", "Permet de supprimer plusieur messages à la fois")
            .addField("*warn", "Permet d'avertire un membre !")
            .addField("*seewarns", "Permet de regarder les avrtisement d'un membre !")
            .addField("*deletewarns", "Permet d'effacer les avertissements d'un membre")
            .addField("*mute", "Permet de mute un membre !")
            .addField("*unmute", "Permet de demute un membre !")
            .setFooter("Menu D'aide du Bot Chicken")
        message.channel.sendEmbed(help_embed);
        console.log("Commande Help demandée !");
        }

if(message.content === prefix + "info") {
   var info_embed = new Discord.RichEmbed()
   .setColor("#D9F200")
   .setTitle("Voici les informations sur moi et le sereur !")
   .addField(" :robot: Non :", `${client.user.tag}`, true)
   .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
   .addField("ID :id: ", `${client.user.id}`)
   .addField("Nombre de membres", message.guild.members.size)
   .addField("Nombre de catégories et de salons", message.guild.channels.size)
   .setFooter("Info serveur - moi")
   message.channel.sendMessage(info_embed)
   console.log("Un utilisateur à effectué la commande D'info")
}
        
        if(message.content.startsWith(prefix + "kick")) {
            if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de !");

            if(message.mentions.users.size === 0) {
                return message.channel.send("Vous devez mentionner un utilisateur")
            }
            var kick = message.guild.member(message.mentions.users.first());
            if(!kick) { 
                return message.channel.send("Je ne sais pas si l'utilisateur existe ")
        }
if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    return message.channel.send("Je n'ai pas la permission pour kick");

    }
kick.kick().then(member => {
    message.channel.send(`${member.user.username} a etait kick par ${message.author.username}`)
    });

}



if(message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission"); 

    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionnez un utilisateur");
    }
    var ban = message.guild.member(message.mentions.users.first());
    if(!ban) {
        return message.channel.send("Je ne sais pas si l'utilisateur existe");
    }
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send("Je n'ai pas la permission pour ban");
    }    
    ban.ban().then(member => {
        message.channel.send(`${member.user.username} est ban par ${message.author.username} !`) 
    });
}
    
if(message.content.startsWith(prefix + "clear")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permision !");

    let args = message.content.split(" ").slice(1);

    if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer")
    message.channel.bulkDelete(args[0]).then(() => {
       message.channel.send(`${args[0]} messages ont été supprimer !`);
    })    
   
}

if(message.content.startsWith(prefix + "mute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

    if(message.mentions.users.size === 0) {
        return message.channel.send('Vous devez mentionner un utilisateur !');
    }

    var mute = message.guild.member(message.mentions.users.first());
    if(!mute) {
        return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
    }

    if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
        message.channel.send(`${mute.user.username} est mute !`);
    })
}

if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        })
    }

    var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
          case "stats":
          
          var userCreateDate = message.author.createdAt.toString().split(" ");
          var msgauthor = message.author.id;

          var stats_embed = new Discord.RichEmbed()

          .setColor("#D9F200")
          .setTitle(`statistiques de l'utilisateur : ${message.author.username}`) 
          .addField(`ID de l'utilisateur :id:`, msgauthor, true)
          .addField("Date de création du compte de l'utilisateur:", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
          .setThumbnail(message.author.avatarURL)
          message.reply("Tu peux regarder t'es message priver Je vien de t'envoyer t'es statistiques !")
          message.author.send({embed: stats_embed});
          break;
        }    

    });
