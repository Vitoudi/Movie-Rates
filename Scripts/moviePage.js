function getLocalStorageData() {
    return JSON.parse(localStorage.all)
}

function getFormatedHashValue() {
    const hash = location.hash
    const splitedHahsTag = hash.split('#')
    const hashPieces = splitedHahsTag[1].split('%20')
    const resultHash = hashPieces.join(' ')
    return resultHash
}

function setPageInfo() {
    const movies = getLocalStorageData()
    movies.forEach((movie)=>{
        if(movie.dataName === getFormatedHashValue()) {
            const imgPlace = document.getElementById('movie-img')
            const titlePlace = document.getElementById('title')
            const infoPlace = document.getElementById('info')
            const imdbPlace = document.getElementById('imdb-grade')
            imgPlace.setAttribute('src', movie.dataImg)
            titlePlace.textContent= movie.dataName
            infoPlace.textContent += movie.dataInfo
            imdbPlace.textContent = movie.dataImdb
        }
    })

    
}
setPageInfo()