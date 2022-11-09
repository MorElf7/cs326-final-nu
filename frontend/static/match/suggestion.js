import { createCarousel } from "./match.js";

const suggestionList = document.getElementById("suggestionList");

onload = async () => {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	const currentUser = localStorage.getItem("currentUser");

	const response = await fetch(`/api/suggestion`, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ id: currentUser }),
	});

	const res = await response.json();

	const suggestion = res.data;

	suggestion.forEach((value, index, array) => {
		const { username, pictures, bio } = value;
		const listItem = document.createElement("li");
		listItem.classList.add("list-group-item");
		suggestionList.appendChild(listItem);

		const row = document.createElement("div");
		row.classList.add("row");
		listItem.appendChild(row);

		const col1 = document.createElement("div");
		col1.classList.add("col-md-3", "text-left");
		row.appendChild(col1);

		col1.appendChild(createCarousel(pictures, index));

		const col2 = document.createElement("div");
		col2.classList.add("col-md-5", "text-left", "align-self-center");
		row.appendChild(col2);

		const innerRow1 = document.createElement("div");
		innerRow1.classList.add("row", "pb-5");
		col2.appendChild(innerRow1);

		const col21 = document.createElement("div");
		col21.classList.add("col-auto", "text-md-left");
		innerRow1.appendChild(col21);

		const usernameNode = document.createElement("a");
		usernameNode.href = "#";
		usernameNode.appendChild(document.createTextNode(username));
		col21.appendChild(usernameNode);

		const innerRow2 = document.createElement("div");
		innerRow2.classList.add("row", "pt-3");
		col2.appendChild(innerRow2);

		const col22 = document.createElement("div");
		col22.classList.add("col-auto");
		innerRow2.appendChild(col22);

		const bioNode = document.createElement("p");
		bioNode.appendChild(document.createTextNode(bio));
		col22.appendChild(bioNode);

		const col3 = document.createElement("div");
		col3.classList.add("col-md-auto", "align-self-center");
		row.appendChild(col3);

		const acceptBtn = document.createElement("button");
		acceptBtn.classList.add("btn", "btn-primary", "mr-1");
		acceptBtn.appendChild(document.createTextNode("Match"));
		col3.appendChild(acceptBtn);
		acceptBtn.addEventListener("click", async (event) => {
			event.preventDefault();
			event.stopPropagation();
		
			const  = await fetch(`/api/request`, {
				method: "POST",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ sender: currentUser, receiver:  }),
			});
		
			const res = await response.json();
		};);

		const declineBtn = document.createElement("button");
		declineBtn.classList.add("btn", "btn-secondary");
		declineBtn.appendChild(document.createTextNode("Pass"));
		col3.appendChild(declineBtn);
	});
};
