import { getUserId, httpRequest } from "../utils.js";
import { createCarousel, fillOutHref } from "./match.js";

const requestList = document.getElementById("requestList");

fillOutHref();
const currentUser = getUserId();

onload = async () => {
	const res = await httpRequest(`/api/users/id=${currentUser}/request`, "GET", {}, []);

	const requests = res.data;

	requests.forEach((value, index, array) => {
		const { username, pictures, bio, message, id } = value;
		const listItem = document.createElement("li");
		listItem.classList.add("list-group-item");
		requestList.appendChild(listItem);

		const row = document.createElement("div");
		row.classList.add("row");
		listItem.appendChild(row);

		const col1 = document.createElement("div");
		col1.classList.add("col-md-3", "text-left");
		row.appendChild(col1);

		col1.appendChild(createCarousel(index, pictures));

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

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("btn", "btn-info");
		deleteBtn.appendChild(document.createTextNode("Unmatch"));
		col3.appendChild(deleteBtn);

		deleteBtn.addEventListener("click", async (event) => {
			event.preventDefault();
			event.stopPropagation();

			const body = { id };
			const res = await httpRequest(`/api/request`, accessToken, "DELETE", body, []);
			if (res.status === 200) {
				col3.removeChild(deleteBtn);
			}
		});
	});
};
