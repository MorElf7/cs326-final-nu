const matchDeck = document.getElementById('matchDeck');
const like = document.getElementById('like');
const reject = document.getElementById('reject');
const reload = document.getElementById('reload');

const displayMatchDeck = ({src, name, description, route, schedule}) => {
    // const imgElem = document.createElement('img');
    // imgElem.setAttribute('src',src)
    // document.getElementById('displayMap').append(imgElem);

    const displayInfo = document.getElementById('displayInfo');
    removeAllChildNodes(displayInfo);
    const nameElem = document.createElement('h5');
    nameElem.innerText = name;

    const descripElem = document.createElement('div');
    descripElem.innerText = description;

    const scheduleElem = document.createElement('div');
    const scheduleHeader = document.createElement('h6');
    scheduleHeader.innerText = '\nSchedule:';
    const daysElem = document.createElement('div');
    for(const day of schedule.days){
        daysElem.innerText += day + ' ';
    }
    const time = document.createElement('div');
    time.innerText = 'From: ' + schedule.time.from + '\n' + 'To: ' + schedule.time.to;
    scheduleElem.append(scheduleHeader, daysElem, time);

    const routeElem = document.createElement('div');
    routeElem.innerText = 'From: ' + route.from + '\n' + 'To: ' + route.to;

    displayInfo.append(nameElem, descripElem, scheduleElem);
    const routeInfo = document.getElementById('routeInfo');
    const routeHeader = document.createElement('h6');
    removeAllChildNodes(routeInfo);
    routeHeader.innerText = 'Route: ';
    routeInfo.append(routeHeader, routeElem);
}

const getSuggestions = async () => {
    const accessToken = localStorage.getItem("accessToken");
	const currentUser = localStorage.getItem("currentUser");

    const response = await fetch('/api/request/suggestion', {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ id: currentUser }),
	});
    const res = await response.json();

	return res.data;
}

onload = async () => {
	let suggestions = await getSuggestions();

    displayMatchDeck(suggestions.pop());
    localStorage.setItem('suggestions', JSON.stringify(suggestions));

    displayUserInfo();
};

like.addEventListener('click', async() => {
    const accessToken = localStorage.getItem("accessToken");
	const currentUser = localStorage.getItem("currentUser");

    const response = await fetch('/api/request/suggestion', {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ id: currentUser }),
	})
    const res = await response.json();
});

reject.addEventListener('click', () => {
    let suggestions = JSON.parse(localStorage.getItem('suggestions'));

    if(suggestions.length > 0){
        displayMatchDeck(suggestions.pop());
    }
    else{
        alert('No more users to show');
    }
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
});

reload.addEventListener('click', async () => {
    let suggestions = await getSuggestions();
    displayMatchDeck(suggestions.pop());
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
})

const removeAllChildNodes = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

const displayUserInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
	const currentUser = localStorage.getItem("currentUser");

    const response = await fetch(`/api/users/${currentUser}`, {
		method: "GET",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	})
    const res = await response.json();
    
    const userInfo = res.data;

    const userRoute = document.getElementById('userRoute');
    const route = document.createElement('div');
    route.innerText = 'From: ' + userInfo.route.from + '\n' + 'To: ' + userInfo.route.to;
    userRoute.append(route);
}