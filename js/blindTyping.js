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

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split(" ").forEach(word => {
        let div = ''
        word.split("").forEach(char => {
            div += `<span class="char">${char}</span>`;
        })
        typingText.innerHTML += `<div class="word">${div}</div>`
        typingText.innerHTML += `<span class="char"> </span>`
    });
    typingText.getElementsByClassName("word")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

let word = '', wordElement = ''

function initTyping() {
    if (wordIndex < typingText.getElementsByClassName("word").length - 1 && timeLeft > 0) {
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
        if (wordIndex >= typingText.getElementsByClassName("word").length - 1) {
            clearInterval(timer);
        }
    } else {
        clearInterval(timer);
        inpField.disabled = true
        document.querySelector("li.mistake").style.display = "inline-block"
        document.querySelector("li.accuracy").style.display = "inline-block"
    }
}

function checkCalc() {
    let inpFieldVal = inpField.value;
    inpFieldVal.padEnd(word.length, "*")
    let correct = true
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
    inpField.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }))
    inpField.value = ''
    let wpm = Math.round(((totalWords - wrongWords) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    mistakeTag.innerText = wrongWords;
    accuracyTag.innerText = ((1 - (wrongWords / totalWords)) * 100).toFixed(0) + "%"
    wordIndex++
    for (i = 0; i < typingText.getElementsByClassName("word").length; i++) {
        typingText.getElementsByClassName("word")[i].classList.remove("active")
    }
    typingText.getElementsByClassName("word")[wordIndex].classList.add("active")
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((totalWords) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        inpField.disabled = true
        document.querySelector("li.mistake").style.display = "inline-block"
        document.querySelector("li.accuracy").style.display = "inline-block"
    }
}


loadParagraph();
inpField.addEventListener("keyup", function (e) {
    e = e.key
    initTyping()
    if (e == ' ') {
        checkCalc()
    }
});