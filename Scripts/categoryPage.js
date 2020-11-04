function getLocalStorageData() {
    return JSON.parse(localStorage.getItem('all'))
}

function getHash() {
    const currentHash = location.hash.split('#')
    return currentHash[1]
}

function filterMoviesByCategory() {
    const movies = getLocalStorageData()
    const main = document.querySelector('main')
    movies.forEach((movie)=>{
        if(movie.dataCartegories.indexOf(getHash()) !== -1) {
            const movieContainer = document.createElement('div')
            movieContainer.classList.add('movie-container')

            Object.entries(movie).forEach((prop)=> {
                movieContainer.setAttribute(prop[0].replace('data', 'data-'), prop[1])
            })

            movieContainer.innerHTML= `
            <img class="movie-image" src="${movie.dataImg}">
            <div class="info-area">
                <h2 class="movie-title">${movie.dataName}</h2>
                <p>${verifyMovieInfoLength(movie.dataInfo)}</p>
            </div>`
            main.appendChild(movieContainer)
        }
    })
}
filterMoviesByCategory()

function printCategoryName() {
    const categoryNamePlace = document.getElementById('category-name')
    categoryNamePlace.textContent= getHash().toUpperCase() + ':'
}
printCategoryName()

setRedirection('')

getLocalStorageData().forEach((movie)=>{
    const movieContainer = document.createElement('a')
    const movieBannerContainer = document.querySelectorAll('.movie-banner-container')
    movieContainer.classList.add('movie-container')
    
    Object.entries(movie).forEach((prop)=> {
        movieContainer.setAttribute(`data-${prop[0]}`, prop[1])
    })
})