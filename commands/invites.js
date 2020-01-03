module.exports = (message, log) => { // Function with 'message' parameter
	message.guild.fetchInvites().then(invites => {
		//console.log(invites)
		log('TO DO', message.cleanContent.replace(/\n/g,''))
	}).catch(e => {
		log(e, message.cleanContent.replace(/\n/g,''))
	})

}
