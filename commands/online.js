module.exports = (message, log) => { // Function with 'message' parameter
	log(`${message.guild.name}: ${message.guild.presences.array().length} out of ${message.guild.members.array().length}`, message.cleanContent.replace(/\n/g,''))
}
