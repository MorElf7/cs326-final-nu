import { httpRequest } from "../utils.js";
const form = document.getElementById("signupForm");

const submitSignup = async (event) => {
	event.preventDefault();
	event.stopPropagation();
	if (form.checkValidity()) {
		const email = document.getElementById("email").value;
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		const confirm = document.getElementById("confirm").value;

		if (password !== confirm) {
			document.getElementById("not-match").hidden = false;
		} else {
			document.getElementById("not-match").hidden = true;
			const { message, status } = await httpRequest(
				"/api/users/signup",
				"POST",
				{ email, username, password },
				[]
			);
			if (status === 200) {
				const user = (await httpRequest("/api/users/currentUser", "GET", {}, [])).data;
				location.href = "/home";
			} else {
				const messageDiv = document.getElementById("message");
				messageDiv.innerText = "";
				messageDiv.appendChild(document.createTextNode(message));
			}
		}
	}

	form.classList.add("was-validated");
};

form.addEventListener("submit", submitSignup);
