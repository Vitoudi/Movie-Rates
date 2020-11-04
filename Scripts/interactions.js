function setEventListerForMenuIcons() {
    const menuIcons = Array.from(document.querySelectorAll('.menu-icon'))
    menuIcons.forEach((icon)=> {
        icon.addEventListener('click', changeMenuState)
    })
}

function changeMenuState() {
    const menu = document.querySelector('.menu')
    menu.classList.toggle('grid')
}

function createSerachPlace(e) {
    const input = document.querySelector('input')
    input.classList.toggle('inline')
    input.focus()
}

function toggleSliderOnFocus() {
    document.querySelector('input').addEventListener('focus', ()=>{
        const slider = document.querySelector('.slider')
        const slideNav = document.querySelector('.slider-navigation')
        slider.classList.add('hidden')
        slideNav.classList.add('hidden')
    })
    document.querySelector('input').addEventListener('blur', ()=>{
        const slider = document.querySelector('.slider')
        const slideNav = document.querySelector('.slider-navigation')
        slideNav.classList.remove('hidden')
        slider.classList.remove('hidden')
    })
}

function getYear() {
    const date = new Date
    const year = date.getFullYear()
    return year
}

function printYearInFooter() {
    const yearPlace = document.getElementById('year')
    yearPlace.textContent = getYear()
}

function init() {
    setEventListerForMenuIcons()
    document.querySelector('.search-icon').addEventListener('click', createSerachPlace)
    printYearInFooter()
    toggleSliderOnFocus()
}
init()