const submitLogin = async (event) => {
	event.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const res = await fetch("/api/users", {
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
};

document.getElementById("submit").addEventListener("click", submitLogin);
