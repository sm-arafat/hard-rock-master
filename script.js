// To Active Search Area
const searchArea = document.getElementById("searchArea");
searchArea.addEventListener('keypress', function search(press) {
    if (press.keyCode == 13) {
        getResults(searchArea.value);
    }
})

//  Active Search Btn
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', function () {
    getResults(searchArea.value);
})

//Get Data From Api
function getResults(value) {
    fetch(`https://api.lyrics.ovh/suggest/${value}`)
        .then(res => res.json())
        .then(songs => displayResult(songs))
}

// Display Results Functions
function displayResult(songs) {
    const allSongs = songs.data;
    const searchResult = document.getElementById("searchResult");
    let html = '';
    for (let i = 0; i < 10; i++) {
        const title = allSongs[i].title;
        const artist = allSongs[i].artist.name;
        const album = allSongs[i].album.title;
        const albumCover = allSongs[i].album.cover;
        html += `<div class="single-result row my-3 p-3 d-flex justify-content-between align-items-center">
                    <div>
                        <img src="${albumCover}" alt="">
                    </div>
                    <div class="col-md-6">
                        <h3 id="title">${title}</h3>
                        <p class="author lead">Album by: <span>${album}</span></p>
                        <p>Artist: <span id="author">${artist}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right, text-center">
                        <button onclick="getLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics
                        </button>
                    </div>
                </div>`
    }
    searchResult.innerHTML = html;
}

// Get Lyrics
function getLyrics(artist, title) {
    console.log(artist, title);
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(function displayLyric(data) {
            const currentLyric = data.lyrics;
            let lyric = '';
            const displayArea = document.getElementById("lyricsArea");
            lyric = `<button class="btn go-back btn-success" onclick="hide()">Go-Back</button>
                    <h2 class="text-success md-4">${title}</h2>
                    <h4 class="text-success md-4">${artist}</h4>
                    <pre class="lyric text-white">${currentLyric}</pre>`
            displayArea.innerHTML = lyric;

        })
}

// Remove Lyrics
function hide() {
    const displayArea = document.getElementById("lyricsArea");
    displayArea.remove();
}