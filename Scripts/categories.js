function getLocalStorageData() {
    return JSON.parse(localStorage.getItem('all'))
}

function getCategories() {
    const movies = getLocalStorageData()
    const categories = []
    movies.forEach((movie)=> {
        const dataCategories = movie.dataCartegories
        dataCategories.forEach((category)=>{
            if(categories.indexOf(category) === -1) {
                categories.push(category)
            }
        })
    })
    printCategories(categories)
}
getCategories()

function printCategories(categories) {
    const main = document.querySelector('main')
    categories.forEach((category)=> {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')
        categoryContainer.innerHTML= `<a href="categoryPage.html#${category}"><h2>${category}</h2></a>`
        main.appendChild(categoryContainer)
    })
}