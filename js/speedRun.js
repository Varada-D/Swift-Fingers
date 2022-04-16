const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    accuracyTag = document.querySelector(".accuracy span");

let totalWords = 0

let timer = 1,
    charIndex = wrongWords = isTyping = 0, charLen = 0;

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
    typingText.getElementsByClassName("word")[0].getElementsByClassName("char")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    charLen = characters.length;
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                wrongWords++
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
            totalWords++
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        // let wpm = Math.round(((charIndex - wrongWords) / 5) / (timer) * 60);
        // wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        // wpmTag.innerText = wpm;
        // mistakeTag.innerText = wrongWords;
        // accuracyTag.innerText = ((1 - (wrongWords / totalWords)) * 100).toFixed(0) + "%"
    }
    else {
        isTyping = false;
        clearInterval(timer);
        inpField.value = "";
        inpField.disabled = true;
        scrollTo(0, 0)
        document.querySelector('body').style.overflowY = 'hidden'
        document.querySelector('main').style.visibility = 'hidden'
        document.querySelector('main').style.opacity = '0'
        document.querySelector('main').style.top = '100vh'
        document.querySelector('main').style.paddingTop = '100vh'
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
                                                    <label style="text-align: center; display: block; height: 20px;">${Math.round(((charIndex - wrongWords) / 5) / (timer - 1) * 60)}</label>
                                                    <label style="text-align: center; display: block;">WPM</label>
                                                </div>
            
                                                <div class="time d-flex align-items-center flex-column">
                                                    <div style="margin-top:-15px; margin-bottom: 2vh;">
                                                        <i class="bi bi-clock-history result_icon"></i>
                                                    </div>
                                                    <label style="text-align: center; display: block; height: 20px;">${((timer - 1) / 60).toFixed(0) + ":" + ((timer - 1) % 60)}</label>
                                                    <label style="text-align: center; display: block;">Minutes</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 text-center nxt">
                                    <a class="btn btn-primary" href="timescape.html">Next Round</a>
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
    }
}

function initTimer() {
    timeTag.innerText = timer - 1;
    if (charIndex >= charLen - 1) {
        clearInterval(timer);
    }
    else {
        timer++;
        let wpm = Math.round(((charIndex - wrongWords) / 5) / (timer - 1) * 60);
        wpmTag.innerText = wpm;
    }
}

loadParagraph();
inpField.disabled = false
inpField.addEventListener("input", initTyping);