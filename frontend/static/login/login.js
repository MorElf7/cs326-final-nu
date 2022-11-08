const submitLogin = async (event) => {
	event.preventDefault();
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
	const res = await response.json();
	if (res.statusCode === 200 && res.status === "success") {
		location.href = "";
	} else {
	}
};

onload = function () {
	// Fetch all the forms we wangit to apply custom Bootstrap validation styles to
	var forms = document.getElementsByClassName("needs-validation");
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function (form) {
		form.addEventListener(
			"submit",
			function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add("was-validated");
			},
			false
		);
	});
};

document.getElementById("submit").addEventListener("click", submitLogin);
