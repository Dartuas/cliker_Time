// доступ-пошук елемнтів
const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('#start')
const timeLists = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'green', 'blue', 'yellow']
const phrases = ['ок', 'так тримати', 'спробуй ще', 'непогано', 'неперевершено'];

// time score
let time = 0, score = 0;

// startBtn.addEventListener
// рух екрану вгору

document.body.addEventListener('click', (e) => {

    if (e.target.classList.contains('start')) {
        e.preventDefault()
        screens[0].classList.add('up')
    }

    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.dataset.time);
        // console.log(typeof time);
        screens[1].classList.add('up')
        startGame()
    }
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomeCircle()
    }
    if (e.target.classList.contains('restartBtn')) {
        window.location.href = './';
    }
})


// старт гри-функція

let interval_id = 0;

function startGame() {
    interval_id = setInterval(decreaseTime, 1000)
    console.log(interval_id);
    createRandomeCircle()
}

function decreaseTime() {
    // старт часу (час вичерпано)
    if (time === 0) {
        finishGame()
        clearInterval(interval_id)
    } else {
        let current = --time
        if (current < 10) current = `0${current}`
        setTimer(current)
    }

}
function setTimer(value) {
    timeElement.innerText = `00:${value}`
}

// генерація кульки
function createRandomeCircle() {
    const circle = document.createElement('div')

    const size = getRandomNumber(20, 70)
    // console.log(board.getBoundingClientRect());
    const { width, height } = board.getBoundingClientRect()
    // console.log(width, height);
    const x = getRandomNumber(50, width - size - 50)
    const y = getRandomNumber(50, height - size - 50)
    const randomColorIndex = getRandomNumber(0, colors.length)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = colors[randomColorIndex]


    board.append(circle)
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


// фініш гри - зникає заголовок, виводимо score



function finishGame() {
    timeElement.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
    creatButton();

}
function creatButton() {
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('restartBtn');
    let randomPhrasesIndex = getRandomNumber(0, phrases.length);
    restartBtn.innerText = `${phrases[randomPhrasesIndex]}`;
    board.append(restartBtn);
}




