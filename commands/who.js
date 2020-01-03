var dateFormat = require('dateformat');

module.exports = (message, self, user, log) => { // Function with 'message' parameter
	if (!user)
	{
		log('Could not find user.', message.cleanContent)
	} else {
		var whoBlock = document.createElement("div");
		whoBlock.classList.add('who-block')
		var statsDiv = document.createElement("div");
		statsDiv.classList.add('who-section');

			var nameDiv = document.createElement("div");
			nameDiv.classList.add('who-header')
			nameDiv.innerText = user.tag;
			statsDiv.appendChild(nameDiv);

			var joinedDiv = document.createElement("div");
			joinedDiv.innerText = 'Registered '
			joinedDiv.innerText += dateFormat(user.createdTimestamp, "dd/mm/yyyy HH:MM:ss");
			statsDiv.appendChild(joinedDiv);

			if (message.guild && message.guild.members.get(user.id)) {
				var joinedDiv = document.createElement("div");
				joinedDiv.innerText = `Joined`
				joinedDiv.innerText += dateFormat(message.guild.members.get(user.id).joinedTimestamp, "dd/mm/yyyy HH:MM:ss");
				statsDiv.appendChild(joinedDiv);
			}

		whoBlock.appendChild(statsDiv);

		var serverDiv = document.createElement("div");
		serverDiv.classList.add('who-section');
			var serverHeader = document.createElement('div')
			serverHeader.classList.add('who-header')
			serverHeader.innerText = 'Servers'
			serverDiv.appendChild(serverHeader);

			self.guilds.forEach(g => {
				if (g.members.get(user.id))
				{
					var mutualDiv = document.createElement('div')
					mutualDiv.innerText = g.name
					serverDiv.appendChild(mutualDiv)
				}
			})

		whoBlock.appendChild(serverDiv);

		var avatarDiv = document.createElement("img");
		avatarDiv.classList.add('who-av')
		avatarDiv.src = user.avatarURL
		whoBlock.appendChild(avatarDiv);

		log(whoBlock.outerHTML, message.cleanContent.replace(/\n/g,''))
	}

}
