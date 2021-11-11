const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const comingSoon = $('.coming-soon')
const buttonPlay = $('button')
const buttonSetting = $('.button-setting')
const sectionSetting = $('.button-setting-wrap')
const inputTitle = $('.input-title')
const title = $('.title')
const buttonSubmit = $('.button-submit')
const inputTime = $('.input-time')
const COUNTDOWN_STORAGE_KEY = 'COUNTDOWN'


// --------------------------- countdown -------------------------
const countdown = () => {
    const countDate = changeTime() || getChange().time // chỉ định thời gian đếm ngc (mili giây)
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

    if (gap <= 0) {
        gap == null
        launchTheFuckOfTheLife();
    } else {
        comingSoon.classList.remove('active')
    }
}

// ----------------------------- when countdown done ------------------------------
const launchTheFuckOfTheLife = () => {
    $('.day').innerHTML = 0
    $('.hour').innerHTML = 0
    $('.minute').innerHTML = 0
    $('.second').innerHTML = 0
    comingSoon.classList.add('active')
    buttonPlay.onclick = () => {
        $('#audio').play();
        $('#audio').volume = 0.4
    }
    confetti.start()
}


// ------------------------ Change title and date time -----------------------
function changeTime() {
    const countDate = new Date(inputTime.value).getTime()
    return countDate
}

buttonSetting.onclick = () => {
    sectionSetting.classList.toggle('active')
}

buttonSubmit.onclick = () => {
    if (inputTitle.value && inputTime.value) {
        sectionSetting.classList.remove('active')
        title.innerHTML = inputTitle.value
        setInterval(countdown, 1000)
        const countdownSaved = {
            title: inputTitle.value,
            time: changeTime()
        }
        saveChange(countdownSaved)
    }
}

// ----------------------- save data to localStorage ----------------------

function saveChange(itemSave) {
    localStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify(itemSave))
}

function getChange() {
    return JSON.parse(localStorage.getItem(COUNTDOWN_STORAGE_KEY))
}

// ----------------------------- load current title, date and time --------------------

function loadCurrentSetting() {
    title.innerHTML = getChange().title
    setInterval(countdown, 1000)
}

countdown()
loadCurrentSetting()

console.log(getChange().time)