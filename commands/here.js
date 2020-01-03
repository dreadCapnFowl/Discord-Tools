module.exports = (message, log) => { // Function with 'message' parameter
	var presenceBlock = document.createElement('div')
	presenceBlock.appendChild(document.createTextNode(`
		${message.guild.presences.array().length} users currently active in ${message.guild.name}
	`))
	let t;
	var mOnline = document.createElement("div");
	mOnline.style.color = '#99ff66';
	t = document.createElement("div")
	t.style.fontWeight = "bold";
	t.appendChild(document.createTextNode('Online: '))
	mOnline.appendChild(t);
	mOnline.style.display = 'flex';
	mOnline.style.flexWrap = 'wrap';

	var mIdle = document.createElement("div");
	mIdle.style.color = '#ffff99';
	t = document.createElement("div")
	t.style.fontWeight = "bold";
	t.appendChild(document.createTextNode('Idle: '))
	mIdle.appendChild(t);
	mIdle.style.display = 'flex';
	mIdle.style.flexWrap = 'wrap';

	var mDnd = document.createElement("div");
	mDnd.style.color = '#ff9999';
	t = document.createElement("div")
	t.style.fontWeight = "bold";

	t.appendChild(document.createTextNode('DND: '))
	mDnd.appendChild(t);
	mDnd.style.display = 'flex';
	mDnd.style.flexWrap = 'wrap';

	message.guild.members.forEach(m => {
		var p = m.presence;

		var pNode = document.createElement("div");

		if (p.status == 'offline') return;
		let appendto;
		if (p.status == 'online') {
			appendto = mOnline;
		}
		if (p.status == 'idle') {
			appendto = mIdle
		}
		if (p.status == 'dnd') {
			appendto = mDnd
		}


		pNode.innerText = m.user.tag;
		pNode.classList.add('presence_node')

		appendto.appendChild(pNode);

	})

	presenceBlock.appendChild(mOnline);
	presenceBlock.appendChild(mDnd);
	presenceBlock.appendChild(mIdle);

	log(presenceBlock.outerHTML, message.cleanContent.replace(/\n/g,''))
}
