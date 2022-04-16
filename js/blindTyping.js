const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    // tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    accuracyTag = document.querySelector(".accuracy span");

let totalWords = 0, wordIndex = 0

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    wrongWords = isTyping = 0;

let scoreShown = false

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // "have all without govern or turn plan tell interest such".split(" ").forEach(word => {
    paragraphs[ranIndex].split(" ").forEach(word => {
        let div = ''
        word.split("").forEach(char => {
            div += `<span class="char">${char}</span>`;
        })
        typingText.innerHTML += `<div class="word">${div}</div>`
        typingText.innerHTML += `<span class="char"> </span>`
    });
    typingText.getElementsByClassName("word")[0].classList.add("active");
    document.addEventListener("keydown", () => { inpField.focus(); initTyping() });
    typingText.addEventListener("click", () => { inpField.focus(); initTyping() });
}

let word = '', wordElement = ''

function initTyping() {
    if (wordIndex <= typingText.getElementsByClassName("word").length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        word = ''
        wordElement = typingText.getElementsByClassName("word")[wordIndex]
        let characters = wordElement.getElementsByClassName("char");
        for (i = 0; i < characters.length; i++) {
            word += characters[i].innerText;
        }
        if (wordIndex > typingText.getElementsByClassName("word").length - 1) {
            clearInterval(timer);
        }
        // console.log()
    } else {
        clearInterval(timer);
        inpField.disabled = true
        // mistakeTag.innerText = wrongWords;
        // wpmTag.innerText = Math.round(((totalWords - wrongWords) / 5) / (maxTime - timeLeft) * 60)
        // accuracyTag.innerText = ((1 - (wrongWords / totalWords)) * 100).toFixed(0) + "%"
        // document.querySelector("li.mistake").style.display = "inline-block"
        // document.querySelector("li.accuracy").style.display = "inline-block"
        // document.querySelector("li.wpm").style.display = "inline-block"

        inpField.disabled = true;
        if (!scoreShown) {
            scrollTo(0, 0)
            document.querySelector('body').style.overflowY = 'hidden'
            document.querySelector('main').style.visibility = 'hidden'
            document.querySelector('main').style.opacity = '0'
            document.querySelector('main').style.top = '100vh'
            // document.querySelector('main').style.paddingTop = '100vh'
            // console.log(totalWords)
            // console.log(wrongWords)
            // console.log(maxTime - timeLeft)
            // console.log(((totalWords - wrongWords) / 5) / (maxTime - timeLeft) * 60)
            // console.log(((totalWords * (1 - (wrongWords / totalWords)) * 100) / 5) / (maxTime - timeLeft) * 60)
            setTimeout(function () {
                document.querySelector('body').style.overflowY = 'auto'
                document.querySelector('main').innerHTML = `<section class="container mt-0 py-5">
                    <div class="row mt-0 py-5">
                        <div class="col-12 my-auto mt-0 py-5">
                            <div class="row text-center mt-0 py-3">
                                <h1 class="col-12 text-center">Your Scores for the Round</h1>
                                <div class="wrapper">
                                    <div class="content-box">
                                        <div class="content"
                                            style="min-height: 44.8vh; width: 80%; margin-left: auto; margin-right: auto;">
        
                                            <div class="accuracy d-flex align-items-center flex-column">
                                                <div class="my-auto">
                                                    <i class="bi bi-md bi-bullseye result_icon"></i>
                                                </div>
                                                <label style="text-align: center; display: block; height: 30px;">${((1 - (wrongWords / totalWords)) * 100).toFixed(0)}%</label>
                                                <label style="text-align: center; display: block;">Accuracy</label>
                                            </div>
        
                                            <div class="wpm d-flex align-items-center flex-column"
                                                style=" transform: scale(120%);">
                                                <div style="margin-top:-15px; margin-bottom: 2vh;">
                                                    <i class="bi bi-speedometer2 result_icon"></i>
                                                </div>
                                                <label style="text-align: center; display: block; height: 20px;">${Math.round(((totalWords - wrongWords) / 5) / (maxTime - timeLeft) * 60)}</label>
                                                <label style="text-align: center; display: block;">WPM</label>
                                            </div>
        
                                            <div class="time d-flex align-items-center flex-column">
                                                <div style="margin-top:-15px; margin-bottom: 2vh;">
                                                    <i class="bi bi-clock-history result_icon"></i>
                                                </div>
                                                <label style="text-align: center; display: block; height: 20px;">${(maxTime - timeLeft).toFixed(1)}</label>
                                                <label style="text-align: center; display: block;">Seconds</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-center nxt">
                                <a class="btn btn-primary" href="score.html">View Result</a>
                            </div>
                        </div>
                    </div>
                </section>`
                document.querySelector('.title').classList.add('col-12')
                document.querySelector('.title').style.paddingLeft = '40vw'
                document.querySelector('main').style.visibility = 'visible'
                document.querySelector('main').style.opacity = '1'
                document.querySelector('main').style.top = '0'
                document.querySelector('main').style.paddingTop = '2.5rem'
                document.querySelector('.content').style.borderBottom = 'none'
                document.querySelector('footer').style.visibility = 'visible'
                document.querySelector('footer').style.opacity = '1'
                document.querySelector(".time").style.visibility = "visible"
                document.querySelector(".time").style.opacity = "1"
                document.querySelector(".accuracy").style.visibility = "visible"
                document.querySelector(".accuracy").style.opacity = "1"
                document.querySelector(".wpm").style.visibility = "visible"
                document.querySelector(".wpm").style.opacity = "1"
                setTimeout(function () {
                    document.querySelector('.nxt').style.visibility = 'visible'
                    document.querySelector('.nxt').style.opacity = '1'
                }, 500)
            }, 1500)
            scoreShown = true;
        }
    }
}

function checkCalc() {
    let inpFieldVal = inpField.value;
    inpField.value = ''
    word = word + " "
    inpFieldVal = inpFieldVal + " "
    if (wordIndex != 0) {
        word = " " + word
    }
    // console.log(inpFieldVal)
    // console.log(word)
    let correct = true
    if (inpFieldVal.length != word.length) {
        correct = false
    }
    if (inpFieldVal.length - 1 > word.length) {
        // correct = false
        totalWords += (inpFieldVal.length - 1 - word.length)
        wrongWords += (inpFieldVal.length - 1 - word.length)
    }
    for (i = 0; i < word.length; i++) {
        if (inpFieldVal[i] != word[i]) {
            correct = false
            wrongWords++
        }
        totalWords++
    }
    if (correct) {
        wordElement.classList.add("correct")
    }
    else {
        wordElement.classList.add("incorrect")
    }
    wordIndex++
    for (i = 0; i < typingText.getElementsByClassName("word").length; i++) {
        typingText.getElementsByClassName("word")[i].classList.remove("active")
    }
    if (typingText.getElementsByClassName("word")[wordIndex] != null) {
        typingText.getElementsByClassName("word")[wordIndex].classList.add("active")
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        // console.log(timeLeft)
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
        inpField.disabled = true
        document.querySelector("li.mistake").style.display = "inline-block"
        document.querySelector("li.accuracy").style.display = "inline-block"
        document.querySelector("li.wpm").style.display = "inline-block"
    }
}


loadParagraph();
inpField.addEventListener("keydown", function (e) {
    e = e.key
    initTyping()
    if (e == ' ') {
        // totalWords++
        if (typingText.getElementsByClassName("word")[wordIndex] != null) {
            checkCalc()
        }
    }
});