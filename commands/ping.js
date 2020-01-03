module.exports = (message, log) => { // Function with 'message' parameter
	log('Pong!', message.cleanContent.replace(/\n/g,''))
}
