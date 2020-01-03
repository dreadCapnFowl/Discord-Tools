const { dialog } = require('electron').remote
var download = require('download-file')
var path = require('path');

module.exports = (message, log) => { // Function with 'message' parameter

	var args = message.content.split(' ').slice(1)
	if (args[0] == 'get')
	{
		if (args[1])
		{
			//var e = message.guild.emojis.get(args[1].toString())
			var eId = /\:(.*?)\>/.exec(args[1])[1].split(':')[1];
			//console.log(eId)
			var emoji = message.guild.emojis.get(eId);
			dialog.showSaveDialog({ defaultPath: emoji.name + '.' + emoji.url.split('.').slice(-1)[0]  }).then(r => {
				if (!r.cancelled)
				{
					download(emoji.url, {
					    directory: path.dirname(r.filePath),
					    filename: path.basename(r.filePath)
					}, function(err){
					    if (err) throw err
					    log(`Downloaded ${path.basename(r.filePath)}`, message.cleanContent.replace(/\n/g,''))
					})
				}
			})
		} else
		{
			console.log ('getting all emojis')
		}
	} else if (!args)
	{
		var emojiBlock = document.createElement("div");

		message.guild.emojis.forEach(emoji => {
			//console.log(emoji)
			var emojiNode = document.createElement("div");
			emojiNode.classList.add('emoji-node')

			var emojiImg = document.createElement('img');
			emojiImg.classList.add('emoji-img')
			emojiImg.src = emoji.url
			emojiNode.appendChild(emojiImg)

			var emojiText = document.createElement("div");
			emojiText.classList.add('emoji-text')
			emojiText.innerText = `:${emoji.name}:`
			emojiNode.appendChild(emojiText)

			emojiBlock.appendChild(emojiNode)
		})

		log(emojiBlock.innerHTML, message.cleanContent.replace(/\n/g,''))
	}
}
