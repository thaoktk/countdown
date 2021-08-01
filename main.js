const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const comingSoon = $('.coming-soon')
const buttonPlay = $('button')

const countdown = () => {
    const countDate = new Date('August 5, 2021 00:00:00').getTime(); // chỉ định thời gian đếm ngc (mili giây)
    const now = new Date().getTime() // tìm ra current time
    const gap = countDate - now // tìm khoảng cách

    // how the fuck does time work? 
    const second = 1000 // 1s = 1000ms
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    // calculate the shit 
    const textDay = Math.floor(gap / day)
    const textHour = Math.floor((gap % day) / hour)  // gap % day phần dư sẽ là giờ
    const textMinute = Math.floor((gap % hour) / minute)  // gap % hour phần dư sẽ là phút
    const textSecond = Math.floor((gap % minute) / second)  // gap % minute phần dư sẽ là giây

    $('.day').innerHTML = textDay
    $('.hour').innerHTML = textHour
    $('.minute').innerHTML = textMinute
    $('.second').innerHTML = textSecond

    if (gap === 0) {
        launchTheFuckOfTheLife();
    }
}

setInterval(countdown, 1000)

const launchTheFuckOfTheLife = () => {
    comingSoon.classList.add('active')
    buttonPlay.onclick = () => {
        $('#audio').play();
        $('#audio').volume = 0.4
    }
}



