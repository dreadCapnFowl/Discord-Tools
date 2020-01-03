module.exports = (message, role, log) => { // Function with 'message' parameter

	if (!role)
	{
		log('Could not find role.');
		return;
	}
	var memberBlock = document.createElement("div");

	var rolesHead = document.createElement("div");
	rolesHead.style.display = 'flex'
		var roleName = document.createElement("div");
		roleName.classList.add('role-name')
		roleName.style.color = role.hexColor;
		roleName.innerText = role.name;
		rolesHead.appendChild(roleName)
		rolesHead.appendChild(document.createTextNode('members'))
	memberBlock.appendChild(rolesHead)

	if (role.members.array().length == 0) {
			var memberName = document.createElement("div");
			memberName.classList.add('member-node')
			memberName.innerText = 'None';
			memberBlock.appendChild(memberName);
	}
	role.members.forEach(member => {
			var memberName = document.createElement("div");
			memberName.classList.add('member-node')
			memberName.innerText = member.user.tag;
			memberBlock.appendChild(memberName);
	})

	log(memberBlock.innerHTML, message.cleanContent.replace(/\n/g,''))
}
