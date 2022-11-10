const matchList = document.getElementById("matchesList");

import { httpRequest } from "../utils.js";

const createCarouselItem = (image, i) => {
	const carouselItem = document.createElement("div");
	carouselItem.classList.add("carousel-item");
	if (i === 0) carouselItem.classList.add("active");

	const img = document.createElement("img");
	img.src = image.src;
	img.classList.add("img-fluid", "float-left");
	img.width = "400";
	img.height = "400";
	img.alt = image.name;
	carouselItem.appendChild(img);
	return carouselItem;
};

const createCarouselButton = (carousel) => {
	const id = carousel.id;
	const prev = document.createElement("a");
	prev.classList.add("carousel-control-prev");
	prev.href = `#${id}`;
	prev.setAttribute("role", "button");
	prev.setAttribute("data-slide", "prev");

	const prevIcon = document.createElement("span");
	prevIcon.classList.add("carousel-control-prev-icon");
	prevIcon.setAttribute("aria-hidden", "true");
	const prevText = document.createElement("span");
	prevText.classList.add("sr-only");
	prevText.appendChild(document.createTextNode("Previous"));
	prev.appendChild(prevIcon);
	prev.appendChild(prevText);

	const next = document.createElement("a");
	next.classList.add("carousel-control-next");
	next.href = `#${id}`;
	next.setAttribute("role", "button");
	next.setAttribute("data-slide", "next");

	const nextIcon = document.createElement("span");
	nextIcon.classList.add("carousel-control-next-icon");
	nextIcon.setAttribute("aria-hidden", "true");
	const nextText = document.createElement("span");
	nextText.classList.add("sr-only");
	nextText.appendChild(document.createTextNode("Next"));
	next.appendChild(nextIcon);
	next.appendChild(nextText);

	carousel.appendChild(prev);
	carousel.appendChild(next);
};

const createCarousel = (id, pictures) => {
	const carousel = document.createElement("div");
	carousel.id = `carousel${id}`;
	carousel.classList.add("carousel");
	carousel.setAttribute("data-interval", false);

	const carouselfInner = document.createElement("div");
	carouselfInner.classList.add("carousel-inner");
	carousel.appendChild(carouselfInner);

	pictures.forEach((v, i, arr) => {
		carouselfInner.appendChild(createCarouselItem(v, i));
	});

	createCarouselButton(carousel);

	return carousel;
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

	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	const currentUser = localStorage.getItem("currentUser");

	const res = await httpRequest(`/api/users/${currentUser}/match`, accessToken, "GET", {}, []);

	const matches = res.data;

	matches.forEach((value, index, array) => {
		const { username, pictures, bio } = value;
		const listItem = document.createElement("li");
		listItem.classList.add("list-group-item");
		matchList.appendChild(listItem);

		const row = document.createElement("div");
		row.classList.add("row");
		listItem.appendChild(row);

		const col1 = document.createElement("div");
		col1.classList.add("col-md-3", "text-left");
		row.appendChild(col1);

		col1.appendChild(createCarousel(index, pictures));

		const col2 = document.createElement("div");
		col2.classList.add("col-md-5", "offset-1", "text-left", "align-self-center");
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
	});
};

export { createCarousel };
