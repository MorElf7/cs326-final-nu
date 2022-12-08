const matchDeck = document.getElementById('matchDeck');
const like = document.getElementById('like');
const reject = document.getElementById('reject');
let currentUser = {}


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
    // const accessToken = localStorage.getItem("accessToken");
	// const currentUser = localStorage.getItem("currentUser");

    const response = await fetch('/api/request/suggestion', {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userId: currentUser._id }),
	});
    const res = await response.json();

	return res.data;
}

onload = async () => {
    const res = await fetch('/api/users/currentUser')
    const {status, message, data} = await res.json();
    if (!status === 200) {
      location.href("/users/login")
    } else {
      currentUser = data 
    }
	let suggestions = await getSuggestions();
    const curSuggestion = suggestions.pop();
    localStorage.setItem('curSuggestion', JSON.stringify(curSuggestion));
    displayMatchDeck(curSuggestion);
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
    displayUserInfo();
};

like.addEventListener('click', async() => {
    let curSuggestion = JSON.parse(localStorage.getItem('curSuggestion'));

    const accessToken = localStorage.getItem("accessToken");
	// const currentUser = localStorage.getItem("currentUser");

    const response = await fetch('/api/request', {
		method: "PUT",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ 
            id : currentUser._id,
            matchId: curSuggestion.id 
        }),
	})
    let suggestions = JSON.parse(localStorage.getItem('suggestions'));
    const newSuggestion = suggestions.pop();
    alert('Added into matched list!')
    displayMatchDeck(newSuggestion);
    localStorage.setItem('curSuggestion', JSON.stringify(newSuggestion));
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

const removeAllChildNodes = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

const displayUserInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
	const currentUser = localStorage.getItem("currentUser");

    const response = await fetch(`/api/users/${currentUser._id}`, {
		method: "GET",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
    const res = await response.json();
    
    const userInfo = res.data;

    const userRoute = document.getElementById('userRoute');
    const route = document.createElement('div');
    route.innerText = 'From: ' + userInfo.route.from + '\n' + 'To: ' + userInfo.route.to;
    userRoute.append(route);
}

const matchesPage = document.getElementById('matchesPage');
matchesPage.addEventListener('click', () => {
    window.location.assign("/users/1234/match");
})

const profilePage = document.getElementById('routesPanel');
profilePage.addEventListener('click', () => {
    window.location.assign("/routesPanel");
})

const chatPage = document.getElementById('chatPage');
chatPage.addEventListener('click', () => {
    window.location.assign("/chatroom");
})

const logout = document.getElementById('logoutPage');
logout.addEventListener('click', () => {
    window.location.assign("/users/login");
})

const account = document.getElementById('account');
account.addEventListener('click', () => {
	const currentUser = localStorage.getItem("currentUser");
    window.location.assign(`/users/${currentUser._id}`);
})