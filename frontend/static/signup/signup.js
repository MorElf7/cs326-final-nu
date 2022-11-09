const form = document.getElementById("signupForm");

const submitSignup = async (event) => {
	event.preventDefault();
	event.stopPropagation();
	if (form.checkValidity()) {
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const confirm = document.getElementById("confirm").value;

		if (password !== confirm) {
			document.getElementById("not-match").hidden = false;
		} else {
			document.getElementById("not-match").hidden = true;
			const response = await fetch("/api/users", {
				method: "POST",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, confirm }),
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
	}

	form.classList.add("was-validated");
};

form.addEventListener("submit", submitSignup);
