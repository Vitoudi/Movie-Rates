const url = '../Data/movieData.json'

fetch(url)
    .then((response) => response.json())
    .then((data)=> {
        printMovies(data)
        setEventListerForNavClick(data)
        setSlider(data)
        SetSearchEngine(data)
        putAllMoviesInLocalStorage(data)
        
    }).catch((error)=> {
        console.error(error, '')
    })

function setEventListerForNavClick(data) {
    document.querySelector('nav').addEventListener('click', ()=>{
        
        //document.forms.navForm.submit()
    })
    
}

function printMovies(data) {
    const main = document.querySelector('#movies')
    data.forEach((movie)=> {
        const movieContainer = document.createElement('a')
        const movieBannerContainer = document.querySelectorAll('.movie-banner-container')
        movieContainer.classList.add('movie-container')
        
        Object.entries(movie).forEach((prop)=> {
            movieContainer.setAttribute(`data-${prop[0]}`, prop[1])
        })

        movieContainer.setAttribute('id', movie.name)
        movieContainer.innerHTML= `
        <img class="movie-image" src="${movie.img}">
        <div class="info-area">
            <h2 class="movie-title">${movie.name}</h2>
            <p>${verifyMovieInfoLength(movie.info)}</p>
        </div>
        `
        main.appendChild(movieContainer)
        setRedirection(data)
        
    })
}

function putAllMoviesInLocalStorage(data) {
    let allMoviesData = []
    data.forEach((movie)=>{
        allMoviesData.push({
            "dataName": movie.name,
            "dataInfo": movie.info,
            "dataImg": movie.img,
            "dataImdb": movie.imdb,
            "dataCartegories": movie.categories
        })
    })
    localStorage.setItem('all', JSON.stringify(allMoviesData))
}

function setSlider(data) {
    window.addEventListener('resize', resizeImgs)

    const slider = document.querySelector('.slider')
    const slideNav = document.querySelector('.slider-navigation')
    data.forEach((movie)=> {
        if(movie.banner) {
            const movieBannerContainer = document.createElement('div')
            
            Object.entries(movie).forEach((prop)=> {
                movieBannerContainer.setAttribute(`data-${prop[0]}`, prop[1])
            })

            movieBannerContainer.classList.add('movie-banner-container')
            movieBannerContainer.innerHTML= `
            <img class="banner movie-image" src="${movie.banner}">
            <p class="movie-title">${movie.name}</p>
            `

            slideNav.innerHTML+= `
            <div class="controler"></div>
            `
            slider.appendChild(movieBannerContainer)
            slider.insertAdjacentElement('afterend',slideNav)
        }
    })

    const controlers = Array.from(document.querySelectorAll('.controler'))
    controlers[0].classList.add('active')

    function resizeImgs() {
        const imgs = Array.from(document.querySelectorAll('.banner'))
        const screenSize = window.screen.availWidth
        imgs.forEach((img)=> {
            img.style.width = screenSize + 'px'
        })
    }
    resizeImgs()

    let counter = 1

    console.log(document.querySelector('.slider-navigation'))
    document.querySelector('.slider-navigation').addEventListener('click', (e)=>{
        for(let i = 0; i < controlers.length; i++) {
            controlers[i].addEventListener('click', (e)=> {
                counter = i
                moveSlider()
            })
        }
        console.log(counter)
    })
    
    const intervalToChange = setInterval(()=> {
        moveSlider()
    }, 4000)
    

    function moveSlider() {
        const imgs = document.querySelectorAll('.slider img')
        if(counter < imgs.length) {
            const slider = document.querySelector('.slider')
            slider.style.cssText = `transform: translateX(${-100 * counter + '%'}); transition: 1s;`
            counter++

            controlers.forEach((controler)=>{controler.classList.remove('active')})
            controlers[counter -1].classList.add('active')
        } else {
            counter = 0
        }
    }
}


function SetSearchEngine(data) {
    function getInput() {
        return document.querySelector('input')
    }

    getInput().addEventListener('input', filter)

    function filter() {
        hideAllMovies()
        const movies = Array.from(document.querySelectorAll('.movie-container'))
        const regex = new RegExp(getInput().value, 'i')
        const passedTheFilter = []
        movies.forEach((movie)=>{
            if(regex.test(movie.id)) {
                passedTheFilter.push(movie)
            }
        })
        displayResults(passedTheFilter)
    }

    function hideAllMovies() {
        const movies = Array.from(document.querySelectorAll('.movie-container'))
        movies.forEach((movie)=> {
            movie.classList.add('hidden')
        })
    }

    function displayResults(passedTheFilter) {
        cleanErrorMsg(document.getElementById('errorMsg'))
        if(passedTheFilter.length === 0) displayErrorMsg('Nothing found', document.querySelector('#movies'))
        passedTheFilter.forEach((movie)=> {
            movie.classList.remove('hidden')
        })
    }
}

function cleanErrorMsg(errorMsg) {
    if(errorMsg) {
        errorMsg.remove()
    }
}

function displayErrorMsg(errorMsg, place) {
    if(!document.getElementById('errorMsg')) {
        const errorMsgElement = document.createElement('h2')
        errorMsgElement.id = 'errorMsg'
        errorMsgElement.textContent= errorMsg
        place.append(errorMsgElement)
    }
}