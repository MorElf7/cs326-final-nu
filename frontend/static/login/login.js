const form = document.getElementById("loginForm");

const submitLogin = async (event) => {
	event.preventDefault();
	event.stopPropagation();
	if (form.checkValidity()) {
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const response = await fetch("/api/users/login", {
			method: "POST",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const { data, message, status } = await response.json();
		if (status === 200) {
			location.href = "";
		} else {
			const messageDiv = document.getElementById("message");
			messageDiv.innerHtml = "";
			messageDiv.appendChild(document.createTextNode(message));
		}
	}

	form.classList.add("was-validated");
};

form.addEventListener("submit", submitLogin);
