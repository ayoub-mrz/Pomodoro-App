// Selectors

let settingsGet = document.querySelector('.settings');

let root = document.querySelector(':root');

let body = document.querySelector('body');

let colorLi = document.querySelector('ul .color-li');

let settingsHide = document.querySelector('.settings-menu .heading img');

let settingsMenu = document.querySelector('.settings-menu');

let circle = document.querySelector('circle');

let timeSpan = document.querySelector('.timeSpan');

let play = document.querySelector('.play');

let pause = document.querySelector('.pause');

let resume = document.querySelector('.resume');

let liColors = document.querySelector(".color ul");

let liFonts = document.querySelector(".font ul");

let apply = document.querySelector('.settings-menu button');

let input1 = document.querySelector('.settings-menu .time :nth-child(2) input');

let input2 = document.querySelector('.settings-menu .time :nth-child(3) input');

let input3 = document.querySelector('.settings-menu .time :nth-child(4) input');

let input4 = document.querySelector('.settings-menu .time :nth-child(5) input');

let spanGuide = document.querySelector('.settings-menu .app-info p span');

let check1 = document.querySelector('.check1');

let check2 = document.querySelector('.check2');

let check3 = document.querySelector('.check3');

let TimeTick;

let pomodoro, short, long, pomoLoop;


// Set Chosen Time
if (localStorage.getItem('pomodoro') !== null) { 
    pomodoro = parseInt(localStorage.getItem('pomodoro'));
} else {
    pomodoro = 25;
}
if (localStorage.getItem('short') !== null) { 
    short = parseInt(localStorage.getItem('short'));
} else {
    short = 5;
}
if (localStorage.getItem('long') !== null) { 
    long = parseInt(localStorage.getItem('long'));
} else {
    long = 30;
}
if (localStorage.getItem('pomoLoop') !== null) { 
    pomoLoop = parseInt(localStorage.getItem('pomoLoop'));
} else {
    pomoLoop = 4;
}

// Add PomoLoop To Guide
spanGuide.innerHTML = pomoLoop;

// Set Default Property
let mod = "pomodoro";

let time = pomodoro;

let pomo = 1;

// Set Main Color
root.style = "--mainColor: #fc6667";
if (localStorage.getItem('color') === null) {
    document.querySelector('.color ul .red img').style.display = "block";
}

// Set Chosen Color 
if (localStorage.getItem('color') === 'red') {
    root.style = "--mainColor: #fc6667";
    document.querySelector('.color ul .red img').style.display = 'block';
}
if (localStorage.getItem('color') === 'blue') {
    root.style = "--mainColor: #76f1f8";
    document.querySelector('.color ul .blue img').style.display = 'block';
}
if (localStorage.getItem('color') === 'magenta') {
    root.style = "--mainColor: #d980f9";
    document.querySelector('.color ul .magenta img').style.display = 'block';
}

// Set Font Body
body.style.fontFamily = "'Roboto Condensed', sans-serif";
if (localStorage.getItem('font') === null) {
    document.querySelector('.font ul .Roboto').classList.add('active');
}

// Set Chosen Font 
if (localStorage.getItem('font') === 'Roboto') {
    body.style.fontFamily = "'Roboto Condensed', sans-serif";
    document.querySelector('.Roboto').classList.add('active');
}
if (localStorage.getItem('font') === 'Charis') {
    body.style.fontFamily = "'Charis SIL', serif";
    document.querySelector('.Charis').classList.add('active');
}
if (localStorage.getItem('font') === 'Josefin') {
    body.style.fontFamily = "'Josefin Sans', sans-serif";
    document.querySelector('.Josefin').classList.add('active');
}

// Get Settings Menu
settingsGet.onclick = function (e) { settingsMenu.style = "left: 50%" };

// Hide Settings Menu
settingsHide.onclick = function (e) { settingsMenu.style = "left: -50%" };

// Set Time As Chosen
function setTime() {
    if (time < 10 && typeof(time) === 'number') { timeSpan.innerHTML = `0${time}:00` };
    if (time >= 10 && typeof(time) === 'number') { timeSpan.innerHTML = `${time}:00` };
    if (time < 1 && typeof(time) === 'number') { timeSpan.innerHTML = `00:${time * 60}` };
}
setTime();

// Start Time
play.addEventListener('click', (e) => {
    setTimeout(() => { clock(time) }, 200);
    play.style = "display: none";
    pause.style = "display: inline";
    // setTimeout(() => { circle.style.animation = `anim ${time * 60}s linear forwards`}, 1400);
    circle.style.strokeDashoffset = "440";
})

// Stop Time
pause.addEventListener('click', (e) => {
    clearInterval(TimeTick);
    resume.style = "display: inline";
    pause.style = "display: none";
    // circle.style.animationPlayState = "paused";
})

// clock
function clock(input) {
    let min = input;
    let sec = min * 60;
    
    // Resume Time
    resume.addEventListener('click', (e) => {
        TimeTick = setInterval(clockTime, 1000)
        resume.style = "display: none";
        pause.style = "display: inline";
        // circle.style.animationPlayState = "running";
    })

    
    TimeTick = setInterval(clockTime, 1000)
    
    function clockTime() {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;

        let timeSec = time * 60;

        let timePerCent = (sec * 100) / timeSec;

        circle.style.strokeDashoffset = (timePerCent * 440) / 100;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        timeSpan.innerHTML = minutes < 10 ? `0${minutes}:${seconds}` : `${minutes}:${seconds}`;

        if (sec > 0) { sec--; } else {

            clearInterval(TimeTick);

            let durationTime = 2000;

            if (mod === 'pomodoro'  && pomo == pomoLoop) {
                toRight('long');
                time = long;
                setTimeout(() => { setTime() }, durationTime);
                check1.play();
            } else if (mod === 'pomodoro') { 
                pomo++;
                toRight('short');
                time = short;
                setTimeout(() => { setTime() }, durationTime);
                check1.play();
            } 
            if (mod === 'short') { 
                time = pomodoro;
                setTimeout(() => {
                    mod = 'pomodoro';
                    toRight('pomodoro', 'ok');
                    setTimeout(() => { setTime() }, durationTime);
                }, 500);
                check2.play();
            } 
            if (mod === 'long') { 
                toRight('pomodoro', 'Not');
                time = pomodoro;
                setTimeout(() => { setTime() }, durationTime);
                pomo = 1;
                check3.play();
            }
        }
    }
}

// Switch Btw Colors
liColors.addEventListener('click', (e) => {
    if (e.target.classList.contains('red')) {
        root.style = "--mainColor: #fc6667";
        localStorage.setItem('color', 'red')
        switchColor(e);
    }
    if (e.target.classList.contains('blue')) {
        root.style = "--mainColor: #76f1f8";
        localStorage.setItem('color', 'blue')
        switchColor(e);
    }
    if (e.target.classList.contains('magenta')) {
        root.style = "--mainColor: #d980f9";
        localStorage.setItem('color', 'magenta')
        switchColor(e);
    }
})

// Switch BTW Fonts
liFonts.addEventListener('click', (e) => {
    if (e.target.classList.contains('Roboto')) {
        body.style.fontFamily = "'Roboto Condensed', sans-serif";
        localStorage.setItem('font', 'Roboto');
        switchColor2(e);
    }
    if (e.target.classList.contains('Charis')) {
        body.style.fontFamily = "'Charis SIL', serif";
        localStorage.setItem('font', 'Charis');
        switchColor2(e);
    }
    if (e.target.classList.contains('Josefin')) {
        body.style.fontFamily = "'Josefin Sans', sans-serif";
        localStorage.setItem('font', 'Josefin');
        switchColor2(e);
    }
})

// Remove active from li and add it to target
function switchColor(e) {
    document.querySelectorAll('.color ul img').forEach((img) => {
        img.style.display = "none";
    })
    e.target.children[0].style.display = "inline";
}

// Remove active from li and add it to target
function switchColor2(e) {
    document.querySelectorAll('.font ul li').forEach((li) => {
        li.classList.remove('active');
    })
    e.target.classList.add('active');;
}

// change Information
apply.addEventListener('click', (e) => {
    if (input1.value !== '') { localStorage.setItem('pomodoro', input1.value) };
    if (input2.value !== '') { localStorage.setItem('short', input2.value) };
    if (input3.value !== '') { localStorage.setItem('long', input3.value) };
    if (input4.value !== '') { localStorage.setItem('pomoLoop', input4.value) };
    window.location.reload();
})

// function Animation ToRight
function toRight(mods, to) {

    setTimeout(() => {
        document.querySelectorAll('.selection li').forEach((li) => { li.classList.remove('active') })
        mod = mods;
        pause.style.display = 'none';
        play.style.display = 'inline';
        setTime();
    }, 2000);

    const observer = new ResizeObserver((e) => {
        let fixE = e[0];
        let isBig = fixE.contentRect.width >= 992;
        if (isBig) {
            propertyPx(45, 90, 3);
        } else {
            propertyPx(0, 0);
        }
    })
    observer.observe(body);

    // Control animation Clock Bar
    function propertyPx(val1, val2, val3) {
        if (mods === 'short') {
            setTimeout(() => { colorLi.style.width = '2px' }, 500);
            setTimeout(() => { colorLi.style.left = `${123 + val1}px` }, 950);
            setTimeout(() => { colorLi.style.left = `${135 + val1}px` }, 1000);
            setTimeout(() => { colorLi.style.width = `${125 + val1}px` }, 1500);
            setTimeout(() => {
                document.querySelector('.selection :nth-child(2)').classList.add('active');
            }, 2000);
        }
        if (mods === 'long') {
            setTimeout(() => { colorLi.style.width = '2px' }, 500);
            setTimeout(() => { colorLi.style.right = `${123 + val1}px` }, 900);
            setTimeout(() => { colorLi.style.right = 'unset'; colorLi.style.left = `${275 + val2}px` }, 1350);
            setTimeout(() => { colorLi.style.width = `${125 + val1}px` }, 1500);
            setTimeout(() => {
                document.querySelector('.selection :nth-child(3)').classList.add('active');
            }, 2000);
        }
        if (mods === 'pomodoro' && to == 'Not') {
            setTimeout(() => { colorLi.style.width = '2px' }, 500);
            setTimeout(() => { colorLi.style.left = 'unset'; colorLi.style.right = `${123 + val2}px`;  }, 950);
            setTimeout(() => { colorLi.style.right = `${275 + val2}px` }, 1000);
            setTimeout(() => { colorLi.style.width = `${125 + val1}px` }, 1500);
            setTimeout(() => {
                document.querySelector('.selection :nth-child(1)').classList.add('active');
            }, 2000);
        }
        if (mods === 'pomodoro' && to == 'ok') {
            setTimeout(() => { colorLi.style.width = '2px' }, 500);
            setTimeout(() => { colorLi.style.left = `${123 + val1}px` }, 900);
            setTimeout(() => { colorLi.style.left = 'unset'; colorLi.style.right = `${275 + val2}px` }, 1200);
            setTimeout(() => { colorLi.style.width = `${125 + val1}px` }, 1500);
            setTimeout(() => {
                document.querySelector('.selection :nth-child(1)').classList.add('active');
            }, 2000);
        }
    }
    
}


