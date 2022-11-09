import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderHtml = (filename) => {
	return (req, res, next) => {
		return res.sendFile(filename, { root: path.resolve(__dirname, "../../frontend/views") });
	};
};

export const httpRequest = async (uri, auth, type, body, query) => {
	let url = uri;
	if (Object.keys(query).length > 0) {
		url += "?";
		for (const [k, v] of Object.entries(query)) {
			url += k + "=" + v + "&";
		}
		url.slice(0, -1);
	}
	if (type === "GET" || !type) {
		response = await fetch(url, {
			method: type || "GET",
			credentials: "same-origin",
			headers: {
				Authorization: `Bearer ${auth}`,
			},
		});
		return await response.json();
	} else {
		response = await fetch(url, {
			method: type,
			credentials: "same-origin",
			headers: {
				Authorization: `Bearer ${auth}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		return await response.json();
	}
};
