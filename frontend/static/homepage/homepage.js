const matchDeck = document.getElementById("matchDeck");

let currentUser = {};
const all_decks = document.getElementById("all_decks");

const displayMatchDeck = (sug, i) => {
  let { description, pinpoints, date, user, speed, time } = sug;
  const coords = pinpoints.map((p) => p.coord);
  let coord_str = "";
  if (coords.length > 0 && coords[0].length > 0) {
    coords.forEach((c) => (coord_str += "|" + c[1] + "," + c[0]));
  } else {
    coord_str = "|42.379098,-72.519482";
  }

  let src = `https://maps.googleapis.com/maps/api/staticmap?size=500x350&maptype=roadmap\&markers=size:large%7Ccolor:red${coord_str}&&key=AIzaSyB0jyJR3M9-q6Tn5uGvEsbYVS7MAU5b7VI`;
  const imgElem = document.createElement("img");
  imgElem.style.width = "50%";
  imgElem.setAttribute("src", src);

  const scheduleElem = document.createElement("div");
  const scheduleHeader = document.createElement("h6");
  scheduleHeader.innerText = "\nSchedule:";
  const daysElem = document.createElement("div");
  for (const day of date) {
    daysElem.innerText += day + " ";
  }
  const timeElem = document.createElement("div");
  timeElem.innerText = "Time: " + time;

  const speedElem = document.createElement("div");
  speedElem.innerText = "Speed: " + speed;

  scheduleElem.append(scheduleHeader, daysElem, timeElem, speedElem);

  const routeElem = document.createElement("div");
  let allRoutes = "";
  pinpoints.forEach((x) => (allRoutes += x.address + "\n"));
  routeElem.innerText = allRoutes;

  const displayInfo = document.createElement("div");
  displayInfo.append(scheduleElem);

  const routeInfo = document.createElement("div");
  const routeHeader = document.createElement("h6");
  routeHeader.innerText = "Route: ";
  routeInfo.append(routeHeader, routeElem);

  const matchButtons = document.createElement("div");
  matchButtons.classList.add("matchDeckButtons");
  const like = document.createElement("button");
  like.innerText = "Like";
  like.classList.add("btn");
  like.classList.add("btn-info");
  like.setAttribute("id", user._id);

  const reject = document.createElement("button");
  reject.innerText = "Nope";
  reject.classList.add("btn");
  reject.classList.add("btn-secondary");
  reject.setAttribute("id", user._id);

  matchButtons.append(like, reject);
  const cur_deck = document.createElement("div");
  cur_deck.classList.add("cur_deck");

  const descrip = document.createElement("div");
  descrip.append(scheduleElem, displayInfo, routeInfo);

  const divide = document.createElement('div');
  divide.classList.add('divide');
  divide.append(descrip, imgElem);

  cur_deck.append(divide, matchButtons);

  all_decks.append(cur_deck);

  like.addEventListener("click", async (event) => {
    const curId = event.target.id;
    const accessToken = localStorage.getItem("accessToken");
    // const currentUser = localStorage.getItem("currentUser");

    const response = await fetch("/api/request", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        sender: currentUser._id,
        receiver: curId,
      }),
    });

    const {status, message} = await response.json();

    if (status === 200) {
      location.reload();
    }
  });

  reject.addEventListener("click", async (event) => {
    const curId = event.target.id;
    const response = await fetch("/api/request/reject", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        sender: currentUser._id,
        receiver: curId,
      }),
    });
    const {status, message} = await response.json();
    if (status === 200) {
      location.reload();
    }
  });
};

const getSuggestions = async () => {

  const response = await fetch("/api/request/suggestion", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: currentUser._id }),
  });
  const res = await response.json();
  console.log(res.data);
  return res.data;
};

onload = async () => {
  const res = await fetch("/api/users/currentUser");
  const { status, message, data } = await res.json();
  if (!status === 200) {
    location.href("/users/login");
  } else {
    currentUser = data;
  }
  await renderRoute();
  let suggestions = await getSuggestions();
  if (suggestions.length == 0) {
    const displayInfo = document.getElementById("matchDeck");
    displayInfo.innerText = "Nothing to show";
    displayInfo.style.margin = "auto";
  } else {
    suggestions.forEach((sug, i) => displayMatchDeck(sug, i));
  }
};

const renderRoute = async () => {
  const res = await fetch(`/api/paths/${currentUser._id}`);
  const { message, status, data } = await res.json();
  if (status !== 200) {
    location.href = "/routesPanel";
  }
  const route = data;

  const pinpoints = data.pinpoints.map((x) => x.address);
  const speed = data.speed;
  const date = data.date;
  const time = data.time;

  const userRoute = document.getElementById("userRoute");
  removeAllChildNodes(userRoute);
  for (const pinpoint of pinpoints) {
    const temp = document.createElement("li");
    temp.classList.add("list-group-item");
    temp.appendChild(document.createTextNode(pinpoint));
    userRoute.appendChild(temp);
  }

  const routeDetails = document.getElementById("routeDetails");

  removeAllChildNodes(routeDetails);

  const routeSpeed = document.createElement("li");
  routeSpeed.classList.add("list-group-item");
  routeSpeed.appendChild(document.createTextNode(`Your Speed: ${speed}`));
  const routeDate = document.createElement("li");
  routeDate.classList.add("list-group-item");
  routeDate.appendChild(document.createTextNode(`Your dates: ${date}`));
  const routeTime = document.createElement("li");
  routeTime.classList.add("list-group-item");
  routeTime.appendChild(document.createTextNode(`Your time: ${time}`));

  routeDetails.appendChild(routeSpeed);
  routeDetails.appendChild(routeDate);
  routeDetails.appendChild(routeTime);

};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const matchesPage = document.getElementById("matchesPage");
matchesPage.addEventListener("click", () => {
  window.location.assign(`/users/${currentUser._id}/match`);
});

const profilePage = document.getElementById("routesPanel");
profilePage.addEventListener("click", () => {
  window.location.assign("/routesPanel");
});

const logout = document.getElementById("logoutPage");
logout.addEventListener("click", async () => {
  await fetch("api/users/logout");
  window.location.assign("/users/login");
});

const account = document.getElementById("account");
account.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  window.location.href = "/users/profile";
});
