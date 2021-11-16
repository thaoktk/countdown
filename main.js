(() => {
    const $ = document.querySelector.bind(document)
    const title = $('.title')
    const myMusic = $('#audio')
    const buttonSetting = $('.button-setting')
    const settingCountdown = $('.setting-countdown')
    const inputTitle = $('.input-title')
    const inputTime = $('.input-time')
    const buttonSubmit = $('.button-submit')
    const bodyContainer = $('body')
    const COUNTDOWN_STORAGE_KEY = 'COUNTDOWN'
    
    // --------------------------- countdown -------------------------
    const countdown = () => {
        const countDate = getChange().time // chỉ định thời gian đếm ngc (mili giây)
        const now = new Date().getTime() // tìm ra current time
        let gap = countDate - now // tìm khoảng cách
    
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
            launchTheFuckOfTheLife()
            gap = null
        } else {
            bodyContainer.classList.remove('active')
            confetti.stop()
        }
    }

    // ----------------------------- when countdown done ------------------------------
    const launchTheFuckOfTheLife = () => {
        const buttonPlay = $('.button-play')
        
        title.innerHTML = "It's done!"
        $('.day').innerHTML = 0
        $('.hour').innerHTML = 0
        $('.minute').innerHTML = 0
        $('.second').innerHTML = 0

        bodyContainer.classList.add('active')
        buttonPlay.onclick = () => {
            togglePlay()
            myMusic.volume = 0.4
        }
        confetti.start()
    }
    
    function togglePlay() {
        return myMusic.paused ? myMusic.play() : myMusic.pause()
    }
    
    // ------------------------ Change title and date time -----------------------
    function changeTime() {
        const countDate = new Date(inputTime.value).getTime()
        return countDate
    }
    
    buttonSetting.onclick = () => {
        settingCountdown.classList.toggle('active')
        inputTitle.focus()
    }
    
    buttonSubmit.onclick = () => {
        if (inputTitle.value && inputTime.value) {
            settingCountdown.classList.remove('active')
            title.innerHTML = inputTitle.value

            const countdownSaved = {
                title: inputTitle.value,
                time: changeTime()
            }
            
            saveChange(countdownSaved)
            setInterval(countdown, 1000)
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
        if (getChange().time) {
            title.innerHTML = getChange().title
            setInterval(countdown, 1000)
        }
    }
    
    countdown()
    loadCurrentSetting()

    // --------------------------- random background -----------------------------
    const backgrounds = [
        {
            id: 1,
            img: 'https://images.unsplash.com/photo-1514477917009-389c76a86b68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=767&q=80'
        },
        {
            id: 2,
            img: 'https://images.unsplash.com/photo-1508020268086-b96cf4f4bb2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
        },
        {
            id: 3,
            img: 'https://images.unsplash.com/photo-1465634836201-1d5651b9b6d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80'
        },
        {
            id: 4,
            img: 'https://images.unsplash.com/photo-1510274460854-4b7ad642d3a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
            id: 5,
            img: 'https://images.unsplash.com/photo-1475302389077-6ec2b24b95bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
        },
        {
            id: 6,
            img: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
        },
        {
            id: 7,
            img: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }
    ]
    
    function randomBackground() {
        const randomNumber = Math.floor(Math.random() * 7)
        const randomImg = backgrounds[randomNumber].img
        bodyContainer.style.backgroundImage = `url(${randomImg})`
    }
    
    setInterval(randomBackground, 10000)
})()
