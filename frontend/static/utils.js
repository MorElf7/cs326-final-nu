export const httpRequest = async (uri, type, body, query) => {
	let url = uri;
	if (Object.keys(query).length > 0) {
		url += "?";
		for (const [k, v] of Object.entries(query)) {
			url += k + "=" + v + "&";
		}
		url.slice(0, -1);
	}
	if (type === "GET" || !type) {
		const response = await fetch(url, {
			method: type || "GET",
			credentials: "same-origin",
		});
		return await response.json();
	} else {
		const response = await fetch(url, {
			method: type,
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		return await response.json();
	}
};

export const getUserId = () => {
	const path = location.pathname.split("/");
	const reg = new RegExp("^[0-9a-fA-F]{24}$");
	if (reg.test(path[path.indexOf("users") + 1])) return path[path.indexOf("users") + 1];
	else return null;
};
