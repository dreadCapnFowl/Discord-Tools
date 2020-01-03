module.exports = (message, log) => { // Function with 'message' parameter

	var roleBlock = document.createElement("div");

	message.guild.roles.forEach(role => {
		var roleItem = document.createElement("div");
		roleItem.classList.add('role-item')
			var roleName = document.createElement("div");
			roleName.classList.add('role-name')
			roleName.style.color = role.hexColor;
			roleName.innerText = role.name;
		roleItem.appendChild(roleName);
			var roleMembers = document.createElement("div");
			roleMembers.classList.add('role-members')
			roleMembers.innerText = `${role.members.array().length} members`;
		roleItem.appendChild(roleMembers);

		roleBlock.appendChild(roleItem);
	})

	log(roleBlock.innerHTML, message.cleanContent.replace(/\n/g,''))
}
