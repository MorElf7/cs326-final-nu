const matchDeck = document.getElementById('matchDeck');

const displayMatchDeck = (curSuggestion) => {
    
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
            map: './img/route.avif',
            name: 'Some name',
            description: 'Some description',
            route: {
                from: 'Some place',
                to: 'Some destination'
            },
            Schedule: {
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
            description: 'Some description',
            route: {
                from: 'Some place',
                to: 'Some destination'
            },
            Schedule: {
                days: ['Monday','Tuesday','Friday'],
                time: {
                    from: curDate.getHours()+ ":" + curDate.getMinutes(),
                    to: curDate.getHours()+ ":" + curDate.getMinutes()
                }
            }
        }
    ];

    displayMatchDeck(suggestions.pop());
    localStorage.setItem('suggestions', suggestions)
};