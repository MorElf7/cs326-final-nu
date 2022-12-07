const matchList = document.getElementById("matchesList");

import { getUserId, httpRequest } from "../utils.js";

export const createAvatar = (username) => {
	const roundImg = document.createElement("img");
	roundImg.classList.add("rounded-circle");

	roundImg.src = `https://ui-avatars.com/api/name=${username}&background=random`;
	roundImg.classList.add("img-fluid");
	roundImg.width = "100";
	roundImg.height = "100";

	return roundImg;
};

export const fillOutHref = () => {
	const matchLink = document.getElementById("matchLink"),
		suggestionLink = document.getElementById("suggestionLink"),
		requestLink = document.getElementById("requestLink");

	let path = location.pathname.split("/");
	path.pop();

	matchLink.href = path.join("/") + "/match";
	suggestionLink.href = path.join("/") + "/suggestion";
	requestLink.href = path.join("/") + "/request";
};

onload = async () => {
	fillOutHref();

	const currentUser = getUserId();

	const { data, status, message } = await httpRequest(
		`/api/users/${currentUser}/match`,
		"GET",
		{},
		[]
	);

	if (status === 200) {
		const matches = data;

		matches.forEach((value, index, array) => {
			const { username, description } = value;
			const listItem = document.createElement("li");
			listItem.classList.add("list-group-item");
			matchList.appendChild(listItem);

			const row = document.createElement("div");
			row.classList.add("row");
			listItem.appendChild(row);

			const col1 = document.createElement("div");
			col1.classList.add("col-md-3", "offset-1", "text-left");
			row.appendChild(col1);

			col1.appendChild(createAvatar(username));

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

			const descriptionNode = document.createElement("p");
			descriptionNode.appendChild(document.createTextNode(description));
			col22.appendChild(descriptionNode);
		});
	} else {
	}
};
