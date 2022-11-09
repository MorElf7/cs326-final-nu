const matchDeck = document.getElementById(matchDeck);

onload = async () => {
    const response = await fetch('/api/suggestion', {
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	})

	const res = await response.json();

    const suggestions = res.data;
}