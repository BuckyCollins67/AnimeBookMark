const base_url = 'https://api.jikan.moe/v4'

function searchAnime(event){

    event.preventDefault()

    const form = new FormData(this)
    const query = form.get("search")


    fetch(`${base_url}/anime?q=${query}&page=1`)  //see 8:57 of video at https://www.youtube.com/watch?v=0edUd9m3tVU&t=47s
    .then(res => res.json())
    .then(updateDom)
    .catch(err=console.log(err.message))

}

function updateDom(data){

    const searchResults = document.getElementById('searchResults')

    searchResults.innerHTML = data.data
        .sort((a,b)=>a.episodes-b.episodes)
        .map(anime=>{
            if(anime.synopsis == null){
                anime.synopsis = "No description available at this time."
            }
            return `
                <div class="col s12 m7">
                <div class="card">
                <div class="card-image">
                    <img src="${anime.images.jpg.large_image_url}">
                </div>
                <div class="card-content">
                    <span class="card-title">${anime.title}</span>
                    <p>${anime.synopsis}</p>
                </div>
                <div class="card-action">
                    <a href=${anime.url}>Link</a>
                </div>
                </div>
            </div>  
            `
        }).join("")  //this gets rid of the commas between entries.
        
        //the data is what you get from the search query, and within that, there is a property called data, hence "data.data".  Also only seems to take in the japanese name.
}

function pageLoaded(){
    const form = document.getElementById('searchForm')
    form.addEventListener('submit', searchAnime)
}


window.addEventListener("load", pageLoaded)