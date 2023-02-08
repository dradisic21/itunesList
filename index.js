const searchFormElement = document.querySelector("#search-form");
const searchInputElement = document.querySelector("#search-input");
const searchResultsElement = document.querySelector("#search-results");

const musicList = (e) => {
  e.preventDefault();
  searchResultsElement.innerHTML = "";
  const searchTerm = searchInputElement.value;

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let hasResults = false;
      const results = data.results;
      results.forEach((result) => {
    
        const artistTerm = result.artistName.toLowerCase().includes(searchTerm);
        const songTerm = result.trackName.toLowerCase().includes(searchTerm);

        if (artistTerm || songTerm) {
          hasResults = true;
          searchResultsElement.innerHTML += `
            <div class="media_list">
              <div class="img">
                <img src="${result.artworkUrl100}" class="img">
              </div>
              <div class="title">
                <p class="artist_name">${result.artistName}</p>
                <p class="song_name">${result.trackName}</p>
              </div>
              <audio controls class="player">
                <source src="${result.previewUrl}" type="audio/x-m4a">
              </audio>
          </div>`;
        }
        
        if (!hasResults && data === result.length - 1) {
          searchResultsElement.innerHTML = `<h1 class="no-result">No results</h1>`;
        }
        if (searchTerm === "") {
          searchResultsElement.innerHTML = "";
        }
      });
    });
};
searchFormElement.addEventListener("submit", musicList);
searchFormElement.addEventListener("keyup", musicList);

document.addEventListener(
  "play",
  (event) => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },
  true
);
