import { httpRequest } from "../utils.js";

const form = document.getElementById("loginForm");

const submitLogin = async (event) => {
	event.preventDefault();
	event.stopPropagation();
	if (form.checkValidity()) {
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		const { data, message, status } = await httpRequest(
			"/api/users/login",
			"POST",
			{ username, password },
			[]
		);
		if (status === 200) {
			// console.log(status);
			location.href = data.redirectUrl;
		} else {
			const messageDiv = document.getElementById("message");
			messageDiv.innerText = "";
			messageDiv.appendChild(document.createTextNode(message));
		}
	}

	form.classList.add("was-validated");
};

form.addEventListener("submit", submitLogin);
