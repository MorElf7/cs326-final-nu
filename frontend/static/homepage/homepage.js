const matchDeck = document.getElementById('matchDeck');

const displayMatchDeck = ({img, name, description, route, schedule}) => {
    // const imgElem = document.createElement('img');
    // imgElem.setAttribute('src',img)
    const displayInfo = document.getElementById('displayInfo');

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
    document.getElementById('routeInfo').append(routeElem);
}

onload = async () => {
    // const response = await fetch('/api/suggestion', {
	// 	credentials: "same-origin",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer ${accessToken}`,
	// 	},
	// })

	// const res = await response.json();
    // const suggestions = res.data;

    const curDate = new Date();
    let suggestions = [
        {
            img: './img/route.avif',
            name: 'Name',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Some thing...',
            route: {
                from: 'Some place',
                to: 'Some destination'
            },
            schedule: {
                days: ['Monday','Tuesday','Friday'],
                time: {
                    from: curDate.getHours()+ ":" + curDate.getMinutes(),
                    to: curDate.getHours()+ ":" + curDate.getMinutes()
                }
            }
        },
        {
            map: './img/route.avif',
            name: 'Some name',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Some thing...',
            route: {
                from: 'Some place',
                to: 'Some destination'
            },
            schedule: {
                days: ['Monday','Tuesday','Friday'],
                time: {
                    from: curDate.getHours()+ ":" + curDate.getMinutes(),
                    to: curDate.getHours()+ ":" + curDate.getMinutes()
                }
            }
        }
    ];
    displayMatchDeck(suggestions.pop());
    localStorage.setItem('suggestions', suggestions);
};