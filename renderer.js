// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const Discord = require('discord.js');
var fs = require('fs')
var dateFormat = require('dateformat');
const jsonfile = require('jsonfile')
const client = new Discord.Client();

/* Commands */
const ping = require("./commands/ping.js");
const here = require("./commands/here.js");
const online = require("./commands/online.js");
const who = require("./commands/who.js");
const roles = require("./commands/roles.js");
const role = require("./commands/role.js");
const invites = require("./commands/invites.js");
const emojis = require("./commands/emojis.js");
//---
var config = JSON.parse(fs.readFileSync('config.json'))
var token = config.token

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  /* Save message to log file */


  if (msg.author.id != client.user.id) return;

  if (msg.content.startsWith(config.prefix))
  {

    var line = msg.content.replace(config.prefix,'');
    var tokens = line.split(' ')

    switch(tokens[0])
    {
      case 'ping':
        msg.delete();
        ping(msg, log)
        break;
      case 'here':
        msg.delete();
        here(msg, log);
        break;
      case 'online':
        msg.delete();
        online(msg, log);
        break;
      case 'who':
        msg.delete();
        if (!tokens[1])
        {
          log(`${config.prefix}who [user name/nick/id]`)
        } else {
          who(msg, client, getUser(tokens[1]), log)
        }
        break;
      case 'roles':
        msg.delete();
        roles(msg, log);
        break;
      case 'role':
        msg.delete();
        if (!tokens[1])
        {
          log(`${config.prefix}role [role name/id]`)
        } else {
          role(msg, getRole(msg.guild, tokens.slice(1).join(' ')), log)
        }
        break;
      case 'invites':
        msg.delete();
        invites(msg, log);
        break;
      case 'emojis':
        msg.delete();
        emojis(msg, client.emojis, log);
        break
      default:
        msg.delete();
        log('Unrecognized command.', msg)
    }
  }

});

client.login(token);

function getRole(guild, selector)
{

  var r = guild.roles.get(selector);
  if (r) return r;

  r = guild.roles.find(role => role.name == selector)
  return r;
}
function getUser(selector)
{
  var u = client.users.get(selector)
  if (u)
    return u;
  if (selector.includes('#'))
  {
    u = client.users.find(user => user.username == selector.split('#')[0]);
    return u;
  } else {
    u = client.users.find(user => user.username == selector);
    if (!u)
    {

      client.guilds.forEach(g => {
        var m = g.members.find (member => member.displayName == selector)
        if (m) u = m.user;
      })
      return u;
    } else {
      return u;
    }
  }
}

function log(content, command)
{
  var post = document.createElement("div");
  post.classList.add("post");

  var postHeader = document.createElement("div");
  postHeader.classList.add("post_header");

  var postTime = document.createElement("div");
  postTime.innerText = dateFormat(new Date(), "[HH:MM:ss] dd/mm/yyyy");
  postTime.style.marginRight = '8px';
  postHeader.appendChild(postTime);

  if (command) {
    var postCommand = document.createElement("div");
    postCommand.innerText = command;
    postHeader.appendChild(postCommand);
  }

  post.appendChild(postHeader);

  var postContent = document.createElement("div");
  postContent.innerHTML = content;
  post.appendChild(postContent);


  var o = document.getElementById('output')
  var doScroll = false;
  if (Math.abs(o.scrollHeight - o.scrollTop - o.clientHeight) < 10)
  {
    doScroll = true;
  }
  o.appendChild(post);

  if (o.childElementCount >= config.bufferSize)
    o.removeChild(o.childNodes[0]);

  if (doScroll)
  {
    o.scrollTop = o.scrollHeight;
  }

}
