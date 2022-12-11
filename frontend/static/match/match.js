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

export const fillOutHref = async (userId) => {
  const matchLink = document.getElementById("matchLink"),
    suggestionLink = document.getElementById("suggestionLink"),
    requestLink = document.getElementById("requestLink"),
    profileLink = document.getElementById("profileLink");

  let path = location.pathname.split("/");
  path.pop();

  // matchLink.href = path.join("/") + "/match";
  // suggestionLink.href = path.join("/") + "/suggestion";
  // requestLink.href = path.join("/") + "/request";
  profileLink.href = "/users/profile";

  const user = (await httpRequest("/api/users/currentUser", "GET", {}, []))
    .data;
  if (!user) {
    alert("The user you are looking for does not exist");
    location.href = "/";
  }
  profileLink.appendChild(document.createTextNode(user.username));
};

const addressList = (list, pinpoints) => {
  for (let pinpoint of pinpoints) {
    console.log(pinpoint);
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    list.appendChild(li);

    li.appendChild(document.createTextNode(pinpoint.address));
  }
};

const dateList = (list, dates) => {
  for (let date of dates) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    list.appendChild(li);

    li.appendChild(document.createTextNode(date));
  }
};

onload = async () => {
  const userId = getUserId();

  await fillOutHref(userId);

  const response = await httpRequest(
    `/api/users/${userId}/match`,
    "GET",
    {},
    []
  );

  if (response.status === 200) {
    const matches = response.data;

    matches.forEach(async (value, index, array) => {
      console.log(value);
      const res = await fetch(`/api/paths/${value._id}`);
      const { message, status, data } = await res.json();
      const route = data;

      const { username, description } = value;
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "border");
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
      usernameNode.appendChild(
        document.createTextNode(`Username: ${username}`)
      );
      col21.appendChild(usernameNode);

      const innerRow2 = document.createElement("div");
      innerRow2.classList.add("row", "pt-3");
      col2.appendChild(innerRow2);

      const col22 = document.createElement("div");
      col22.classList.add("col-auto");
      innerRow2.appendChild(col22);

      const descriptionNode = document.createElement("p");
      descriptionNode.appendChild(
        document.createTextNode(`Description: ${description}`)
      );
      col22.appendChild(descriptionNode);

      const row2 = document.createElement("div");
      row2.classList.add("row", "pt-3");
      listItem.appendChild(row2);

      const col231 = document.createElement("div");
      col231.classList.add("col-4");
      row2.appendChild(col231);

      const addresses = document.createElement("ul");
      col231.appendChild(addresses);
      addressList(addresses, route.pinpoints);

      const col232 = document.createElement("div");
      col232.classList.add("col-4", "offset-1");
      row2.appendChild(col232);

      const speed = document.createElement("div");
      speed.appendChild(document.createTextNode("Speed: " + route.speed));
      col232.appendChild(speed);

      const time = document.createElement("div");
      time.classList.add("pt-1");
      time.appendChild(document.createTextNode("Time: " + route.time));
      col232.appendChild(time);

      const dateLabel = document.createElement("div");
      dateLabel.classList.add("pt-1");
      dateLabel.appendChild(document.createTextNode("Date: "));
      col232.appendChild(dateLabel);

      const date = document.createElement("ul");
      date.classList.add("pt-1");
      dateList(date, route.date);
      col232.appendChild(date);

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("row", "justify-content-center");
      const removeMatchBtn = document.createElement("button");
      removeMatchBtn.classList.add("btn", "btn-danger");
      removeMatchBtn.appendChild(document.createTextNode("Remove Match"));
      listItem.appendChild(btnDiv);
      btnDiv.appendChild(removeMatchBtn);

      removeMatchBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
				console.log("Data")
				console.log(data)
        const response = await fetch("/api/request/removeMatch", {
          method: "PUT",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user1: userId,
            user2: data.user,
          }),
        });

				const {status, message} = await response.json();
				if (status === 200) {
					alert(message)
				}
      });
    });
  } else {
  }
};
