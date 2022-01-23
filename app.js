const searchForm = document.querySelector("form.search");
const songsDiv = document.querySelector("div.songs");

const listSongs = (e) => {
	// songsDiv.innerHTML += ``;
	console.log(e);
}

const search = async (e) => {
	e.preventDefault();
	let theValue = searchForm["artist"].value.replaceAll(" ", "%20");
	const response = await fetch(`https://genius.p.rapidapi.com/search?q=${theValue}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "genius.p.rapidapi.com",
			"x-rapidapi-key": "26322812damsh909f42bf90d25a8p1f23ddjsn63d6b73897c6"
		}
	});

	if(response.status === 200) {
		const resultResponse = await response.json();
		if(resultResponse.meta.status === 200) {
			resultResponse.response.hits.forEach(listSongs);
		} else {
			console.error("Something went wrong");
			songsDiv.innerHTML = `<p class="error">Something went wrong!</p>`;
		}
	} else {
		console.error("Something went wrong");
		songsDiv.innerHTML = `<p class="error">Something went wrong!</p>`;
	}
}

searchForm.addEventListener("submit", search);