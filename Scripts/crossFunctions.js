function setRedirection(data) {
    console.log(data)
    const body = document.querySelector('body')
    body.addEventListener('click', (e) => {
        handleClickInMovie(e)
    })
}

function handleClickInMovie(e) {
    console.log('handle')
    if(e.target.classList.contains('movie-image')) {
        const dataName = e.target.parentNode.getAttribute('data-name')
        redirectToMoviePage(dataName)
    } else if(e.target.classList.contains('movie-title')) {
        const dataName = e.target.parentNode.parentNode.getAttribute('data-name')
        redirectToMoviePage(dataName)
    }
}

function redirectToMoviePage(dataName) {
    const form = document.forms.movie
    form.setAttribute('action', 'moviePage.html#'+ dataName)
    form.submit()
}
    
function verifyMovieInfoLength(info) {
    const stringInfo = String(info)
    if(stringInfo.length > 75) {
        const regex = /^(.{1,75})/ig
        return stringInfo.match(regex) + '...'
    } else {
        return stringInfo
    }
}