function dropDown() {
	document.getElementById("dropDown").classList.toggle("show");
}

window.onclick = function (evt) {
	if (!evt.target.matches(".profile-button")) {
		let dropdowns = document.getElementsByClassName("profile-dropdown-content");
		for (let i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};
